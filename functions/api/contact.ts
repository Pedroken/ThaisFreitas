type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
};

type ContactPayload = {
  name?: string;
  city?: string;
  email?: string;
  message?: string;
  language?: string;
};

type ContactFields = Required<ContactPayload> & {
  referenceFiles: File[];
};

const maxAttachmentBytes = 10 * 1024 * 1024;
const maxTotalAttachmentBytes = 25 * 1024 * 1024;
const maxReferenceFiles = 8;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isAcceptedReferenceFile = (file: File) =>
  file.type.startsWith("image/") || file.type === "application/pdf";

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary);
};

const parseRequest = async (request: Request): Promise<ContactFields> => {
  const contentType = request.headers.get("Content-Type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const legacyReferenceFile = formData.get("referenceFile");
    const referenceFiles = formData
      .getAll("referenceFiles")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (legacyReferenceFile instanceof File && legacyReferenceFile.size > 0) {
      referenceFiles.push(legacyReferenceFile);
    }

    return {
      name: clean(formData.get("name")),
      city: clean(formData.get("city")),
      email: clean(formData.get("email")),
      message: clean(formData.get("message")),
      language: clean(formData.get("language")) || "en",
      referenceFiles,
    };
  }

  const payload = (await request.json()) as ContactPayload;

  return {
    name: clean(payload.name),
    city: clean(payload.city),
    email: clean(payload.email),
    message: clean(payload.message),
    language: clean(payload.language) || "en",
    referenceFiles: [],
  };
};

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.RESEND_API_KEY) {
    return json({ error: "Missing RESEND_API_KEY" }, 500);
  }

  const to = env.CONTACT_TO || "contact@thaisfreitastattoo.com";
  const from = env.CONTACT_FROM || "contact@thaisfreitastattoo.com";

  let payload: ContactFields;

  try {
    payload = await parseRequest(request);
  } catch {
    return json({ error: "Invalid request payload" }, 400);
  }

  const { name, city, email, message, language, referenceFiles } = payload;

  if (!name || !city || !email || !message) {
    return json({ error: "Missing required fields" }, 400);
  }

  if (!isEmail(email)) {
    return json({ error: "Invalid email" }, 400);
  }

  if (message.length > 5000) {
    return json({ error: "Message is too long" }, 400);
  }

  if (referenceFiles.length > maxReferenceFiles) {
    return json({ error: "Too many attachments" }, 400);
  }

  const totalAttachmentBytes = referenceFiles.reduce((total, file) => total + file.size, 0);

  if (totalAttachmentBytes > maxTotalAttachmentBytes) {
    return json({ error: "Attachments are too large" }, 400);
  }

  if (referenceFiles.some((file) => file.size > maxAttachmentBytes)) {
    return json({ error: "Attachment is too large" }, 400);
  }

  if (referenceFiles.some((file) => !isAcceptedReferenceFile(file))) {
    return json({ error: "Unsupported attachment type" }, 400);
  }

  const referenceFileNames = referenceFiles.map((file) => file.name || "reference-file");
  const referenceFileSummary = referenceFileNames.length ? referenceFileNames.join(", ") : "none";

  const subject = `Tattoo enquiry - ${name}`;
  const text = [
    "New enquiry from thaisfreitastattoo.com",
    "",
    `Name: ${name}`,
    `City / Country: ${city}`,
    `Email: ${email}`,
    `Language: ${language}`,
    `Reference files: ${referenceFileSummary}`,
    "",
    message,
  ].join("\n");

  const html = `
    <h2>New enquiry from thaisfreitastattoo.com</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>City / Country:</strong> ${escapeHtml(city)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Language:</strong> ${escapeHtml(language)}</p>
    <p><strong>Reference files:</strong> ${escapeHtml(referenceFileSummary)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  const attachments = referenceFiles.length
    ? await Promise.all(
        referenceFiles.map(async (file) => ({
          filename: file.name || "reference-file",
          content: arrayBufferToBase64(await file.arrayBuffer()),
        })),
      )
    : undefined;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject,
      text,
      html,
      attachments,
    }),
  });

  if (!resendResponse.ok) {
    return json({ error: "Unable to send email" }, 502);
  }

  return json({ ok: true });
};

export const onRequest = () => json({ error: "Method not allowed" }, 405);

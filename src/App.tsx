import { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  availableLocations,
  contact,
  florescerImages,
  GalleryImage,
  languages,
  LanguageCode,
  portfolioImagesByCategory,
  siteContent,
  WorkCategory,
  workCategories,
} from "./data/content";

const pageCopy: Record<
  LanguageCode,
  {
    heroHeadline: string;
    artistTag: string;
    customTag: string;
    bookLine: string;
    aboutCta: string;
    workCta: string;
    whatIDo: string;
    guestKicker: string;
    guestCta: string;
    portfolioCta: string;
  }
> = {
  en: {
    heroHeadline: "Hello, I'm your fine line tattoo artist!",
    artistTag: "Thaís Freitas",
    customTag: "Custom Design",
    bookLine: "Book your session with me:",
    aboutCta: "Contact & Let's Talk",
    workCta: "View custom projects",
    whatIDo: "What I do:",
    guestKicker: "Guest Spots",
    guestCta: "Contact here to reserve your session",
    portfolioCta: "Explore my work",
  },
  pt: {
    heroHeadline: "Olá, eu sou sua artista de fine line!",
    artistTag: "Thaís Freitas",
    customTag: "Design Autoral",
    bookLine: "Agende sua sessão comigo:",
    aboutCta: "Contato & Vamos Conversar",
    workCta: "Ver projetos autorais",
    whatIDo: "O que eu faço:",
    guestKicker: "Guest Spots",
    guestCta: "Entre em contato para reservar sua sessão",
    portfolioCta: "Explorar portfólio",
  },
  de: {
    heroHeadline: "Hallo, ich bin deine Fine-Line-Tattoo-Künstlerin!",
    artistTag: "Thaís Freitas",
    customTag: "Custom Design",
    bookLine: "Buche deine Session mit mir:",
    aboutCta: "Kontakt & Gespräch",
    workCta: "Projekte ansehen",
    whatIDo: "Was ich mache:",
    guestKicker: "Guest Spots",
    guestCta: "Kontaktiere mich, um deine Session zu reservieren",
    portfolioCta: "Portfolio entdecken",
  },
  fr: {
    heroHeadline: "Bonjour, je suis votre artiste fine line!",
    artistTag: "Thaís Freitas",
    customTag: "Design Sur Mesure",
    bookLine: "Réservez votre session avec moi:",
    aboutCta: "Contact & Parlons-en",
    workCta: "Voir les projets",
    whatIDo: "Ce que je fais:",
    guestKicker: "Guest Spots",
    guestCta: "Contactez-moi pour réserver votre session",
    portfolioCta: "Explorer le portfolio",
  },
  nl: {
    heroHeadline: "Hallo, ik ben je fine line tattoo artist!",
    artistTag: "Thaís Freitas",
    customTag: "Custom Design",
    bookLine: "Boek je sessie met mij:",
    aboutCta: "Contact & Laten We Praten",
    workCta: "Bekijk projecten",
    whatIDo: "Wat ik doe:",
    guestKicker: "Guest Spots",
    guestCta: "Neem contact op om je sessie te reserveren",
    portfolioCta: "Bekijk mijn werk",
  },
  es: {
    heroHeadline: "Hola, soy tu artista de fine line!",
    artistTag: "Thaís Freitas",
    customTag: "Diseño Personalizado",
    bookLine: "Reserva tu sesión conmigo:",
    aboutCta: "Contacto & Hablemos",
    workCta: "Ver proyectos",
    whatIDo: "Lo que hago:",
    guestKicker: "Guest Spots",
    guestCta: "Contacta aquí para reservar tu sesión",
    portfolioCta: "Explorar portfolio",
  },
};

type EnquiryForm = {
  name: string;
  city: string;
  email: string;
  message: string;
};

const initialForm: EnquiryForm = {
  name: "",
  city: "",
  email: "",
  message: "",
};

type ContactFormStatus = "idle" | "sending" | "success" | "error";

const contactFormFeedback: Record<
  LanguageCode,
  {
    sending: string;
    success: string;
    error: string;
  }
> = {
  en: {
    sending: "Sending...",
    success: "Thank you. Your enquiry was sent successfully.",
    error: "I could not send your enquiry right now. Please try again or contact me by WhatsApp.",
  },
  pt: {
    sending: "Enviando...",
    success: "Obrigada. Seu pedido foi enviado com sucesso.",
    error: "Não consegui enviar seu pedido agora. Tente novamente ou fale comigo pelo WhatsApp.",
  },
  de: {
    sending: "Wird gesendet...",
    success: "Danke. Deine Anfrage wurde erfolgreich gesendet.",
    error: "Deine Anfrage konnte gerade nicht gesendet werden. Bitte versuche es erneut oder kontaktiere mich per WhatsApp.",
  },
  fr: {
    sending: "Envoi en cours...",
    success: "Merci. Votre demande a bien été envoyée.",
    error: "Je n'ai pas pu envoyer votre demande pour le moment. Réessayez ou contactez-moi par WhatsApp.",
  },
  nl: {
    sending: "Verzenden...",
    success: "Dank je. Je aanvraag is succesvol verzonden.",
    error: "Ik kon je aanvraag nu niet verzenden. Probeer het opnieuw of neem contact op via WhatsApp.",
  },
  es: {
    sending: "Enviando...",
    success: "Gracias. Tu consulta fue enviada correctamente.",
    error: "No pude enviar tu consulta ahora. Inténtalo de nuevo o contáctame por WhatsApp.",
  },
};

type SocialIconName = "email" | "instagram" | "pinterest" | "whatsapp";

function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === "email") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
        <path d="m5 8 7 5 7-5" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg className="brand-icon instagram-icon" aria-hidden="true" viewBox="0 0 32 32" focusable="false">
        <defs>
          <radialGradient id="instagram-radial" cx="30%" cy="107%" r="135%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285aeb" />
          </radialGradient>
        </defs>
        <rect className="instagram-bg" x="2" y="2" width="28" height="28" rx="8" />
        <rect className="instagram-frame" x="8.5" y="8.5" width="15" height="15" rx="4.3" />
        <circle className="instagram-frame" cx="16" cy="16" r="4.2" />
        <circle className="instagram-dot" cx="21" cy="10.9" r="1.15" />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg className="brand-icon whatsapp-icon" aria-hidden="true" viewBox="0 0 36 36" focusable="false">
        <circle className="whatsapp-bg" cx="18" cy="18" r="16" />
        <g transform="translate(2 2)">
          <path
            className="whatsapp-glyph"
            d="M16 4.1C9.44 4.1 4.1 9.44 4.1 16c0 2.1.55 4.16 1.6 5.95L4 28l6.2-1.63A11.82 11.82 0 0 0 16 27.9c6.56 0 11.9-5.34 11.9-11.9S22.56 4.1 16 4.1Zm0 21.64c-1.84 0-3.64-.49-5.22-1.42l-.37-.22-3.68.96.98-3.58-.24-.38A9.69 9.69 0 0 1 6.26 16c0-5.37 4.37-9.74 9.74-9.74S25.74 10.63 25.74 16 21.37 25.74 16 25.74Z"
          />
          <path
            className="whatsapp-glyph"
            d="M21.34 18.13c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.45-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5l-.56-.01c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.19 3.03c.15.2 2.07 3.15 5.01 4.42.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.34Z"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg className="brand-icon pinterest-icon" aria-hidden="true" viewBox="0 0 32 32" focusable="false">
      <circle className="pinterest-bg" cx="16" cy="16" r="15" />
      <path
        className="pinterest-glyph"
        d="M16.05 5.2c-5.95 0-8.95 4.25-8.95 7.8 0 2.16.82 4.08 2.57 4.8.29.12.55 0 .63-.32.06-.22.2-.78.27-1.02.09-.32.05-.43-.18-.7-.51-.61-.84-1.4-.84-2.52 0-3.17 2.37-6.02 6.18-6.02 3.37 0 5.23 2.06 5.23 4.82 0 3.62-1.6 6.67-3.98 6.67-1.31 0-2.29-1.08-1.98-2.42.37-1.59 1.1-3.31 1.1-4.46 0-1.03-.55-1.89-1.69-1.89-1.34 0-2.42 1.39-2.42 3.25 0 1.19.4 1.99.4 1.99s-1.37 5.82-1.62 6.84c-.48 2.04-.07 4.54-.03 4.79.02.16.22.19.31.07.13-.16 1.76-2.18 2.32-4.2.16-.58.9-3.54.9-3.54.45.85 1.75 1.6 3.14 1.6 4.14 0 6.95-3.78 6.95-8.83 0-3.82-3.24-7.38-8.31-7.38Z"
      />
    </svg>
  );
}

function App() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<WorkCategory>("botanical");
  const [form, setForm] = useState<EnquiryForm>(initialForm);
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [formStatus, setFormStatus] = useState<ContactFormStatus>("idle");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const content = siteContent[language];
  const copy = pageCopy[language];
  const feedback = contactFormFeedback[language];
  const primaryLocations = availableLocations.filter((location) => location.country !== "be");
  const belgiumLocations = availableLocations.filter((location) => location.country === "be");

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = content.metaTitle;
  }, [content.metaTitle, language]);

  useEffect(() => {
    if (!activeImage && !isPortfolioOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (activeImage) {
          setActiveImage(null);
          return;
        }

        setIsPortfolioOpen(false);
      }
    };

    document.body.classList.add("has-lightbox");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("has-lightbox");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage, isPortfolioOpen]);

  const galleryImages = useMemo(() => portfolioImagesByCategory[activeFilter], [activeFilter]);
  const portfolioCarouselImages = [
    "/images/port-principal/DSC03170.jpg",
    "/images/port-principal/DSC03768.jpg",
    "/images/port-principal/DSC03901.jpg",
    "/images/port-principal/DSC04368.jpg",
    "/images/port-principal/DSC04443.jpg",
    "/images/port-principal/DSC04649.jpg",
  ];
  const previewImage = (category: WorkCategory, src: string): GalleryImage => ({
    src,
    title: content.work.filters[category],
    alt: `${content.work.filters[category]} tattoo preview by Thaís Freitas`,
    tags: [category],
  });

  const styleCards = [
    {
      category: "botanical" as const,
      title: content.work.filters.botanical,
      text: content.signature.items[1],
      image: previewImage("botanical", "/images/chamariz/botanica.jpeg"),
    },
    {
      category: "ornamental" as const,
      title: content.work.filters.ornamental,
      text: content.signature.items[3],
      image: previewImage("ornamental", "/images/chamariz/ornamental.jpeg"),
    },
    {
      category: "fauna" as const,
      title: content.work.filters.fauna,
      text: content.signature.items[2],
      image: previewImage("fauna", "/images/chamariz/fauna.jpeg"),
    },
    {
      category: "lettering" as const,
      title: content.work.filters.lettering,
      text: content.signature.items[4],
      image: previewImage("lettering", "/images/chamariz/lettering.jpeg"),
    },
    {
      category: "coverups" as const,
      title: content.work.filters.coverups,
      text: content.signature.items[5],
      image: previewImage("coverups", "/images/chamariz/cover-up.jpg"),
    },
    {
      category: "minimalist" as const,
      title: content.work.filters.minimalist,
      text: content.signature.items[0],
      image: previewImage("minimalist", "/images/chamariz/minimalista.jpeg"),
    },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormStatus("sending");

    try {
      const requestBody = new FormData();
      requestBody.append("name", form.name);
      requestBody.append("city", form.city);
      requestBody.append("email", form.email);
      requestBody.append("message", form.message);
      requestBody.append("language", language);

      referenceFiles.forEach((file) => {
        requestBody.append("referenceFiles", file);
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      setForm(initialForm);
      setReferenceFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  const openImage = (event: MouseEvent<HTMLAnchorElement>, image: GalleryImage) => {
    event.preventDefault();
    setActiveImage(image);
  };

  const openPortfolioCategory = (category: WorkCategory) => {
    setActiveFilter(category);
    setIsPortfolioOpen(true);
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Thaís Freitas home">
          <img src="/images/brand/dragonfly-mark-transparent.png" alt="" />
          <span>THAIS FREITAS</span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">{content.nav.home}</a>
          <a href="#about">{content.nav.about}</a>
          <button type="button" onClick={() => setIsPortfolioOpen(true)}>
            {content.nav.work}
          </button>
          <a href="#florescer">{content.nav.florescer}</a>
          <a href="#contact">{content.nav.contact}</a>
          <a href="#newsletter">{content.nav.newsletter}</a>
        </nav>

        <div className="social-nav" aria-label="Social links">
          <a href={`mailto:${contact.email}`} aria-label={contact.email}>
            <SocialIcon name="email" />
          </a>
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${contact.phone}`}>
            <SocialIcon name="whatsapp" />
          </a>
          <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label={contact.instagramHandle}>
            <SocialIcon name="instagram" />
          </a>
          <a href={contact.pinterest} target="_blank" rel="noreferrer" aria-label={contact.pinterestHandle}>
            <SocialIcon name="pinterest" />
          </a>
        </div>

        <div className="language-switcher" aria-label="Choose language">
          {languages.map((item) => (
            <button
              key={item.code}
              className={language === item.code ? "is-active" : ""}
              type="button"
              aria-pressed={language === item.code}
              title={item.name}
              onClick={() => setLanguage(item.code)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <main>
        <div className="dark-stage">
          <section className="hero" id="home" aria-labelledby="hero-title">
            <div className="hero-center">
              <h1 id="hero-title">{copy.heroHeadline}</h1>
            </div>

            <div className="hero-duo" aria-label="Artist introduction">
              <article>
                <p className="script-title">{copy.artistTag}</p>
                <p>{content.hero.subtitle}</p>
                <p>{content.hero.body}</p>
                <span>{copy.bookLine}</span>
                <a className="gold-button" href="#contact">
                  {copy.aboutCta}
                </a>
              </article>
              <article>
                <p className="script-title">{copy.customTag}</p>
                <p>{content.signature.intro}</p>
                <button className="gold-button" type="button" onClick={() => setIsPortfolioOpen(true)}>
                  {copy.workCta}
                </button>
              </article>
            </div>
          </section>
        </div>

        <section className="about-panel" id="about">
          <div>
            <p className="eyebrow">{content.about.kicker}</p>
            <h2>{content.about.title}</h2>
            {content.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <figure className="artist-photo-stack" aria-label="Thaís Freitas">
            <img
              className="photo-stack-main"
              src="/images/fotosthais/thais-portrait-1.jpg"
              alt="Thaís Freitas holding tattoo equipment with flowers"
            />
            <img
              className="photo-stack-accent"
              src="/images/fotosthais/thais-portrait-2.jpg"
              alt="Thaís Freitas tattooing a floral fine line project"
            />
          </figure>
        </section>

        <section className="what-section">
          <div className="section-intro">
            <h2>{copy.whatIDo}</h2>
          </div>
          <div className="style-grid">
            {styleCards.map((card) => (
              <article key={card.title}>
                <button
                  type="button"
                  aria-label={`${content.nav.work}: ${card.title}`}
                  onClick={() => openPortfolioCategory(card.category)}
                >
                  <img src={card.image.src} alt={card.image.alt} loading="lazy" />
                </button>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-feature" id="work">
          <div className="section-intro">
            <p className="eyebrow">{content.work.kicker}</p>
            <h2>{content.work.title}</h2>
            <p>{content.work.intro}</p>
            <button className="gold-button" type="button" onClick={() => setIsPortfolioOpen(true)}>
              {copy.portfolioCta}
            </button>
          </div>

          <div className="portfolio-carousel" aria-label="Portfolio highlights">
            <div className="portfolio-carousel-track">
              {[
                ...portfolioCarouselImages,
                ...portfolioCarouselImages,
                ...portfolioCarouselImages,
                ...portfolioCarouselImages,
                ...portfolioCarouselImages,
              ].map((src, index) => (
                <figure className="portfolio-carousel-card" key={`${src}-${index}`}>
                  <img src={src} alt="Fine line tattoo portfolio highlight by Thaís Freitas" loading="eager" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="locations-section" id="locations">
          <div className="section-intro">
            <h2>{content.locations.title}</h2>
          </div>
          <div className="location-grid location-grid-primary">
            {primaryLocations.map((location) => (
              <article key={location.place}>
                <div className="location-photo">
                  <img src={location.image} alt={location.alt} loading="lazy" />
                  <span aria-hidden="true">{location.flag}</span>
                </div>
                <p>{location.place}</p>
                {"address" in location && <address className="location-address">{location.address}</address>}
              </article>
            ))}
          </div>
          <div className="location-grid location-grid-belgium">
            {belgiumLocations.map((location) => (
              <article key={location.place}>
                <div className="location-photo">
                  <img src={location.image} alt={location.alt} loading="lazy" />
                  <span aria-hidden="true">{location.flag}</span>
                </div>
                <p>{location.place}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="florescer-panel" id="florescer">
          <div>
            <p className="eyebrow">{content.florescer.kicker}</p>
            <h2>{content.florescer.title}</h2>
            <ul>
              {content.florescer.details.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="before-after">
            {florescerImages.map((image, index) => (
              <figure key={image.src}>
                <a href={image.src} onClick={(event) => openImage(event, image)}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </a>
                <figcaption>{index === 0 ? content.florescer.before : content.florescer.after}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="newsletter-section" id="newsletter">
          <div>
            <h2>{content.newsletter.title}</h2>
            <p>{content.newsletter.body}</p>
          </div>
          <div className="newsletter-box" aria-label={content.newsletter.soon}>
            <span>{content.newsletter.soon}</span>
            <input disabled type="email" placeholder={content.newsletter.placeholder} />
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">{content.contact.kicker}</p>
            <h2>{content.contact.title}</h2>
            <p>{content.contact.intro}</p>
            <div className="contact-links">
              <a href={`mailto:${contact.email}`}>
                <SocialIcon name="email" />
                <span>{contact.email}</span>
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                <SocialIcon name="whatsapp" />
                <span>{contact.phone}</span>
              </a>
              <a href={contact.instagram} target="_blank" rel="noreferrer">
                <SocialIcon name="instagram" />
                <span>{contact.instagramHandle}</span>
              </a>
              <a href={contact.pinterest} target="_blank" rel="noreferrer">
                <SocialIcon name="pinterest" />
                <span>{contact.pinterestHandle}</span>
              </a>
            </div>
            <p className="language-note">{content.contact.languages}</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              {content.contact.name}
              <input
                required
                type="text"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </label>
            <label>
              {content.contact.city}
              <input
                required
                type="text"
                value={form.city}
                onChange={(event) => setForm({ ...form, city: event.target.value })}
              />
            </label>
            <label>
              {content.contact.email}
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
            </label>
            <label>
              {content.contact.message}
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
              />
            </label>
            <label>
              {content.contact.attachment}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={(event) => setReferenceFiles(Array.from(event.target.files ?? []))}
              />
            </label>
            <button className="gold-button" type="submit" disabled={formStatus === "sending"}>
              {formStatus === "sending" ? feedback.sending : content.contact.send}
            </button>
            {formStatus === "success" && <p className="form-status is-success">{feedback.success}</p>}
            {formStatus === "error" && <p className="form-status is-error">{feedback.error}</p>}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <img src="/images/brand/dragonfly-mark-transparent.png" alt="" />
        <a href="https://www.thaisfreitastattoo.com">www.thaisfreitastattoo.com</a>
        {content.footer && <p>{content.footer}</p>}
      </footer>

      <a
        className="whatsapp-float"
        href={contact.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label={`Send WhatsApp message to ${contact.phone}`}
      >
        <SocialIcon name="whatsapp" />
      </a>

      {isPortfolioOpen && (
        <div className="portfolio-modal" role="dialog" aria-modal="true" aria-label={content.work.title}>
          <div className="portfolio-modal-shell">
            <div className="portfolio-modal-header">
              <div>
                <p className="eyebrow">{content.work.kicker}</p>
                <h2>{content.work.title}</h2>
                <p>{content.work.intro}</p>
              </div>
              <button
                className="modal-close"
                type="button"
                aria-label="Close portfolio"
                onClick={() => setIsPortfolioOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="filter-bar" aria-label="Portfolio filters">
              {workCategories.map((category) => (
                <button
                  key={category}
                  className={activeFilter === category ? "is-active" : ""}
                  type="button"
                  aria-pressed={activeFilter === category}
                  onClick={() => setActiveFilter(category)}
                >
                  {content.work.filters[category]}
                </button>
              ))}
            </div>

            <div className="gallery" key={activeFilter} aria-live="polite">
              {galleryImages.map((image) => (
                <a
                  className="gallery-item"
                  href={image.src}
                  key={image.src}
                  aria-label={`${content.work.open}: ${image.title}`}
                  onClick={(event) => openImage(event, image)}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <span>{image.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeImage.title}>
          <button className="lightbox-close" type="button" onClick={() => setActiveImage(null)}>
            ×
          </button>
          <img src={activeImage.src} alt={activeImage.alt} />
          <p>{activeImage.title}</p>
        </div>
      )}
    </>
  );
}

export default App;

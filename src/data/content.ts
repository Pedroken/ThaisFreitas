export const contact = {
  email: "contact@thaisfreitastattoo.com",
  phone: "+351936505391",
  whatsapp: "https://wa.me/351936505391",
  instagram: "https://www.instagram.com/thaisfreitastattoo",
  instagramHandle: "@thaisfreitastattoo",
  pinterest: "https://www.pinterest.com/thaisfreitastattoo",
  pinterestHandle: "@thaisfreitastattoo",
};

export const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "nl", label: "NL", name: "Nederlands" },
  { code: "es", label: "ES", name: "Español" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];
export type WorkCategory = "botanical" | "ornamental" | "fauna" | "lettering" | "coverups" | "minimalist";

export type GalleryImage = {
  src: string;
  title: string;
  alt: string;
  tags: WorkCategory[];
};

export const workCategories: WorkCategory[] = [
  "botanical",
  "ornamental",
  "fauna",
  "lettering",
  "coverups",
  "minimalist",
];

const categoryFolders: Record<WorkCategory, string> = {
  botanical: "botanica",
  ornamental: "ornamental",
  fauna: "fauna",
  lettering: "lettering",
  coverups: "coberturas",
  minimalist: "minimalista",
};

const categoryTitles: Record<WorkCategory, string> = {
  botanical: "Botanical fine line",
  ornamental: "Ornamental fine line",
  fauna: "Fauna",
  lettering: "Lettering",
  coverups: "Cover-up",
  minimalist: "Minimalist fine line",
};

const categoryAlt: Record<WorkCategory, string> = {
  botanical: "Botanical fine line tattoo by Thaís Freitas",
  ornamental: "Ornamental fine line tattoo by Thaís Freitas",
  fauna: "Fine line fauna tattoo by Thaís Freitas",
  lettering: "Fine line lettering tattoo by Thaís Freitas",
  coverups: "Cover-up tattoo by Thaís Freitas",
  minimalist: "Minimalist fine line tattoo by Thaís Freitas",
};

const makeImages = (category: WorkCategory, files: string[]): GalleryImage[] =>
  files.map((file, index) => ({
    src: `/images/portfolio-sections/${categoryFolders[category]}/${file}`,
    title: `${categoryTitles[category]} ${String(index + 1).padStart(2, "0")}`,
    alt: categoryAlt[category],
    tags: [category],
  }));

export const portfolioImagesByCategory: Record<WorkCategory, GalleryImage[]> = {
  botanical: makeImages("botanical", [
    "20251117_092742.jpg",
    "DSC00032.jpg",
    "DSC03170.jpg",
    "DSC03629.JPG",
    "DSC03805 (2).JPG",
    "DSC03805.jpg",
    "DSC04368.jpg",
    "DSC04669.jpg",
    "DSC09609.jpg",
    "DSC09748.JPG",
    "DSC09906.jpg",
    "DSC09951.jpg",
    "IMG_20260622_080127_471 (1).jpg",
  ]),
  ornamental: makeImages("ornamental", [
    "C0092T01.jpg",
    "DSC03901.jpg",
    "DSC03956.jpg",
    "DSC04691.jpg",
    "DSC04716 (1).jpg",
    "DSC08749 (2).JPG",
    "DSC08749.jpg",
    "IMG_20260507_095553_423.jpg",
  ]),
  fauna: makeImages("fauna", [
    "DSC03768.jpg",
    "DSC04615 (1).jpg",
    "DSC09001 (2).JPG",
    "DSC09001.jpg",
    "DSC09006 (1) (1).jpg",
    "DSC09070.jpg",
    "DSC09609 (2).jpg",
    "DSC09985.JPG",
  ]),
  lettering: makeImages("lettering", [
    "DSC04090.jpg",
    "DSC04105.jpg",
    "DSC04116.jpg",
    "DSC04472.jpg",
    "DSC04544.jpg",
    "DSC04649.jpg",
  ]),
  coverups: makeImages("coverups", [
    "IMG_20250622_143639_732.jpg",
    "DSC00126 (1).jpg",
    "IMG-20260701-.jpg",
    "DOC-20260514-W.jpg",
  ]),
  minimalist: makeImages("minimalist", [
    "DSC04145.jpg",
    "DSC04209.jpg",
    "DSC04352.jpg",
    "DSC04385.jpg",
    "DSC04443.jpg",
  ]),
};

export const portfolioImages: GalleryImage[] = workCategories.flatMap(
  (category) => portfolioImagesByCategory[category],
);

export const florescerImages: GalleryImage[] = portfolioImagesByCategory.coverups.slice(0, 2).map((image, index) => ({
  ...image,
  title: index === 0 ? "Before" : "After",
  alt:
    index === 0
      ? "Before scar restoration tattoo project"
      : "After scar restoration tattoo project with floral composition",
}));

export const availableLocations = [
  {
    flag: "🇧🇷",
    place: "Rio de Janeiro - Thais Freitas Tattoo Studio",
    country: "br",
    image: "/images/available/mato.jpeg",
    alt: "Thais Freitas Tattoo Studio in Rio de Janeiro",
  },
  {
    flag: "🇵🇹",
    place: "Porto - Will Tattoo Studio",
    country: "pt",
    image: "/images/available/porto.jpeg",
    alt: "Will Tattoo Studio in Porto",
  },
  {
    flag: "🇩🇪",
    place: "Aachen - Neon Tattoo Germany",
    country: "de",
    image: "/images/available/aachen-neon.jpg",
    alt: "Neon Tattoo Germany studio in Aachen",
  },
  {
    flag: "🇫🇷",
    place: "Lille - LMI La Machine Infernale",
    country: "fr",
    image: "/images/available/lille-lmi.jpg",
    alt: "LMI La Machine Infernale studio in Lille",
  },
  {
    flag: "🇮🇹",
    place: "Milan - inside tattoo milano",
    country: "it",
    image: "/images/available/milano.jpeg",
    alt: "inside tattoo milano studio in Milan",
  },
  {
    flag: "🇳🇱",
    place: "The Fox Den Amsterdam",
    country: "nl",
    image: "/images/available/amsterdam-fox-den.jpg",
    alt: "The Fox Den Amsterdam tattoo studio entrance at Nieuwe Nieuwstraat 16",
    address: "Nieuwe Nieuwstraat 16, 1012 NH Amsterdam, Netherlands",
  },
  {
    flag: "🇧🇪",
    place: "Roeselare - Inksane",
    country: "be",
    image: "/images/available/roeselare.jpg",
    alt: "Inksane studio in Roeselare",
  },
  {
    flag: "🇧🇪",
    place: "Sint-Niklaas - Inksane",
    country: "be",
    image: "/images/available/sint-niklaas.jpg",
    alt: "Inksane studio in Sint-Niklaas",
  },
  {
    flag: "🇧🇪",
    place: "Brussels - Inksane",
    country: "be",
    image: "/images/available/bruxellas.webp",
    alt: "Inksane studio in Brussels",
  },
] as const;

type SiteContent = {
  metaTitle: string;
  nav: {
    home: string;
    about: string;
    work: string;
    florescer: string;
    contact: string;
    newsletter: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    scroll: string;
  };
  stats: { value: string; label: string }[];
  about: {
    kicker: string;
    title: string;
    paragraphs: string[];
    noteTitle: string;
    note: string;
  };
  signature: {
    kicker: string;
    title: string;
    intro: string;
    items: string[];
  };
  international: {
    title: string;
    body: string;
    places: string;
  };
  work: {
    kicker: string;
    title: string;
    intro: string;
    filters: Record<WorkCategory, string>;
    open: string;
  };
  locations: {
    title: string;
  };
  florescer: {
    kicker: string;
    title: string;
    body: string;
    before: string;
    after: string;
    details: string[];
  };
  studio: {
    kicker: string;
    title: string;
    body: string;
  };
  contact: {
    kicker: string;
    title: string;
    intro: string;
    name: string;
    city: string;
    email: string;
    message: string;
    attachment: string;
    send: string;
    social: string;
    languages: string;
  };
  newsletter: {
    kicker: string;
    title: string;
    body: string;
    soon: string;
    placeholder: string;
  };
  footer: string;
};

export const siteContent: Record<LanguageCode, SiteContent> = {
  en: {
    metaTitle: "Thaís Freitas Tattoo - Fine Line Artist",
    nav: {
      home: "Home",
      about: "About Me",
      work: "My Work",
      florescer: "Florescer",
      contact: "Contact",
      newsletter: "Newsletter",
    },
    hero: {
      eyebrow: "I am a Brazilian artist based in Porto, Portugal",
      title: "Thaís Freitas",
      subtitle: "Fine Line Artist • Floral & Cover-up Specialist • International Guest Artist",
      body: "I create custom tattoos shaped by precision, sensitivity, and personal meaning - from botanical fine line work to cover-up projects that honor new beginnings.",
      primaryCta: "View My Work",
      secondaryCta: "Book a Session",
      scroll: "Scroll",
    },
    stats: [
      { value: "6", label: "languages I use with international clients" },
      { value: "5+", label: "European countries where I guest" },
      { value: "Porto", label: "my private studio in Portugal" },
    ],
    about: {
      kicker: "About me",
      title: "An artistic path I have built from intuition, study, and care.",
      paragraphs: [
        "My relationship with art began in childhood. At six years old, I was already exhibiting drawings in an art gallery, revealing a creative sensitivity and a precise eye for shape, detail, and composition.",
        "That connection became the foundation of a career shaped by dedication, technical study, and continuous refinement. In Brazil, I built a solid professional path, developed my own visual identity, and gathered a loyal community of clients.",
        "Today, I create fine line tattoos that combine delicacy, precision, and narrative. My work turns personal stories into elegant, timeless pieces designed with each client's anatomy, history, and identity in mind.",
      ],
      noteTitle: "Artistic signature",
      note: "I design botanical compositions, fauna, feminine ornamentals, and cover-up projects with empathy and technical control.",
    },
    signature: {
      kicker: "Signature work",
      title: "Delicate lines with depth, symbolism, and presence.",
      intro: "I develop each project from the client's story, placement, and emotional intention, balancing refined aesthetics with long-term readability on the skin.",
      items: [
        "High precision fine line",
        "Floral and botanical compositions",
        "Fauna including lions, tigers, dogs, birds, and other species",
        "Elegant feminine ornamentals",
        "Custom authorial projects",
        "Artistic coverage of traumatic scars",
        "My Florescer project",
        "International guest spots by invitation",
        "Human, personalized care",
        "My private studio in Porto, Portugal",
      ],
    },
    international: {
      title: "My international path",
      body: "I expanded my work into the international scene through invitations from studios and clients across Europe. My guest spots reflect the demand for my authorial style and the distinctive experience I offer.",
      places: "Belgium • Germany • France • Italy • Austria",
    },
    work: {
      kicker: "Portfolio",
      title: "Fine line, botanical stories, fauna, refined ornamentals, and tattoo cover-ups.",
      intro: "A curated selection from my portfolio, bringing together fine line, botanical stories, fauna, refined ornamentals, and tattoo cover-up projects.",
      filters: {
        botanical: "Botanical",
        ornamental: "Ornamental",
        fauna: "Fauna",
        lettering: "Lettering",
        coverups: "Cover-ups",
        minimalist: "Minimalist",
      },
      open: "Open image",
    },
    locations: {
      title: "Available Locations",
    },
    florescer: {
      kicker: "Scar restoration",
      title: "Florescer: transforming marks into new beginnings.",
      body: "I created Florescer to transform traumatic scars into symbols of overcoming, belonging, and renewal. Through custom artistic coverage, I develop compositions that respect the anatomy, the story, and the moment of each client.",
      before: "Before",
      after: "After",
      details: [
        "Traumatic scars, surgery marks, accidents, and medical procedures",
        "Projects built individually with emotional and visual care",
        "A tattoo experience focused on confidence, identity, and reconstruction",
      ],
    },
    studio: {
      kicker: "Porto studio",
      title: "A private space for intimate, intentional tattoo projects.",
      body: "I welcome clients in my own studio in Porto, Portugal - a comfortable and exclusive environment for people who seek personalized projects, human care, and refined technical execution.",
    },
    contact: {
      kicker: "Contact",
      title: "Ready to start your project?",
      intro: "So I can prepare a more accurate quote, please send me the placement you want to tattoo, the approximate size, reference images, and the country where you would like to be tattooed.",
      name: "Name",
      city: "City / Country",
      email: "Email",
      message: "Tell me about your idea",
      attachment: "Attach reference files",
      send: "Send enquiry",
      social: "Socials",
      languages: "Languages: English, Portuguese, German, French, Dutch, Spanish",
    },
    newsletter: {
      kicker: "Newsletter",
      title: "Guest spots, openings, and updates.",
      body: "My newsletter will be available soon. For now, bookings and updates happen directly by email and social media.",
      soon: "Coming soon",
      placeholder: "Email",
    },
    footer: "",
  },
  pt: {
    metaTitle: "Thaís Freitas Tattoo - Artista Fine Line",
    nav: {
      home: "Home",
      about: "Sobre Mim",
      work: "Meu Trabalho",
      florescer: "Florescer",
      contact: "Contato",
      newsletter: "Newsletter",
    },
    hero: {
      eyebrow: "Sou uma artista brasileira baseada no Porto, Portugal",
      title: "Thaís Freitas",
      subtitle: "Fine Line Artist • Especialista em Florais e Coberturas • International Guest Artist",
      body: "Eu crio tatuagens autorais com precisão, sensibilidade e significado - de composições botânicas em fine line a projetos de cobertura que celebram recomeços.",
      primaryCta: "Ver Portfólio",
      secondaryCta: "Agendar Sessão",
      scroll: "Rolar",
    },
    stats: [
      { value: "6", label: "idiomas em que atendo clientes internacionais" },
      { value: "5+", label: "países europeus onde faço guest spots" },
      { value: "Porto", label: "meu estúdio privado em Portugal" },
    ],
    about: {
      kicker: "Sobre mim",
      title: "Uma trajetória artística que construo a partir da intuição, do estudo e do cuidado.",
      paragraphs: [
        "Minha conexão com a arte começou ainda na infância. Aos seis anos, eu já expunha meus desenhos em uma galeria, demonstrando sensibilidade criativa e olhar apurado para formas, detalhes e composição.",
        "Essa relação tornou-se a base de uma carreira guiada por dedicação, estudo técnico e aperfeiçoamento constante. No Brasil, construí uma trajetória sólida, desenvolvi minha identidade própria e conquistei uma comunidade fiel de clientes.",
        "Hoje, meu trabalho une fine line, delicadeza, precisão e narrativa. Cada projeto transforma histórias pessoais em obras elegantes, atemporais e pensadas para a anatomia e identidade de cada pessoa.",
      ],
      noteTitle: "Assinatura artística",
      note: "Crio composições botânicas, fauna, ornamentais femininos e coberturas artísticas com empatia e precisão técnica.",
    },
    signature: {
      kicker: "Assinatura",
      title: "Linhas delicadas com profundidade, simbolismo e presença.",
      intro: "Eu desenvolvo cada projeto a partir da história, do local no corpo e da intenção emocional do cliente, equilibrando estética refinada e leitura duradoura na pele.",
      items: [
        "Fine line de alta precisão",
        "Composições florais e botânicas",
        "Fauna, incluindo leões, tigres, cães, aves e outras espécies",
        "Ornamentais elegantes e femininos",
        "Projetos autorais sob medida",
        "Cobertura artística de cicatrizes traumáticas",
        "Meu projeto Florescer",
        "Guest spots internacionais por convite",
        "Atendimento humanizado e personalizado",
        "Meu espaço próprio no Porto, Portugal",
      ],
    },
    international: {
      title: "Minha trajetória internacional",
      body: "Expandi minha atuação para o cenário internacional através de convites de estúdios e clientes pela Europa. Meus guest spots refletem a procura pela minha linguagem autoral e pela experiência diferenciada que ofereço.",
      places: "Bélgica • Alemanha • França • Itália • Áustria",
    },
    work: {
      kicker: "Portfólio",
      title: "Fine line, histórias botânicas, fauna, ornamentais refinados e coberturas.",
      intro: "Uma seleção curada do meu portfólio, reunindo fine line, histórias botânicas, fauna, ornamentais refinados e projetos de cobertura.",
      filters: {
        botanical: "Botânica",
        ornamental: "Ornamental",
        fauna: "Fauna",
        lettering: "Lettering",
        coverups: "Coberturas",
        minimalist: "Minimalista",
      },
      open: "Abrir imagem",
    },
    locations: {
      title: "Locais disponíveis",
    },
    florescer: {
      kicker: "Restauração de cicatrizes",
      title: "Florescer: transformar marcas em novos começos.",
      body: "Criei o Florescer para transformar cicatrizes traumáticas em símbolos de superação, acolhimento e renovação. Por meio da cobertura artística personalizada, desenvolvo composições que respeitam a anatomia, a história e o momento de vida de cada cliente.",
      before: "Antes",
      after: "Depois",
      details: [
        "Cicatrizes traumáticas, cirurgias, acidentes e procedimentos médicos",
        "Projetos construídos individualmente com cuidado emocional e visual",
        "Uma experiência focada em confiança, identidade e reconstrução",
      ],
    },
    studio: {
      kicker: "Estúdio no Porto",
      title: "Um espaço privado para projetos íntimos e intencionais.",
      body: "Recebo clientes no meu próprio estúdio no Porto, Portugal - um ambiente confortável e exclusivo para quem busca projetos personalizados, atendimento humanizado e excelência técnica.",
    },
    contact: {
      kicker: "Contato",
      title: "Pronta para começar seu projeto?",
      intro: "Para que eu possa formular um orçamento mais preciso, por favor me envie o local que você pretende tatuar, o tamanho aproximado, imagens de referência e o país onde deseja ser atendida.",
      name: "Nome",
      city: "Cidade / País",
      email: "Email",
      message: "Conte sobre sua ideia",
      attachment: "Anexe arquivos de referência",
      send: "Enviar pedido",
      social: "Redes sociais",
      languages: "Idiomas: inglês, português, alemão, francês, holandês, espanhol",
    },
    newsletter: {
      kicker: "Newsletter",
      title: "Guest spots, vagas e novidades.",
      body: "Minha newsletter estará disponível em breve. Por enquanto, agendamentos e novidades acontecem diretamente por email e redes sociais.",
      soon: "Em breve",
      placeholder: "Email",
    },
    footer: "",
  },
  de: {
    metaTitle: "Thaís Freitas Tattoo - Fine Line Artist",
    nav: {
      home: "Home",
      about: "Über Mich",
      work: "Arbeiten",
      florescer: "Florescer",
      contact: "Kontakt",
      newsletter: "Newsletter",
    },
    hero: {
      eyebrow: "Ich bin brasilianische Künstlerin in Porto, Portugal",
      title: "Thaís Freitas",
      subtitle: "Fine Line Artist • Spezialistin für Florales & Cover-ups • International Guest Artist",
      body: "Ich gestalte individuelle Tattoos mit Präzision, Sensibilität und Bedeutung - von botanischen Fine-Line-Kompositionen bis zu Cover-up-Projekten für neue Anfänge.",
      primaryCta: "Portfolio ansehen",
      secondaryCta: "Termin anfragen",
      scroll: "Scrollen",
    },
    stats: [
      { value: "6", label: "Sprachen, in denen ich internationale Kundinnen und Kunden betreue" },
      { value: "5+", label: "europäische Länder, in denen ich Guest Spots mache" },
      { value: "Porto", label: "mein privates Studio in Portugal" },
    ],
    about: {
      kicker: "Über mich",
      title: "Ein künstlerischer Weg, den ich mit Intuition, Studium und Fürsorge aufgebaut habe.",
      paragraphs: [
        "Meine Beziehung zur Kunst begann bereits in der Kindheit. Mit sechs Jahren stellte ich Zeichnungen in einer Galerie aus und zeigte früh ein feines Gespür für Form, Details und Komposition.",
        "Diese Verbindung wurde zur Grundlage einer Laufbahn voller Hingabe, technischer Entwicklung und stetiger Verfeinerung. In Brasilien baute ich eine starke Karriere und eine eigene visuelle Identität auf.",
        "Heute gestalte ich Fine-Line-Tattoos, die Zartheit, Präzision und Erzählung verbinden. Jedes Projekt entwerfe ich im Dialog mit Anatomie, Geschichte und Identität der Kundin oder des Kunden.",
      ],
      noteTitle: "Künstlerische Handschrift",
      note: "Ich entwerfe botanische Kompositionen, Fauna, feminine Ornamente und Cover-ups mit Empathie und technischer Kontrolle.",
    },
    signature: {
      kicker: "Signatur",
      title: "Zarte Linien mit Tiefe, Symbolik und Präsenz.",
      intro: "Ich entwickle jedes Projekt aus persönlicher Geschichte, Platzierung und emotionaler Absicht - mit raffinierter Ästhetik und langfristiger Lesbarkeit auf der Haut.",
      items: [
        "Hochpräzise Fine Line",
        "Florale und botanische Kompositionen",
        "Fauna wie Löwen, Tiger, Hunde, Vögel und weitere Arten",
        "Elegante feminine Ornamente",
        "Individuelle Autorenprojekte",
        "Künstlerische Abdeckung traumatischer Narben",
        "Mein Florescer Projekt",
        "Internationale Guest Spots auf Einladung",
        "Menschliche, persönliche Betreuung",
        "Mein eigenes Studio in Porto, Portugal",
      ],
    },
    international: {
      title: "Mein internationaler Weg",
      body: "Ich habe meine Arbeit durch Einladungen von Studios und Kundinnen und Kunden in Europa erweitert. Meine Guest Spots zeigen die Nachfrage nach meiner eigenen Bildsprache und der besonderen Erfahrung, die ich anbiete.",
      places: "Belgien • Deutschland • Frankreich • Italien • Österreich",
    },
    work: {
      kicker: "Portfolio",
      title: "Fine Line, botanische Geschichten, Fauna, feine Ornamente und Tattoo-Cover-ups.",
      intro: "Eine kuratierte Auswahl aus meinem Portfolio mit Fine Line, botanischen Geschichten, Fauna, raffinierten Ornamenten und Tattoo-Cover-up-Projekten.",
      filters: {
        botanical: "Botanik",
        ornamental: "Ornamental",
        fauna: "Fauna",
        lettering: "Lettering",
        coverups: "Cover-ups",
        minimalist: "Minimalistisch",
      },
      open: "Bild öffnen",
    },
    locations: {
      title: "Verfügbare Standorte",
    },
    florescer: {
      kicker: "Narben-Restoration",
      title: "Florescer: Aus Spuren werden neue Anfänge.",
      body: "Ich habe Florescer geschaffen, um traumatische Narben in Symbole von Überwindung, Zugehörigkeit und Erneuerung zu verwandeln. Ich entwickle individuelle Kompositionen, die Anatomie, Geschichte und Lebensmoment jeder Person respektieren.",
      before: "Vorher",
      after: "Nachher",
      details: [
        "Traumatische Narben, Operationen, Unfälle und medizinische Eingriffe",
        "Individuelle Projekte mit emotionaler und visueller Sorgfalt",
        "Eine Tattoo-Erfahrung für Vertrauen, Identität und Wiederaufbau",
      ],
    },
    studio: {
      kicker: "Studio in Porto",
      title: "Ein privater Raum für intime und bewusste Tattoo-Projekte.",
      body: "Ich empfange Kundinnen und Kunden in meinem eigenen Studio in Porto, Portugal - einem komfortablen und exklusiven Ort für persönliche Projekte, menschliche Betreuung und technische Exzellenz.",
    },
    contact: {
      kicker: "Kontakt",
      title: "Bereit, dein Projekt zu beginnen?",
      intro: "Damit ich ein genaueres Angebot erstellen kann, sende mir bitte die Stelle, die du tätowieren lassen möchtest, die ungefähre Größe, Referenzbilder und das Land, in dem du betreut werden möchtest.",
      name: "Name",
      city: "Stadt / Land",
      email: "E-Mail",
      message: "Erzähle von deiner Idee",
      attachment: "Referenzdateien anhängen",
      send: "Anfrage senden",
      social: "Socials",
      languages: "Sprachen: Englisch, Portugiesisch, Deutsch, Französisch, Niederländisch, Spanisch",
    },
    newsletter: {
      kicker: "Newsletter",
      title: "Guest Spots, Termine und Neuigkeiten.",
      body: "Mein Newsletter ist bald verfügbar. Bis dahin laufen Buchungen und Updates direkt über E-Mail und Social Media.",
      soon: "Demnächst",
      placeholder: "E-Mail",
    },
    footer: "",
  },
  fr: {
    metaTitle: "Thaís Freitas Tattoo - Artiste Fine Line",
    nav: {
      home: "Accueil",
      about: "À Propos",
      work: "Portfolio",
      florescer: "Florescer",
      contact: "Contact",
      newsletter: "Newsletter",
    },
    hero: {
      eyebrow: "Je suis une artiste brésilienne basée à Porto, Portugal",
      title: "Thaís Freitas",
      subtitle: "Fine Line Artist • Spécialiste floral et cover-up • International Guest Artist",
      body: "Je crée des tatouages sur mesure avec précision, sensibilité et sens personnel - des compositions botaniques fine line aux projets cover-up.",
      primaryCta: "Voir le portfolio",
      secondaryCta: "Réserver",
      scroll: "Défiler",
    },
    stats: [
      { value: "6", label: "langues dans lesquelles j'accompagne des clients internationaux" },
      { value: "5+", label: "pays européens où je fais des guest spots" },
      { value: "Porto", label: "mon studio privé au Portugal" },
    ],
    about: {
      kicker: "À propos de moi",
      title: "Un parcours artistique que je construis avec intuition, étude et soin.",
      paragraphs: [
        "Ma relation avec l'art a commencé dans l'enfance. À six ans, j'exposais déjà mes dessins dans une galerie, révélant une sensibilité créative et un regard précis pour les formes, les détails et la composition.",
        "Cette connexion est devenue la base d'une carrière guidée par le dévouement, l'étude technique et l'amélioration continue. Au Brésil, j'ai construit une trajectoire solide et une identité visuelle propre.",
        "Aujourd'hui, je crée des tatouages fine line qui unissent délicatesse, précision et narration. Chaque projet transforme une histoire personnelle en pièce élégante, intemporelle et pensée pour chaque corps.",
      ],
      noteTitle: "Signature artistique",
      note: "Je conçois des compositions botaniques, de la faune, des ornements féminins et des cover-ups avec empathie et maîtrise technique.",
    },
    signature: {
      kicker: "Signature",
      title: "Des lignes délicates avec profondeur, symbolique et présence.",
      intro: "Je construis chaque projet à partir de l'histoire, de l'emplacement et de l'intention émotionnelle de la personne, avec une esthétique raffinée et durable.",
      items: [
        "Fine line de haute précision",
        "Compositions florales et botaniques",
        "Faune comme lions, tigres, chiens, oiseaux et autres espèces",
        "Ornements élégants et féminins",
        "Projets artistiques sur mesure",
        "Couverture artistique de cicatrices traumatiques",
        "Mon projet Florescer",
        "Guest spots internationaux sur invitation",
        "Accompagnement humain et personnalisé",
        "Mon studio privé à Porto, Portugal",
      ],
    },
    international: {
      title: "Mon parcours international",
      body: "J'ai développé mon travail à l'international grâce à des invitations de studios et de clients en Europe. Mes guest spots reflètent la demande pour mon style personnel et l'expérience particulière que j'offre.",
      places: "Belgique • Allemagne • France • Italie • Autriche",
    },
    work: {
      kicker: "Portfolio",
      title: "Fine line, récits botaniques, faune, ornements raffinés et tatouages cover-up.",
      intro: "Une sélection curatée de mon portfolio, réunissant fine line, histoires botaniques, faune, ornements raffinés et tatouages cover-up.",
      filters: {
        botanical: "Botanique",
        ornamental: "Ornemental",
        fauna: "Faune",
        lettering: "Lettering",
        coverups: "Cover-ups",
        minimalist: "Minimaliste",
      },
      open: "Ouvrir l'image",
    },
    locations: {
      title: "Lieux disponibles",
    },
    florescer: {
      kicker: "Restauration de cicatrices",
      title: "Florescer: transformer les marques en nouveaux départs.",
      body: "J'ai créé Florescer pour transformer les cicatrices traumatiques en symboles de dépassement, d'accueil et de renouveau. Je conçois des compositions personnalisées qui respectent l'anatomie, l'histoire et le moment de vie de chaque personne.",
      before: "Avant",
      after: "Après",
      details: [
        "Cicatrices traumatiques, chirurgies, accidents et procédures médicales",
        "Projets individuels avec soin émotionnel et visuel",
        "Une expérience centrée sur la confiance, l'identité et la reconstruction",
      ],
    },
    studio: {
      kicker: "Studio à Porto",
      title: "Un espace privé pour des projets intimes et intentionnels.",
      body: "Je reçois mes clients dans mon propre studio à Porto, Portugal - un environnement confortable et exclusif pour des projets personnalisés, un accueil humain et une exécution technique raffinée.",
    },
    contact: {
      kicker: "Contact",
      title: "Prêt à commencer votre projet ?",
      intro: "Pour que je puisse préparer un devis plus précis, merci de m'envoyer l'emplacement que vous souhaitez tatouer, la taille approximative, des images de référence et le pays où vous souhaitez faire votre séance.",
      name: "Nom",
      city: "Ville / Pays",
      email: "Email",
      message: "Parlez-moi de votre idée",
      attachment: "Joindre des fichiers de référence",
      send: "Envoyer la demande",
      social: "Réseaux",
      languages: "Langues : anglais, portugais, allemand, français, néerlandais, espagnol",
    },
    newsletter: {
      kicker: "Newsletter",
      title: "Guest spots, disponibilités et actualités.",
      body: "Ma newsletter sera bientôt disponible. Pour le moment, les réservations et actualités passent par email et réseaux sociaux.",
      soon: "Bientôt",
      placeholder: "Email",
    },
    footer: "",
  },
  nl: {
    metaTitle: "Thaís Freitas Tattoo - Fine Line Artist",
    nav: {
      home: "Home",
      about: "Over Mij",
      work: "Werk",
      florescer: "Florescer",
      contact: "Contact",
      newsletter: "Newsletter",
    },
    hero: {
      eyebrow: "Ik ben een Braziliaanse artiest gevestigd in Porto, Portugal",
      title: "Thaís Freitas",
      subtitle: "Fine Line Artist • Specialist in florale tattoos en cover-ups • International Guest Artist",
      body: "Ik maak persoonlijke tattoos met precisie, gevoeligheid en betekenis - van botanische fine line composities tot cover-up projecten voor nieuwe beginnen.",
      primaryCta: "Bekijk portfolio",
      secondaryCta: "Boek een sessie",
      scroll: "Scroll",
    },
    stats: [
      { value: "6", label: "talen waarin ik internationale cliënten begeleid" },
      { value: "5+", label: "Europese landen waar ik guest spots doe" },
      { value: "Porto", label: "mijn privéstudio in Portugal" },
    ],
    about: {
      kicker: "Over mij",
      title: "Een artistiek pad dat ik bouw op intuïtie, studie en zorg.",
      paragraphs: [
        "Mijn band met kunst begon in mijn kindertijd. Op zesjarige leeftijd exposeerde ik al tekeningen in een galerie en liet ik een scherp oog zien voor vorm, detail en compositie.",
        "Die verbinding werd de basis van een carrière met toewijding, technische studie en voortdurende verfijning. In Brazilië bouwde ik een sterke professionele basis en een eigen visuele identiteit op.",
        "Vandaag maak ik fine line tattoos die zachtheid, precisie en verhaal combineren. Elk project vertaalt een persoonlijke geschiedenis naar een elegant en tijdloos werk op de huid.",
      ],
      noteTitle: "Artistieke signatuur",
      note: "Ik ontwerp botanische composities, fauna, vrouwelijke ornamenten en cover-ups met empathie en technische controle.",
    },
    signature: {
      kicker: "Signatuur",
      title: "Delicate lijnen met diepte, symboliek en aanwezigheid.",
      intro: "Ik ontwikkel elk project vanuit verhaal, plaatsing en emotionele intentie, met een verfijnde esthetiek die mooi blijft op de huid.",
      items: [
        "Zeer precieze fine line",
        "Florale en botanische composities",
        "Fauna zoals leeuwen, tijgers, honden, vogels en andere soorten",
        "Elegante vrouwelijke ornamenten",
        "Persoonlijke maatwerkprojecten",
        "Artistieke bedekking van traumatische littekens",
        "Mijn Florescer project",
        "Internationale guest spots op uitnodiging",
        "Menselijke en persoonlijke begeleiding",
        "Mijn eigen studio in Porto, Portugal",
      ],
    },
    international: {
      title: "Mijn internationale pad",
      body: "Ik breidde mijn werk internationaal uit via uitnodigingen van studio's en cliënten in Europa. Mijn guest spots tonen de vraag naar mijn eigen stijl en de bijzondere ervaring die ik bied.",
      places: "België • Duitsland • Frankrijk • Italië • Oostenrijk",
    },
    work: {
      kicker: "Portfolio",
      title: "Fine line, botanische verhalen, fauna, verfijnde ornamenten en tattoo cover-ups.",
      intro: "Een gecureerde selectie uit mijn portfolio, met fine line, botanische verhalen, fauna, verfijnde ornamenten en tattoo cover-up projecten.",
      filters: {
        botanical: "Botanisch",
        ornamental: "Ornament",
        fauna: "Fauna",
        lettering: "Lettering",
        coverups: "Cover-ups",
        minimalist: "Minimalistisch",
      },
      open: "Afbeelding openen",
    },
    locations: {
      title: "Beschikbare locaties",
    },
    florescer: {
      kicker: "Littekenrestauratie",
      title: "Florescer: markeringen veranderen in een nieuw begin.",
      body: "Ik maakte Florescer om traumatische littekens te veranderen in symbolen van herstel, zachtheid en vernieuwing. Ik ontwerp persoonlijke composities met respect voor anatomie, verhaal en levensmoment.",
      before: "Voor",
      after: "Na",
      details: [
        "Traumatische littekens, operaties, ongelukken en medische procedures",
        "Individuele projecten met emotionele en visuele zorg",
        "Een tattoo-ervaring gericht op vertrouwen, identiteit en herstel",
      ],
    },
    studio: {
      kicker: "Studio in Porto",
      title: "Een privéruimte voor intieme en bewuste tattoo-projecten.",
      body: "Ik ontvang cliënten in mijn eigen studio in Porto, Portugal - een comfortabele en exclusieve omgeving voor persoonlijke projecten, menselijke aandacht en technische verfijning.",
    },
    contact: {
      kicker: "Contact",
      title: "Klaar om je project te beginnen?",
      intro: "Zodat ik een nauwkeurigere prijsinschatting kan maken, stuur me alsjeblieft de plek die je wilt laten tatoeëren, de geschatte grootte, referentiebeelden en het land waar je geholpen wilt worden.",
      name: "Naam",
      city: "Stad / Land",
      email: "Email",
      message: "Vertel over je idee",
      attachment: "Voeg referentiebestanden toe",
      send: "Aanvraag sturen",
      social: "Socials",
      languages: "Talen: Engels, Portugees, Duits, Frans, Nederlands, Spaans",
    },
    newsletter: {
      kicker: "Newsletter",
      title: "Guest spots, vrije plekken en nieuws.",
      body: "Mijn newsletter is binnenkort beschikbaar. Tot die tijd lopen boekingen en updates via email en social media.",
      soon: "Binnenkort",
      placeholder: "Email",
    },
    footer: "",
  },
  es: {
    metaTitle: "Thaís Freitas Tattoo - Artista Fine Line",
    nav: {
      home: "Inicio",
      about: "Sobre Mí",
      work: "Mi Trabajo",
      florescer: "Florescer",
      contact: "Contacto",
      newsletter: "Newsletter",
    },
    hero: {
      eyebrow: "Soy una artista brasileña basada en Porto, Portugal",
      title: "Thaís Freitas",
      subtitle: "Fine Line Artist • Especialista en florales y coberturas • International Guest Artist",
      body: "Creo tatuajes personalizados con precisión, sensibilidad y significado - desde composiciones botánicas fine line hasta proyectos de cobertura.",
      primaryCta: "Ver portfolio",
      secondaryCta: "Reservar sesión",
      scroll: "Bajar",
    },
    stats: [
      { value: "6", label: "idiomas en los que atiendo clientes internacionales" },
      { value: "5+", label: "países europeos donde hago guest spots" },
      { value: "Porto", label: "mi estudio privado en Portugal" },
    ],
    about: {
      kicker: "Sobre mí",
      title: "Un camino artístico que construyo con intuición, estudio y cuidado.",
      paragraphs: [
        "Mi conexión con el arte comenzó en la infancia. A los seis años ya exponía mis dibujos en una galería, mostrando sensibilidad creativa y una mirada precisa para formas, detalles y composición.",
        "Esa relación se convirtió en la base de una carrera guiada por dedicación, estudio técnico y mejora constante. En Brasil construí una trayectoria sólida y una identidad visual propia.",
        "Hoy creo tatuajes fine line que combinan delicadeza, precisión y narrativa. Cada proyecto transforma historias personales en piezas elegantes y atemporales.",
      ],
      noteTitle: "Firma artística",
      note: "Diseño composiciones botánicas, fauna, ornamentales femeninos y coberturas artísticas con empatía y control técnico.",
    },
    signature: {
      kicker: "Firma",
      title: "Líneas delicadas con profundidad, simbolismo y presencia.",
      intro: "Desarrollo cada proyecto a partir de la historia, la ubicación y la intención emocional de cada cliente, equilibrando estética refinada y lectura duradera sobre la piel.",
      items: [
        "Fine line de alta precisión",
        "Composiciones florales y botánicas",
        "Fauna como leones, tigres, perros, aves y otras especies",
        "Ornamentales elegantes y femeninos",
        "Proyectos autorales a medida",
        "Cobertura artística de cicatrices traumáticas",
        "Mi proyecto Florescer",
        "Guest spots internacionales por invitación",
        "Atención humana y personalizada",
        "Mi estudio propio en Porto, Portugal",
      ],
    },
    international: {
      title: "Mi trayectoria internacional",
      body: "Expandí mi trabajo al escenario internacional gracias a invitaciones de estudios y clientes en Europa. Mis guest spots reflejan la demanda por mi lenguaje autoral y la experiencia diferenciada que ofrezco.",
      places: "Bélgica • Alemania • Francia • Italia • Austria",
    },
    work: {
      kicker: "Portfolio",
      title: "Fine line, historias botánicas, fauna, ornamentos refinados y coberturas.",
      intro: "Una selección curada de mi portfolio, reuniendo fine line, historias botánicas, fauna, ornamentales refinados y proyectos de cobertura.",
      filters: {
        botanical: "Botánica",
        ornamental: "Ornamental",
        fauna: "Fauna",
        lettering: "Lettering",
        coverups: "Coberturas",
        minimalist: "Minimalista",
      },
      open: "Abrir imagen",
    },
    locations: {
      title: "Ubicaciones disponibles",
    },
    florescer: {
      kicker: "Restauración de cicatrices",
      title: "Florescer: transformar marcas en nuevos comienzos.",
      body: "Creé Florescer para transformar cicatrices traumáticas en símbolos de superación, acogida y renovación. Desarrollo composiciones personalizadas que respetan la anatomía, la historia y el momento de vida de cada cliente.",
      before: "Antes",
      after: "Después",
      details: [
        "Cicatrices traumáticas, cirugías, accidentes y procedimientos médicos",
        "Proyectos individuales con cuidado emocional y visual",
        "Una experiencia enfocada en confianza, identidad y reconstrucción",
      ],
    },
    studio: {
      kicker: "Estudio en Porto",
      title: "Un espacio privado para proyectos íntimos e intencionales.",
      body: "Recibo clientes en mi propio estudio en Porto, Portugal - un ambiente cómodo y exclusivo para proyectos personalizados, atención humana y ejecución técnica refinada.",
    },
    contact: {
      kicker: "Contacto",
      title: "¿Lista para empezar tu proyecto?",
      intro: "Para poder preparar un presupuesto más preciso, por favor envíame la zona que quieres tatuar, el tamaño aproximado, imágenes de referencia y el país donde deseas ser atendida.",
      name: "Nombre",
      city: "Ciudad / País",
      email: "Email",
      message: "Cuéntame tu idea",
      attachment: "Adjunta archivos de referencia",
      send: "Enviar consulta",
      social: "Redes",
      languages: "Idiomas: inglés, portugués, alemán, francés, neerlandés, español",
    },
    newsletter: {
      kicker: "Newsletter",
      title: "Guest spots, agenda y novedades.",
      body: "Mi newsletter estará disponible pronto. Por ahora, reservas y novedades se gestionan directamente por email y redes sociales.",
      soon: "Próximamente",
      placeholder: "Email",
    },
    footer: "",
  },
};

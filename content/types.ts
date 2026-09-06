export type Language = "en" | "so";

export type NavKey =
  | "home"
  | "vision"
  | "plan"
  | "about"
  | "news"
  | "media"
  | "join";

export type SectionSlug = Exclude<NavKey, "home">;

export type LinkItem = {
  label: string;
  href: string;
};

export type CampaignContent = {
  lang: Language;
  locale: string;
  languageName: string;
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    shortName: string;
    role: string;
    vision: string;
    sloganOpen: string;
    sloganEqual: string;
  };
  nav: Record<NavKey, string>;
  common: {
    skip: string;
    menuOpen: string;
    menuClose: string;
    exploreVision: string;
    readPlan: string;
    learnMore: string;
    viewAll: string;
    download: string;
    comingSoon: string;
    fieldRequired: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      subhead: string;
      intro: string;
    };
    choice: {
      label: string;
      title: string;
      body: string;
      closing: string;
    };
    running: {
      label: string;
      title: string;
      body: string;
      quote: string;
    };
    experience: {
      label: string;
      title: string;
      intro: string;
      items: Array<{ title: string; detail: string }>;
    };
    vision: {
      label: string;
      title: string;
      body: string;
    };
    priorities: {
      label: string;
      title: string;
      items: Array<{ number: string; title: string; body: string; icon: string }>;
    };
    open: {
      label: string;
      title: string;
      body: string;
      items: string[];
    };
    equal: {
      label: string;
      title: string;
      body: string;
      items: string[];
    };
    pathway: {
      label: string;
      title: string;
      body: string;
      steps: string[];
    };
    regions: {
      label: string;
      title: string;
      body: string;
      cities: string[];
      note: string;
    };
    latest: {
      label: string;
      title: string;
      items: Array<{ tag: string; title: string; body: string; href: string }>;
    };
    final: {
      title: string;
      body: string;
    };
  };
  vision: {
    label: string;
    title: string;
    intro: string;
    phasesTitle: string;
    phases: Array<{ years: string; number: string; title: string; body: string }>;
    flagshipLabel: string;
    flagshipTitle: string;
    flagshipBody: string;
    specs: Array<{ value: string; label: string; detail: string }>;
    anchorTitle: string;
    anchorBody: string;
    fundingLabel: string;
    fundingTitle: string;
    fundingIntro: string;
    funding: Array<{ label: string; title: string; body: string }>;
    accountabilityLabel: string;
    accountabilityTitle: string;
    accountabilityBody: string;
    accountability: Array<{ title: string; body: string }>;
    milestones: Array<{ year: string; label: string; points: string[] }>;
  };
  plan: {
    label: string;
    title: string;
    intro: string;
    promise: string;
    policies: Array<{
      id: string;
      number: string;
      title: string;
      body: string;
      actions: string[];
      icon: string;
    }>;
    firstYearLabel: string;
    firstYearTitle: string;
    first100: string;
    first12: string;
    first100Items: string[];
    first12Items: string[];
  };
  about: {
    label: string;
    title: string;
    intro: string;
    storyTitle: string;
    story: string[];
    journeyTitle: string;
    journey: Array<{ label: string; title: string; body: string }>;
    leadershipTitle: string;
    leadershipBody: string;
    quote: string;
  };
  news: {
    label: string;
    title: string;
    intro: string;
    items: Array<{
      type: string;
      title: string;
      body: string;
      image: string;
      href: string;
    }>;
    newsroomTitle: string;
    newsroomBody: string;
  };
  media: {
    label: string;
    title: string;
    intro: string;
    galleryTitle: string;
    gallery: Array<{ src: string; alt: string; caption: string; position?: string }>;
    resourcesTitle: string;
    resourcesBody: string;
    resources: Array<{ title: string; detail: string; href: string }>;
  };
  join: {
    label: string;
    title: string;
    intro: string;
    waysTitle: string;
    ways: Array<{ title: string; body: string; icon: string }>;
    formTitle: string;
    fields: {
      name: string;
      email: string;
      phone: string;
      region: string;
      role: string;
      message: string;
      consent: string;
      submit: string;
      success: string;
    };
    contactTitle: string;
    contactBody: string;
  };
  footer: {
    statement: string;
    navigation: string;
    contact: string;
    follow: string;
    copyright: string;
  };
};

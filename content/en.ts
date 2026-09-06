import type { CampaignContent } from "./types";
import { defaultImages, participationCopy } from './cms-defaults';

export const en: CampaignContent = {
  images: defaultImages('en'),
  participation: participationCopy('en'),
  contact: { email: 'campaign@deeqafrika.so', location: 'Mogadishu, Somalia' },
  lang: "en",
  locale: "en_GB",
  languageName: "English",
  meta: {
    title: "Deeq M Afrika | Rebuild Somali Football",
    description:
      "Deeq M Afrika's campaign for President of the Somali Football Federation. Vision 2034: an open federation and equal opportunity from grassroots to greatness.",
  },
  brand: {
    name: "Deeq M Afrika",
    shortName: "Deeq Afrika",
    role: "Candidate for President · Somali Football Federation",
    vision: "Vision 2034",
    sloganOpen: "Xiriir Furan.",
    sloganEqual: "Fursad Siman.",
  },
  nav: {
    home: "Home",
    vision: "Vision",
    plan: "The Plan",
    about: "About",
    news: "News",
    media: "Media",
    join: "Get Involved",
  },
  common: {
    skip: "Skip to main content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    exploreVision: "Explore the vision",
    readPlan: "Read the plan",
    learnMore: "Learn more",
    viewAll: "View all",
    download: "Download",
    comingSoon: "Coming soon",
    fieldRequired: "Required field",
  },
  home: {
    ticker: ["REFORM", "DEVELOPMENT", "UNITY", "NATIONAL PRIDE"],
    hero: {
      eyebrow: "Candidate for President · Somali Football Federation · 2027",
      title: "Rebuild Somali Football.",
      subhead: "From grassroots to greatness.",
      intro:
        "A credible plan for an open, accountable federation—and a fair football opportunity for every region, club and talent.",
    },
    choice: {
      label: "The choice",
      title: "The talent is here. The opportunity must reach everyone.",
      body:
        "Somali football has passion, pride and potential. What it needs now is stronger institutions, a national pathway and a federation that serves the whole game—not a narrow circle.",
      closing: "This campaign is about turning belief into structure, and structure into progress.",
    },
    running: {
      label: "Why I am running",
      title: "Football deserves leadership that understands the pitch and the boardroom.",
      body:
        "I have lived the game as a youth player in Europe, a Somalia international and a club executive. I also know what it takes to build organisations, teams and opportunity. I am running to bring those worlds together in service of Somali football.",
      quote: "Somali football has heard enough speeches. Now it needs delivery.",
    },
    experience: {
      label: "From player to builder",
      title: "A life shaped by football. A record of building beyond it.",
      intro:
        "The perspective behind Vision 2034 comes from seeing the game at every level—and understanding what sustainable delivery requires.",
      items: [
        { title: "Ajax youth player", detail: "Early development in a European football environment" },
        { title: "Somalia international", detail: "Represented the national team" },
        { title: "Club executive & investor", detail: "Executive leadership at Jeenyo FC" },
        { title: "Entrepreneur", detail: "Experience building organisations and teams" },
      ],
    },
    vision: {
      label: "Vision 2034",
      title: "Rebuild Somali Football—from grassroots to greatness.",
      body:
        "One term of delivery to establish clean governance, a truly national competition pathway, regional development and the football infrastructure the next generation deserves.",
    },
    priorities: {
      label: "Campaign priorities",
      title: "Four commitments. One national game.",
      items: [
        {
          number: "01",
          title: "Reform the Federation",
          body: "Published audits, clear decisions, member accountability and professional administration.",
          icon: "shield",
        },
        {
          number: "02",
          title: "Develop the Game",
          body: "Grassroots pathways, stronger clubs, coaches, referees and women’s football.",
          icon: "growth",
        },
        {
          number: "03",
          title: "Unite Somali Football",
          body: "Competitions and investment that reach regions and communities across the country.",
          icon: "network",
        },
        {
          number: "04",
          title: "Professionalise the Future",
          body: "Commercial growth, technical centres, digital systems and stronger national teams.",
          icon: "target",
        },
      ],
    },
    open: {
      label: "Xiriir Furan",
      title: "An open federation earns trust.",
      body:
        "Members should see how decisions are made, how money is used and whether promises are being delivered. Openness is the starting point for credibility.",
      items: ["Published annual audits", "A live project ledger", "Clear member communication", "An annual public scorecard"],
    },
    equal: {
      label: "Fursad Siman",
      title: "Opportunity cannot depend on your postcode, gender or connections.",
      body:
        "The national game grows when the door is open to every player, coach, referee, club and community—from Mogadishu to every Federal Member State and across the diaspora.",
      items: ["Regions", "Youth", "Women", "Players", "Coaches", "Referees", "Clubs", "Diaspora"],
    },
    pathway: {
      label: "A national football pathway",
      title: "Every talent should know the next step.",
      body:
        "Vision 2034 connects local participation to elite football through one visible, national development pathway.",
      steps: ["Grassroots", "Academy", "Regional football", "Club football", "Elite development", "National teams"],
    },
    regions: {
      label: "Somalia, not just Mogadishu",
      title: "A national game needs a national footprint.",
      body:
        "Regional football cannot remain outside the main pathway. Competitions, technical development and facilities must be designed around the realities of the whole country.",
      cities: ["Garowe", "Kismayo", "Baydhabo", "Galkayo", "Dhuusamarreeb", "Beledweyne"],
      note: "Local identity. Regional opportunity. One national standard.",
    },
    latest: {
      label: "From the campaign",
      title: "The work behind the vision.",
      items: [
        {
          tag: "Competition reform",
          title: "Opening the national football pyramid",
          body: "How regional pathways and national competitions can serve the whole country.",
          href: "/en/plan#clubs-competitions",
        },
        {
          tag: "Flagship proposal",
          title: "Regional Technical Centres",
          body: "A practical model for pitches, education, camps and year-round development.",
          href: "/en/vision#technical-centres",
        },
        {
          tag: "Accountability",
          title: "A term judged on delivery",
          body: "Public scorecards, project reporting and clear milestones through 2034.",
          href: "/en/vision#accountability",
        },
      ],
    },
    final: {
      title: "An open federation. A fair chance.",
      body: "Together, we can build the structures that turn Somali football’s potential into lasting progress.",
    },
  },
  vision: {
    label: "Vision 2034",
    title: "One term of delivery. A decade of legacy.",
    intro:
      "Vision 2034 is an eight-year direction beginning with the 2027 election: restore trust, widen opportunity, build the physical and technical foundations, and create a credible pathway from the local pitch to the national team.",
    phasesTitle: "A staged plan for lasting progress",
    phases: [
      {
        years: "2027—2029",
        number: "01",
        title: "Foundation",
        body: "Trust, governance and structure: audited systems, a fixed calendar, digital registration and support for clubs and regions.",
      },
      {
        years: "2029—2031",
        number: "02",
        title: "Growth",
        body: "Development, competitions and investment: expand youth and women’s football and professionalise the domestic game.",
      },
      {
        years: "2031—2034",
        number: "03",
        title: "Excellence",
        body: "Competitiveness and legacy: pathway players progress to senior clubs and stronger national teams.",
      },
    ],
    flagshipLabel: "The flagship initiative",
    flagshipTitle: "Regional Technical Centres",
    flagshipBody:
      "A standardised, self-contained football ecosystem in every Federal Member State—built around elite surfaces, education, residency and year-round local use.",
    specs: [
      { value: "105 × 68m", label: "11-a-side pitch", detail: "Elite natural grass" },
      { value: "40 × 20m", label: "Covered futsal", detail: "All-weather court" },
      { value: "37 × 28m", label: "Beach football", detail: "Dedicated sand court" },
      { value: "44 beds", label: "Residency", detail: "12 rooms for camps" },
      { value: "6 + 2", label: "Learning spaces", detail: "Classrooms and event rooms" },
      { value: "Year-round", label: "Sustainable use", detail: "Solar, changing rooms and canteen" },
    ],
    anchorTitle: "The U8 anchor model",
    anchorBody:
      "Each centre would be allocated to two qualified local clubs or elite academies committed to structured, audited youth programmes from Under-8—ensuring the facilities are used and the pathway begins locally.",
    fundingLabel: "Financing Vision 2034",
    fundingTitle: "A plan needs a credible route to funding.",
    fundingIntro:
      "The campaign proposes three complementary layers, underpinned by audited compliance and public reporting.",
    funding: [
      {
        label: "Layer 1",
        title: "FIFA Forward 4.0",
        body: "Restore compliance, move beyond operational support and prepare credible infrastructure projects for available development grants.",
      },
      {
        label: "Layer 2",
        title: "Commercial revenue & PPPs",
        body: "Build sponsorship, broadcasting and corporate partnerships alongside public-private delivery for land and facilities.",
      },
      {
        label: "Layer 3",
        title: "Diaspora & development partners",
        body: "Create an audited, transparent vehicle for investment in facilities, academies and clubs.",
      },
    ],
    accountabilityLabel: "How delivery will be judged",
    accountabilityTitle: "Accountability turns a manifesto into a mandate.",
    accountabilityBody:
      "The public should be able to see what was promised, what was delivered, what slipped and why.",
    accountability: [
      { title: "Annual public scorecard", body: "Progress against every phase and milestone, published each year." },
      { title: "Live project ledger", body: "Budget, contractor, timeline and status for every funded project." },
      { title: "Standing members’ review", body: "A formal annual forum for clubs and regions to question leadership." },
      { title: "A term judged on projects", body: "Clear handover targets for phases one and two." },
    ],
    milestones: [
      {
        year: "2029",
        label: "Mid-term",
        points: ["Two seasons completed on schedule", "District competition active in every member state", "Technical Centre construction underway"],
      },
      {
        year: "2031",
        label: "End of term",
        points: ["Technical Centres completed and handed over", "Regional clubs licensed into an expanded pyramid", "U8 cohorts training in the centres"],
      },
      {
        year: "2034",
        label: "Vision target",
        points: ["Home-grown graduates in the national pathway", "A professionally administered league pyramid", "A federation trusted by its members"],
      },
    ],
  },
  plan: {
    label: "The plan",
    title: "Reform the institution. Develop the game.",
    intro:
      "The programme turns four campaign priorities into practical commitments across the federation, competitions, technical development and the football economy.",
    promise: "Clear actions. National reach. Public accountability.",
    policies: [
      {
        id: "governance",
        number: "01",
        title: "Governance & Transparency",
        body: "A federation that belongs to its members and serves the game with fairness.",
        actions: ["Publish independent annual audits", "Communicate decisions clearly to members", "Enforce conflict-of-interest rules", "Report delivery through a public scorecard"],
        icon: "shield",
      },
      {
        id: "clubs-competitions",
        number: "02",
        title: "Clubs & Competitions",
        body: "Strong clubs and credible competitions are the foundation of the national game.",
        actions: ["Create a club support programme", "Publish a unified national calendar", "Develop the General Daud Cup pathway", "Establish the Somali District Champions Cup"],
        icon: "trophy",
      },
      {
        id: "regional-football",
        number: "03",
        title: "Regional Football",
        body: "Regions should organise meaningful football and connect directly to the national pyramid.",
        actions: ["Plan competitions around regional realities", "Build club-city partnerships", "Create state routes into national competition", "Prioritise local ownership over centralised control"],
        icon: "map",
      },
      {
        id: "grassroots-youth",
        number: "04",
        title: "Grassroots & Youth Development",
        body: "A clear development pathway beginning at Under-8 and growing through every age group.",
        actions: ["Build U8, U10 and U12 structures", "Connect schools, districts and academies", "Create a national scouting network", "Link local talent to elite development"],
        icon: "growth",
      },
      {
        id: "coaching",
        number: "05",
        title: "Coaching Development",
        body: "A unified national football philosophy supported by better coach education.",
        actions: ["Expand CAF-standard education", "Create progressive licensing pathways", "Use Technical Centres for regular learning", "Connect coaching to youth development"],
        icon: "clipboard",
      },
      {
        id: "refereeing",
        number: "06",
        title: "Refereeing",
        body: "Officials need independence, preparation, protection and professional respect.",
        actions: ["Protect independent appointments", "Improve safety and logistics", "Ensure timely payments", "Support international progression"],
        icon: "whistle",
      },
      {
        id: "womens-football",
        number: "07",
        title: "Women’s Football",
        body: "Women’s football should have dedicated leadership, resources and a visible national pathway.",
        actions: ["Create a dedicated budget line", "Develop regional league pathways", "Grow girls’ participation from grassroots", "Build national youth-team opportunities"],
        icon: "users",
      },
      {
        id: "infrastructure",
        number: "08",
        title: "Infrastructure & Facilities",
        body: "Pitches and football development spaces must come before administrative luxury.",
        actions: ["Deliver Regional Technical Centres", "Standardise practical facility designs", "Plan for year-round local use", "Use sustainable energy and operations"],
        icon: "building",
      },
      {
        id: "commercial",
        number: "09",
        title: "Commercial Development",
        body: "A dedicated commercial function can unlock revenue beyond grants.",
        actions: ["Build credible sponsorship packages", "Develop broadcasting opportunities", "Structure public-private partnerships", "Create transparent diaspora investment routes"],
        icon: "chart",
      },
      {
        id: "national-teams",
        number: "10",
        title: "National Teams",
        body: "The national teams should be the destination of a functioning domestic pathway.",
        actions: ["Improve preparation for senior and youth teams", "Connect diaspora scouting to local development", "Build camps into the national calendar", "Measure progress against the 2027 baseline"],
        icon: "flag",
      },
      {
        id: "partnerships",
        number: "11",
        title: "Diaspora & International Partnerships",
        body: "Somalia’s global football community can contribute through transparent, defined programmes.",
        actions: ["Publish project opportunities", "Report how every contribution is used", "Build sport-for-development partnerships", "Connect international expertise to local delivery"],
        icon: "globe",
      },
    ],
    firstYearLabel: "The road to Vision 2034",
    firstYearTitle: "First-year priorities",
    first100: "First 100 days",
    first12: "First 12 months",
    first100Items: [
      "Commission the first independent financial audit of the SFF",
      "Open direct engagement with FIFA on Forward 4.0 project entitlement",
      "Launch the Regional Technical Centres Masterplan",
      "Initiate land and PPP discussions with public and private partners",
      "Host a Club–City Partnership Summit",
      "Publish a clear, unified national football calendar",
    ],
    first12Items: [
      "Publish the first independently audited financial report and a live project ledger",
      "Launch the inaugural Somali District Champions Cup",
      "Publish the criteria for Technical Centre club and academy places",
      "Deliver coaching and referee workshops across member states",
      "Launch digital player registration and automated competition systems",
    ],
  },
  about: {
    label: "About Deeq",
    title: "From the pitch to the boardroom.",
    intro:
      "Deeq M Afrika brings together the perspective of a player, the responsibilities of a club executive and the delivery discipline of an entrepreneur.",
    storyTitle: "Football from every side of the touchline",
    story: [
      "Deeq’s football journey began in a European youth environment at Ajax and later included representing Somalia at international level. Those experiences formed a clear view of what talent needs: standards, opportunity and a pathway people can trust.",
      "Today, as an executive and investor at Jeenyo FC, he sees the realities of Somali club football every week—from administration and finance to player development and competition planning.",
      "Beyond football, his work as an entrepreneur has required him to build organisations, lead teams and turn ambitious ideas into functioning systems. Vision 2034 brings that practical experience into one national football programme.",
    ],
    journeyTitle: "A perspective built through experience",
    journey: [
      { label: "The player", title: "Ajax youth football", body: "A formative view of structured development and professional standards." },
      { label: "The international", title: "Somalia national team", body: "The pride and responsibility of representing the nation." },
      { label: "The builder", title: "Jeenyo FC & Xamar United Academy", body: "Direct experience developing teams, pathways and club structures." },
      { label: "The leader", title: "Entrepreneurship", body: "Building organisations that serve Somali communities at scale." },
    ],
    leadershipTitle: "Why that experience matters now",
    leadershipBody:
      "Somali football’s challenges are connected. Governance affects funding. Funding affects facilities. Facilities affect development. Development affects the national teams. The federation needs leadership able to connect the system and deliver it as one programme.",
    quote: "True progress on the pitch requires a solid foundation off it.",
  },
  news: {
    label: "Campaign",
    title: "Ideas, commitments and campaign updates.",
    intro:
      "This newsroom is structured for future announcements, policy positions, videos and media appearances. The first briefings introduce the core Vision 2034 proposals.",
    items: [
      { type: "Policy briefing", title: "A federation that earns trust", body: "The governance commitments behind Xiriir Furan: audits, open decisions and visible delivery.", image: "/images/deeq-stadium.jpg", href: "/en/plan#governance" },
      { type: "Vision 2034", title: "Regional Technical Centres", body: "The flagship proposal for pitches, education, camps and local youth pathways.", image: "/images/technical-center-masterplan.jpg", href: "/en/vision#technical-centres" },
      { type: "Competition reform", title: "A league for the whole country", body: "Connecting regional football to a credible national competition structure.", image: "/images/competition-pathway.jpg", href: "/en/plan#clubs-competitions" },
      { type: "Grassroots", title: "The pathway begins at Under-8", body: "Why long-term national progress must start on the local pitch.", image: "/images/kids-match.jpg", href: "/en/plan#grassroots-youth" },
    ],
    newsroomTitle: "For media enquiries",
    newsroomBody: "Interview requests, campaign materials and media coordination can be directed to campaign@deeqafrika.so.",
  },
  media: {
    label: "Media",
    title: "The campaign on the ground.",
    intro:
      "Football leadership is visible in the people, places and moments that shape the game. This library will grow with campaign photography, video, interviews and downloadable material.",
    galleryTitle: "Campaign photography",
    gallery: [
      { src: "/images/deeq-campaign-portrait.jpg", alt: "Deeq M Afrika campaign portrait in front of the Somali flag", caption: "Xiriir Furan. Fursad Siman.", position: "50% 24%" },
      { src: "/images/deeq-kids-united.jpg", alt: "Deeq Afrika with a young footballer at a community event", caption: "Standing with the next generation", position: "50% 35%" },
      { src: "/images/kids-match.jpg", alt: "Children playing a football match", caption: "Grassroots football in every community", position: "50% 50%" },
      { src: "/images/national-anthem.jpg", alt: "Somalia players and staff standing for the national anthem", caption: "National pride and shared purpose", position: "50% 50%" },
      { src: "/images/certificate-girl.jpg", alt: "A young girl receiving recognition at a football event", caption: "A fair chance for every young player", position: "50% 70%" },
      { src: "/images/players-celebrate.jpg", alt: "Somalia football players celebrating together", caption: "The talent is already here", position: "50% 40%" },
    ],
    resourcesTitle: "Campaign resources",
    resourcesBody: "Download the current Vision 2034 campaign document. Additional press photography and video will be added as they are released.",
    resources: [
      { title: "Rebuild Somali Football — Vision 2034", detail: "Campaign vision · PDF · English", href: "/downloads/rebuild-somali-football-vision-2034.pdf" },
    ],
  },
  join: {
    label: "Get involved",
    title: "Help build the next chapter of Somali football.",
    intro:
      "This campaign belongs to the people who make the game possible: clubs, regions, players, coaches, referees, supporters and the Somali football community around the world.",
    waysTitle: "There is a place for your voice",
    ways: [
      { title: "Express your support", body: "Tell the campaign why reform and equal opportunity matter to you.", icon: "heart" },
      { title: "Join campaign activity", body: "Register your interest in community, football and campaign events.", icon: "users" },
      { title: "Share expertise", body: "Contribute knowledge from football, business, media or the diaspora.", icon: "spark" },
    ],
    roles: ["Support the campaign", "Activities & events", "Professional expertise", "Media enquiry"],
    selectRole: "Select one",
    formTitle: "Join the campaign",
    fields: {
      name: "Full name",
      email: "Email address",
      phone: "Phone number (optional)",
      region: "Region / country",
      role: "How would you like to get involved?",
      message: "Your message (optional)",
      consent: "I agree that the campaign may contact me about campaign activity.",
      submit: "Sign up",
      success: "Thank you for joining. Your registration has been saved and the campaign team will be in touch.",
    },
    contactTitle: "Prefer to contact us directly?",
    contactBody: "Email campaign@deeqafrika.so · Mogadishu, Somalia",
  },
  footer: {
    socialLinks: [{ label: "X · @DeeqAfrika", href: "https://x.com/DeeqAfrika" }, { label: "Instagram · @deeqafrik", href: "https://instagram.com/deeqafrik" }],
    socialNote: "Facebook · Deeq Mohamed Afrika",
    electionYear: "2027",
    statement: "Rebuild Somali Football — from grassroots to greatness.",
    navigation: "Explore",
    contact: "Contact",
    follow: "Follow the campaign",
    copyright: "© 2026 Deeq M Afrika Campaign. All rights reserved.",
  },
};

import Image from "next/image";
import Link from "next/link";
import type { CampaignContent, SectionSlug } from "@/content";
import { CampaignIcon } from "./CampaignIcon";
import { JoinForm } from "./JoinForm";
import { Reveal } from "./Reveal";

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</p>;
}

function ArrowLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link className={`arrow-link ${light ? "arrow-link-light" : ""}`} href={href}>
      <span>{children}</span>
      <CampaignIcon name="arrow" size={18} />
    </Link>
  );
}

function PageHero({
  copy,
  label,
  title,
  intro,
  image,
  alt,
  position = "center",
}: {
  copy: CampaignContent;
  label: string;
  title: string;
  intro: string;
  image: string;
  alt: string;
  position?: string;
}) {
  return (
    <section className="page-hero section-dark">
      <div className="page-hero-grid container">
        <div className="page-hero-copy">
          <Eyebrow light>{label}</Eyebrow>
          <h1>{title}</h1>
          <p>{intro}</p>
          <div className="page-hero-slogan" aria-label={`${copy.brand.sloganOpen} ${copy.brand.sloganEqual}`}>
            <span>{copy.brand.sloganOpen}</span>
            <span>{copy.brand.sloganEqual}</span>
          </div>
        </div>
        <div className="page-hero-image">
          <Image src={image} alt={alt} fill priority sizes="(max-width: 800px) 100vw, 46vw" style={{ objectPosition: position }} />
          <span className="image-frame" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export function HomePage({ copy }: { copy: CampaignContent }) {
  const lang = copy.lang;

  return (
    <main id="main-content">
      <section className="home-hero section-dark">
        <div className="hero-grid container">
          <div className="hero-copy">
            <Eyebrow light>{copy.home.hero.eyebrow}</Eyebrow>
            <h1>{copy.home.hero.title}</h1>
            <p className="hero-subhead">{copy.home.hero.subhead}</p>
            <p className="hero-intro">{copy.home.hero.intro}</p>
            <div className="button-row">
              <Link className="button button-yellow" href={`/${lang}/vision`}>
                {copy.common.exploreVision}
                <CampaignIcon name="arrow" size={18} />
              </Link>
              <Link className="button button-outline-light" href={`/${lang}/plan`}>
                {copy.common.readPlan}
              </Link>
            </div>
            <div className="hero-slogan">
              <span>{copy.brand.sloganOpen}</span>
              <span>{copy.brand.sloganEqual}</span>
            </div>
          </div>
          <div className="hero-portrait">
            <Image
              src="/images/deeq-campaign-portrait.jpg"
              alt={`${copy.brand.name} — ${copy.brand.role}`}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 48vw"
            />
            <div className="portrait-caption">
              <strong>{copy.brand.name}</strong>
              <span>{copy.brand.role}</span>
            </div>
          </div>
        </div>
        <div className="hero-ticker" aria-hidden="true">
          <span>{copy.lang === "so" ? "DIB-U-HABAYN" : "REFORM"}</span>
          <i />
          <span>{copy.lang === "so" ? "HORUMAR" : "DEVELOPMENT"}</span>
          <i />
          <span>{copy.lang === "so" ? "MIDNIMO" : "UNITY"}</span>
          <i />
          <span>{copy.lang === "so" ? "SHARAFTA QARANKA" : "NATIONAL PRIDE"}</span>
        </div>
      </section>

      <section className="choice-section section-yellow">
        <Reveal className="choice-grid container">
          <Eyebrow>{copy.home.choice.label}</Eyebrow>
          <div>
            <h2>{copy.home.choice.title}</h2>
            <p>{copy.home.choice.body}</p>
            <strong>{copy.home.choice.closing}</strong>
          </div>
        </Reveal>
      </section>

      <section className="running-section section-light">
        <div className="container split-editorial">
          <Reveal className="editorial-copy">
            <Eyebrow>{copy.home.running.label}</Eyebrow>
            <h2>{copy.home.running.title}</h2>
            <p>{copy.home.running.body}</p>
            <blockquote>“{copy.home.running.quote}”</blockquote>
            <ArrowLink href={`/${lang}/about`}>{copy.nav.about}</ArrowLink>
          </Reveal>
          <Reveal className="editorial-image portrait-landscape" delay={120}>
            <Image
              src="/images/deeq-kids-united.jpg"
              alt={copy.lang === "so" ? "Deeq Afrika oo la jooga ciyaaryahan yar" : "Deeq Afrika with a young footballer"}
              fill
              sizes="(max-width: 800px) 100vw, 48vw"
            />
            <span className="photo-label">{copy.home.experience.items[2].title}</span>
          </Reveal>
        </div>
      </section>

      <section className="experience-section section-paper">
        <div className="container experience-grid">
          <Reveal className="experience-intro">
            <Eyebrow>{copy.home.experience.label}</Eyebrow>
            <h2>{copy.home.experience.title}</h2>
            <p>{copy.home.experience.intro}</p>
          </Reveal>
          <div className="experience-list">
            {copy.home.experience.items.map((item, index) => (
              <Reveal key={item.title} className="experience-row" delay={index * 65}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="vision-bridge section-dark">
        <div className="vision-bridge-image">
          <Image
            src="/images/national-huddle.jpg"
            alt={copy.lang === "so" ? "Ciyaartoyda Soomaaliya oo isku duuban" : "Somalia players gathered in a team huddle"}
            fill
            sizes="100vw"
          />
        </div>
        <div className="vision-bridge-overlay" />
        <Reveal className="vision-bridge-copy container">
          <Eyebrow light>{copy.home.vision.label}</Eyebrow>
          <h2>{copy.home.vision.title}</h2>
          <p>{copy.home.vision.body}</p>
          <ArrowLink href={`/${lang}/vision`} light>{copy.common.exploreVision}</ArrowLink>
        </Reveal>
      </section>

      <section className="priorities-section section-light">
        <div className="container">
          <Reveal className="section-heading section-heading-row">
            <div>
              <Eyebrow>{copy.home.priorities.label}</Eyebrow>
              <h2>{copy.home.priorities.title}</h2>
            </div>
            <ArrowLink href={`/${lang}/plan`}>{copy.common.readPlan}</ArrowLink>
          </Reveal>
          <div className="priority-list">
            {copy.home.priorities.items.map((item, index) => (
              <Reveal className="priority-row" key={item.number} delay={index * 60}>
                <span className="priority-number">{item.number}</span>
                <span className="priority-icon"><CampaignIcon name={item.icon} size={26} /></span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <CampaignIcon name="arrow" size={22} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="slogan-sections section-paper">
        <div className="container slogan-grid">
          <Reveal className="slogan-panel slogan-panel-open">
            <Eyebrow>{copy.home.open.label}</Eyebrow>
            <h2>{copy.home.open.title}</h2>
            <p>{copy.home.open.body}</p>
            <ul>
              {copy.home.open.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Reveal>
          <Reveal className="slogan-panel slogan-panel-equal" delay={100}>
            <Eyebrow light>{copy.home.equal.label}</Eyebrow>
            <h2>{copy.home.equal.title}</h2>
            <p>{copy.home.equal.body}</p>
            <div className="equal-tags">
              {copy.home.equal.items.map((item) => <span key={item}>{item}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pathway-section section-dark">
        <div className="container">
          <Reveal className="pathway-heading">
            <Eyebrow light>{copy.home.pathway.label}</Eyebrow>
            <h2>{copy.home.pathway.title}</h2>
            <p>{copy.home.pathway.body}</p>
          </Reveal>
          <div className="pathway-track" role="list">
            {copy.home.pathway.steps.map((step, index) => (
              <Reveal className="pathway-step" key={step} delay={index * 60}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {index < copy.home.pathway.steps.length - 1 ? <CampaignIcon name="arrow" size={20} /> : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="regions-section section-light">
        <div className="container regions-grid">
          <Reveal className="regions-photo">
            <Image
              src="/images/technical-center-training.jpg"
              alt={copy.lang === "so" ? "Tababbar kubadeed oo ka socda xarun farsamo" : "Football training at a proposed technical centre"}
              fill
              sizes="(max-width: 800px) 100vw, 52vw"
            />
            <span className="image-frame image-frame-yellow" aria-hidden="true" />
          </Reveal>
          <Reveal className="regions-copy" delay={100}>
            <Eyebrow>{copy.home.regions.label}</Eyebrow>
            <h2>{copy.home.regions.title}</h2>
            <p>{copy.home.regions.body}</p>
            <div className="city-list">
              {copy.home.regions.cities.map((city) => <span key={city}>{city}</span>)}
            </div>
            <strong className="regions-note">{copy.home.regions.note}</strong>
          </Reveal>
        </div>
      </section>

      <section className="latest-section section-paper">
        <div className="container">
          <Reveal className="section-heading section-heading-row">
            <div>
              <Eyebrow>{copy.home.latest.label}</Eyebrow>
              <h2>{copy.home.latest.title}</h2>
            </div>
            <ArrowLink href={`/${lang}/news`}>{copy.common.viewAll}</ArrowLink>
          </Reveal>
          <div className="latest-grid">
            {copy.home.latest.items.map((item, index) => (
              <Reveal className="latest-card" key={item.title} delay={index * 80}>
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <ArrowLink href={item.href}>{copy.common.learnMore}</ArrowLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta copy={copy} />
    </main>
  );
}

function FinalCta({ copy }: { copy: CampaignContent }) {
  return (
    <section className="final-cta section-yellow">
      <Reveal className="container final-cta-grid">
        <div className="final-slogan">
          <span>{copy.brand.sloganOpen}</span>
          <span>{copy.brand.sloganEqual}</span>
        </div>
        <div>
          <h2>{copy.home.final.title}</h2>
          <p>{copy.home.final.body}</p>
          <div className="button-row">
            <Link className="button button-navy" href={`/${copy.lang}/join`}>{copy.nav.join}</Link>
            <Link className="button button-outline-dark" href={`/${copy.lang}/vision`}>{copy.nav.vision}</Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function VisionPage({ copy }: { copy: CampaignContent }) {
  return (
    <main id="main-content">
      <PageHero
        copy={copy}
        label={copy.vision.label}
        title={copy.vision.title}
        intro={copy.vision.intro}
        image="/images/national-huddle.jpg"
        alt={copy.lang === "so" ? "Ciyaartoyda Soomaaliya oo isku duuban" : "Somalia national players in a huddle"}
        position="center 46%"
      />
      <section className="phases-section section-light">
        <div className="container">
          <Reveal className="section-heading narrow-heading"><h2>{copy.vision.phasesTitle}</h2></Reveal>
          <div className="phase-grid">
            {copy.vision.phases.map((phase, index) => (
              <Reveal className={`phase-card ${index === 0 ? "phase-card-featured" : ""}`} key={phase.number} delay={index * 80}>
                <div className="phase-card-top"><span>{phase.number}</span><small>{phase.years}</small></div>
                <h3>{phase.title}</h3>
                <p>{phase.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="technical-centres" className="technical-section section-dark anchor-section">
        <div className="container">
          <Reveal className="technical-heading">
            <Eyebrow light>{copy.vision.flagshipLabel}</Eyebrow>
            <h2>{copy.vision.flagshipTitle}</h2>
            <p>{copy.vision.flagshipBody}</p>
          </Reveal>
          <Reveal className="technical-masterplan">
            <Image
              src="/images/technical-center-masterplan.jpg"
              alt={copy.lang === "so" ? "Qorshaha muuqaalka Xarun Farsamo oo Gobol" : "Concept masterplan for a Regional Technical Centre"}
              fill
              sizes="(max-width: 900px) 100vw, 1200px"
            />
          </Reveal>
          <div className="spec-grid">
            {copy.vision.specs.map((spec, index) => (
              <Reveal className="spec-item" key={spec.label} delay={index * 55}>
                <strong>{spec.value}</strong>
                <h3>{spec.label}</h3>
                <p>{spec.detail}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="anchor-model">
            <div className="anchor-number">U8</div>
            <div><h3>{copy.vision.anchorTitle}</h3><p>{copy.vision.anchorBody}</p></div>
          </Reveal>
        </div>
      </section>

      <section className="funding-section section-paper">
        <div className="container">
          <Reveal className="section-heading narrow-heading">
            <Eyebrow>{copy.vision.fundingLabel}</Eyebrow>
            <h2>{copy.vision.fundingTitle}</h2>
            <p>{copy.vision.fundingIntro}</p>
          </Reveal>
          <div className="funding-grid">
            {copy.vision.funding.map((item, index) => (
              <Reveal className="funding-item" key={item.label} delay={index * 80}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="accountability" className="accountability-section section-light anchor-section">
        <div className="container">
          <Reveal className="accountability-heading">
            <Eyebrow>{copy.vision.accountabilityLabel}</Eyebrow>
            <h2>{copy.vision.accountabilityTitle}</h2>
            <p>{copy.vision.accountabilityBody}</p>
          </Reveal>
          <div className="accountability-grid">
            {copy.vision.accountability.map((item, index) => (
              <Reveal className="accountability-item" key={item.title} delay={index * 60}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="milestone-grid">
            {copy.vision.milestones.map((item, index) => (
              <Reveal className="milestone" key={item.year} delay={index * 80}>
                <strong>{item.year}</strong>
                <span>{item.label}</span>
                <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCta copy={copy} />
    </main>
  );
}

export function PlanPage({ copy }: { copy: CampaignContent }) {
  return (
    <main id="main-content">
      <PageHero
        copy={copy}
        label={copy.plan.label}
        title={copy.plan.title}
        intro={copy.plan.intro}
        image="/images/kids-match.jpg"
        alt={copy.lang === "so" ? "Carruur ciyaaraysa kubadda cagta" : "Young players in a grassroots football match"}
      />
      <section className="policy-index section-yellow">
        <div className="container policy-index-inner">
          <strong>{copy.plan.promise}</strong>
          <div>
            {copy.plan.policies.map((policy) => <a key={policy.id} href={`#${policy.id}`}>{policy.number}</a>)}
          </div>
        </div>
      </section>
      <section className="policies-section section-light">
        <div className="container policy-list">
          {copy.plan.policies.map((policy) => (
            <Reveal className="policy-row anchor-section" key={policy.id}>
              <div id={policy.id} className="anchor-target" aria-hidden="true" />
              <div className="policy-mark">
                <span>{policy.number}</span>
                <CampaignIcon name={policy.icon} size={28} />
              </div>
              <div className="policy-copy">
                <h2>{policy.title}</h2>
                <p>{policy.body}</p>
              </div>
              <ul>
                {policy.actions.map((action) => <li key={action}>{action}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="first-year-section section-dark">
        <div className="container">
          <Reveal className="section-heading narrow-heading">
            <Eyebrow light>{copy.plan.firstYearLabel}</Eyebrow>
            <h2>{copy.plan.firstYearTitle}</h2>
          </Reveal>
          <div className="first-year-grid">
            <Reveal className="first-year-column">
              <h3>{copy.plan.first100}</h3>
              <ol>{copy.plan.first100Items.map((item) => <li key={item}>{item}</li>)}</ol>
            </Reveal>
            <Reveal className="first-year-column" delay={100}>
              <h3>{copy.plan.first12}</h3>
              <ol>{copy.plan.first12Items.map((item) => <li key={item}>{item}</li>)}</ol>
            </Reveal>
          </div>
        </div>
      </section>
      <FinalCta copy={copy} />
    </main>
  );
}

export function AboutPage({ copy }: { copy: CampaignContent }) {
  const journeyCards = [
    {
      image: "/images/ajax-youth-team.png",
      alt: copy.lang === "so" ? "Kooxda dhalinyarada Ajax" : "Ajax youth football team posing together on the pitch",
      position: "center",
      items: copy.about.journey.slice(0, 1),
    },
    {
      image: "/images/somalia-national-team.png",
      alt: copy.lang === "so" ? "Ciyaartoyda Xulka Qaranka Soomaaliyeed oo safan garoonka" : "Somalia national team players lined up at the stadium",
      position: "center 60%",
      items: copy.about.journey.slice(1, 2),
    },
    {
      image: "/images/deeq-leadership-portrait.png",
      alt: copy.lang === "so" ? "Sawirka Deeq Afrika" : "Deeq Afrika in a blue suit in front of the Somali Football Federation backdrop",
      position: "center 12%",
      items: copy.about.journey.slice(2, 3),
    },
    {
      image: "/images/deeq-entrepreneurship.png",
      alt: copy.lang === "so" ? "Deeq Afrika oo ka qaybgalaya xaflad abaalmarin" : "Deeq Afrika taking part in an award presentation at a business event",
      position: "center 25%",
      items: copy.about.journey.slice(3),
    },
  ];

  return (
    <main id="main-content">
      <PageHero
        copy={copy}
        label={copy.about.label}
        title={copy.about.title}
        intro={copy.about.intro}
        image="/images/deeq-main.jpg"
        alt={`${copy.brand.name} portrait`}
        position="center 30%"
      />
      <section className="about-story section-light">
        <div className="container about-story-grid">
          <Reveal className="about-story-heading"><h2>{copy.about.storyTitle}</h2></Reveal>
          <Reveal className="about-story-copy" delay={100}>
            {copy.about.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </Reveal>
        </div>
      </section>
      <section className="about-journey section-paper">
        <div className="container">
          <Reveal className="section-heading"><h2>{copy.about.journeyTitle}</h2></Reveal>
          <div className="journey-grid">
            {journeyCards.map((card, index) => (
              <Reveal className="journey-item" key={card.image} delay={index * 70}>
                <div className="journey-photo">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    style={{ objectPosition: card.position }}
                  />
                </div>
                <div className="journey-copy">
                  {card.items.map((item) => (
                    <div className="journey-chapter" key={item.title}>
                      <span>{item.label}</span>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="leadership-section section-dark">
        <div className="container split-editorial split-editorial-dark">
          <Reveal className="editorial-image leadership-image">
            <Image src="/images/deeq-sff-jersey.jpg" alt={copy.lang === "so" ? "Deeq Afrika oo garoonka kubadda jooga" : "Deeq Afrika at a football ground"} fill sizes="(max-width: 800px) 100vw, 44vw" />
          </Reveal>
          <Reveal className="editorial-copy" delay={100}>
            <h2>{copy.about.leadershipTitle}</h2>
            <p>{copy.about.leadershipBody}</p>
            <blockquote>“{copy.about.quote}”</blockquote>
          </Reveal>
        </div>
      </section>
      <FinalCta copy={copy} />
    </main>
  );
}

export function NewsPage({ copy }: { copy: CampaignContent }) {
  return (
    <main id="main-content">
      <PageHero
        copy={copy}
        label={copy.news.label}
        title={copy.news.title}
        intro={copy.news.intro}
        image="/images/deeq-stadium.jpg"
        alt={copy.lang === "so" ? "Deeq Afrika oo ku sugan garoon kubadeed" : "Deeq Afrika at a football stadium"}
        position="center 25%"
      />
      <section className="news-section section-light">
        <div className="container news-grid">
          {copy.news.items.map((item, index) => (
            <Reveal className={`news-card ${index === 0 ? "news-card-featured" : ""}`} key={item.title} delay={index * 70}>
              <Link className="news-card-image" href={item.href} aria-label={item.title}>
                <Image src={item.image} alt="" fill sizes={index === 0 ? "(max-width: 800px) 100vw, 60vw" : "(max-width: 800px) 100vw, 30vw"} />
              </Link>
              <div className="news-card-copy">
                <span>{item.type}</span>
                <h2><Link href={item.href}>{item.title}</Link></h2>
                <p>{item.body}</p>
                <ArrowLink href={item.href}>{copy.common.learnMore}</ArrowLink>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="newsroom-section section-yellow">
        <Reveal className="container newsroom-inner">
          <CampaignIcon name="spark" size={32} />
          <div><h2>{copy.news.newsroomTitle}</h2><p>{copy.news.newsroomBody}</p></div>
          <a className="button button-navy" href="mailto:campaign@deeqafrika.so">campaign@deeqafrika.so</a>
        </Reveal>
      </section>
      <FinalCta copy={copy} />
    </main>
  );
}

export function MediaPage({ copy }: { copy: CampaignContent }) {
  return (
    <main id="main-content">
      <PageHero
        copy={copy}
        label={copy.media.label}
        title={copy.media.title}
        intro={copy.media.intro}
        image="/images/players-celebrate.jpg"
        alt={copy.lang === "so" ? "Ciyaartoy Soomaaliyeed oo wada dabbaaldegaya" : "Somalia football players celebrating together"}
      />
      <section className="media-gallery section-light">
        <div className="container">
          <Reveal className="section-heading"><h2>{copy.media.galleryTitle}</h2></Reveal>
          <div className="gallery-grid">
            {copy.media.gallery.map((item, index) => (
              <Reveal className={`gallery-item gallery-item-${index + 1}`} key={item.src} delay={(index % 3) * 70}>
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" style={{ objectPosition: item.position ?? "center" }} />
                <span>{item.caption}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="resources-section section-paper">
        <div className="container resources-grid">
          <Reveal className="resources-copy">
            <Eyebrow>{copy.media.label}</Eyebrow>
            <h2>{copy.media.resourcesTitle}</h2>
            <p>{copy.media.resourcesBody}</p>
          </Reveal>
          <div className="resource-list">
            {copy.media.resources.map((item) => (
              <Reveal className="resource-row" key={item.href}>
                <CampaignIcon name="download" size={24} />
                <div><h3>{item.title}</h3><p>{item.detail}</p></div>
                <a href={item.href} download>{copy.common.download}</a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCta copy={copy} />
    </main>
  );
}

export function JoinPage({ copy }: { copy: CampaignContent }) {
  return (
    <main id="main-content">
      <PageHero
        copy={copy}
        label={copy.join.label}
        title={copy.join.title}
        intro={copy.join.intro}
        image="/images/grassroots-laces.jpg"
        alt={copy.lang === "so" ? "Tababbare caawinaya ciyaaryahan yar" : "A coach helping a young footballer"}
        position="center 56%"
      />
      <section className="ways-section section-light">
        <div className="container">
          <Reveal className="section-heading"><h2>{copy.join.waysTitle}</h2></Reveal>
          <div className="ways-grid">
            {copy.join.ways.map((way, index) => (
              <Reveal className="way-item" key={way.title} delay={index * 70}>
                <CampaignIcon name={way.icon} size={28} />
                <h3>{way.title}</h3>
                <p>{way.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="contact-section section-paper">
        <div className="container contact-grid">
          <Reveal className="contact-heading">
            <Eyebrow>{copy.join.label}</Eyebrow>
            <h2>{copy.join.formTitle}</h2>
            <div className="direct-contact">
              <h3>{copy.join.contactTitle}</h3>
              <p>{copy.join.contactBody}</p>
            </div>
          </Reveal>
          <Reveal delay={100}><JoinForm copy={copy} /></Reveal>
        </div>
      </section>
      <FinalCta copy={copy} />
    </main>
  );
}

export function SectionPage({ copy, section }: { copy: CampaignContent; section: SectionSlug }) {
  switch (section) {
    case "vision": return <VisionPage copy={copy} />;
    case "plan": return <PlanPage copy={copy} />;
    case "about": return <AboutPage copy={copy} />;
    case "news": return <NewsPage copy={copy} />;
    case "media": return <MediaPage copy={copy} />;
    case "join": return <JoinPage copy={copy} />;
  }
}

import Link from "next/link";
import { routeFor, type CampaignContent, type NavKey } from "@/content";

const footerNav: NavKey[] = ["vision", "plan", "about", "news", "media", "join"];

export function SiteFooter({ copy }: { copy: CampaignContent }) {
  return (
    <footer className="site-footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <div className="brand-mark brand-mark-footer">
            <span className="brand-star" aria-hidden="true">★</span>
            <span className="brand-copy">
              <strong>{copy.brand.shortName}</strong>
              <small>{copy.brand.vision}</small>
            </span>
          </div>
          <p>{copy.footer.statement}</p>
          <div className="footer-slogan">
            <span>{copy.brand.sloganOpen}</span>
            <span>{copy.brand.sloganEqual}</span>
          </div>
        </div>

        <div className="footer-column">
          <h2>{copy.footer.navigation}</h2>
          {footerNav.map((key) => (
            <Link key={key} href={routeFor(copy.lang, key)}>{copy.nav[key]}</Link>
          ))}
        </div>

        <div className="footer-column">
          <h2>{copy.footer.contact}</h2>
          <a href="mailto:campaign@deeqafrika.so">campaign@deeqafrika.so</a>
          <span>{copy.lang === "so" ? "Muqdisho, Soomaaliya" : "Mogadishu, Somalia"}</span>
        </div>

        <div className="footer-column">
          <h2>{copy.footer.follow}</h2>
          <a href="https://x.com/DeeqAfrika" target="_blank" rel="noreferrer">X · @DeeqAfrika</a>
          <a href="https://instagram.com/deeqafrik" target="_blank" rel="noreferrer">Instagram · @deeqafrik</a>
          <span>Facebook · Deeq Mohamed Afrika</span>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>{copy.footer.copyright}</span>
        <span>{copy.brand.role} · 2027</span>
      </div>
    </footer>
  );
}

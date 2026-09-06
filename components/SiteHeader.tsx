"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { routeFor, switchLanguagePath, type CampaignContent, type NavKey } from "@/content";

const navKeys: NavKey[] = ["home", "vision", "plan", "about", "news", "media", "join"];

export function SiteHeader({
  copy,
}: {
  copy: CampaignContent;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentKey = (pathname.split("/").filter(Boolean)[1] ?? "home") as NavKey;
  const otherLang = copy.lang === "en" ? "so" : "en";

  useEffect(() => {
    document.documentElement.lang = copy.lang;
  }, [copy.lang]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.toggle("menu-is-open", open);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-is-open");
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {copy.common.skip}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand-mark" href={`/${copy.lang}`} aria-label={`${copy.brand.name} — ${copy.nav.home}`} onClick={() => setOpen(false)}>
            <span className="brand-star" aria-hidden="true">★</span>
            <span className="brand-copy">
              <strong>{copy.brand.shortName}</strong>
              <small>{copy.brand.vision}</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navKeys.map((key) => (
              <Link
                key={key}
                className={currentKey === key ? "is-active" : ""}
                href={routeFor(copy.lang, key)}
                aria-current={currentKey === key ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {copy.nav[key]}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link
              className="language-switch"
              href={switchLanguagePath(pathname, otherLang)}
              hrefLang={otherLang}
              aria-label={`Switch to ${otherLang === "so" ? "Somali" : "English"}`}
              onClick={() => setOpen(false)}
            >
              <span className={copy.lang === "so" ? "active" : ""}>SO</span>
              <i aria-hidden="true" />
              <span className={copy.lang === "en" ? "active" : ""}>EN</span>
            </Link>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? copy.common.menuClose : copy.common.menuOpen}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div id="mobile-navigation" className={`mobile-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
          <nav aria-label="Mobile navigation">
            {navKeys.map((key, index) => (
              <Link
                key={key}
                tabIndex={open ? 0 : -1}
                href={routeFor(copy.lang, key)}
                aria-current={currentKey === key ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {copy.nav[key]}
              </Link>
            ))}
          </nav>
          <div className="mobile-panel-message">
            <strong>{copy.brand.sloganOpen}</strong>
            <strong>{copy.brand.sloganEqual}</strong>
          </div>
        </div>
      </header>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import styles from "./links.module.css";

type LinkId = "first_access" | "procedures" | "gallery";
type LinkItem = {
  id: LinkId;
  title: string;
  href: string;
  internalPath: string;
};

const links: readonly LinkItem[] = [
  { id: "first_access", title: "Request First Access", href: "https://opusplasticsurgery.ai/first-access", internalPath: "/first-access" },
  { id: "procedures", title: "Procedures", href: "https://opusplasticsurgery.ai/procedures", internalPath: "/procedures" },
  { id: "gallery", title: "Before & After", href: "https://opusplasticsurgery.ai/gallery", internalPath: "/gallery" },
];

type DataLayerWindow = Window & { dataLayer?: Array<Record<string, unknown>> };

function recordLinkClick(link: LinkItem, sameSite: boolean) {
  // A navigation event only; never count as first_access_submit.
  (window as DataLayerWindow).dataLayer?.push({
    event: "opus_linkhub_click",
    link_id: link.id,
    link_url: sameSite ? link.internalPath : link.href,
    link_hub: "dr_frew",
  });
}

export default function LinkCards() {
  const [sameSite, setSameSite] = useState(false);

  useEffect(() => {
    const hostname = window.location.hostname;
    setSameSite(hostname === "opusplasticsurgery.ai" || hostname === "www.opusplasticsurgery.ai");
  }, []);

  return (
    <main className={styles.shell}>
      <a className={styles.skipLink} href="#official-links">Skip to links</a>

      <section className={styles.hero} aria-labelledby="surgeon-name">
        <div className={styles.topline}>
          <a className={styles.wordmarkLink} href="https://opusplasticsurgery.ai/" aria-label="OPUS Plastic Surgery home">
            <span className={styles.wordmark}>OPUS</span>
            <span className={styles.wordmarkSub}>PLASTIC SURGERY</span>
          </a>
          <span className={styles.region}>UPLAND / CALIFORNIA</span>
        </div>

        <div className={styles.identity}>
          <h1 id="surgeon-name" className={styles.name}>Dr. Frew</h1>
          <div className={styles.identityRule} aria-hidden="true" />
          <p className={styles.credential}>ABPS Board-Certified Plastic Surgeon</p>
          <p className={styles.specialty}>Breast &amp; body surgery</p>
        </div>
      </section>

      <section id="official-links" className={styles.destinations} aria-label="Official OPUS links">
        <nav className={styles.linkList} aria-label="Explore OPUS">
          {links.map((link) => (
            <a
              key={link.id}
              className={styles.link}
              href={sameSite ? link.internalPath : link.href}
              onClick={() => recordLinkClick(link, sameSite)}
            >
              <span className={styles.linkLabel}>{link.title}</span>
              <svg className={styles.arrow} viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false">
                <path d="M4.75 15.25 15 5m-8.25 0H15v8.25" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </a>
          ))}
        </nav>
        <div className={styles.linkFooter}>
          <span>OPUS / DR. FREW</span>
          <a href="https://www.instagram.com/opusresults/" aria-label="OPUS results on Instagram">
            @opusresults <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p className={styles.disclaimer}>Consultations are by request. Individual results vary.</p>
      </section>
    </main>
  );
}

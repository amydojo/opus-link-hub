"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
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
  (window as DataLayerWindow).dataLayer?.push({
    event: "opus_linkhub_click",
    link_id: link.id,
    link_url: sameSite ? link.internalPath : link.href,
    link_hub: "dr_frew",
  });
}

/** A quiet, engraved form rather than a decorative UI animation. */
function FormStudy() {
  return (
    <svg className={styles.formStudy} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth=".9">
        <ellipse cx="202" cy="198" rx="141" ry="119" opacity=".24" />
        <ellipse cx="202" cy="198" rx="133" ry="125" opacity=".32" />
        <ellipse cx="202" cy="198" rx="125" ry="132" opacity=".37" />
        <ellipse cx="202" cy="198" rx="117" ry="138" opacity=".40" />
        <ellipse cx="202" cy="198" rx="109" ry="143" opacity=".49" />
        <ellipse cx="202" cy="198" rx="101" ry="147" opacity=".48" />
        <ellipse cx="202" cy="198" rx="93" ry="150" opacity=".46" />
        <ellipse cx="202" cy="198" rx="84" ry="153" opacity=".35" />
        <ellipse cx="202" cy="198" rx="75" ry="156" opacity=".29" />
        <ellipse cx="202" cy="198" rx="64" ry="158" opacity=".20" />
      </g>
      <ellipse
        cx="202" cy="198" rx="141" ry="119" fill="none"
        stroke="#fff8ea" strokeWidth="1.6" opacity=".42"
        transform="translate(-3,-2)"
      />
    </svg>
  );
}

export default function LinkCards() {
  const shellRef = useRef<HTMLElement>(null);
  const [sameSite, setSameSite] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    setSameSite(hostname === "opusplasticsurgery.ai" || hostname === "www.opusplasticsurgery.ai");
  }, []);

  function moveForm(event: ReactPointerEvent<HTMLElement>) {
    // Passive response only. Do not capture touch gestures or interfere with scrolling.
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    shellRef.current?.style.setProperty("--px", `${(x * 15).toFixed(1)}px`);
    shellRef.current?.style.setProperty("--py", `${(y * 12).toFixed(1)}px`);
  }

  function resetForm() {
    shellRef.current?.style.setProperty("--px", "0px");
    shellRef.current?.style.setProperty("--py", "0px");
  }

  return (
    <main className={styles.shell} ref={shellRef} data-active={active ?? "none"}>
      <a className={styles.skipLink} href="#official-links">Skip to links</a>
      <section
        className={styles.hero}
        aria-labelledby="surgeon-name"
        onPointerMove={moveForm}
        onPointerLeave={resetForm}
      >
        <div className={styles.topline}>
          <a className={styles.wordmarkLink} href="https://opusplasticsurgery.ai/" aria-label="OPUS Plastic Surgery home">
            <span className={styles.wordmark}>OPUS</span>
            <span className={styles.wordmarkSub}>PLASTIC SURGERY</span>
          </a>
          <span className={styles.region}>UPLAND / CALIFORNIA</span>
        </div>
        <FormStudy />
        <div className={styles.identity}>
          <span className={styles.kicker}>THE SURGEON</span>
          <h1 id="surgeon-name" className={styles.name}>Dr. Frew</h1>
          <p className={styles.credential}>ABPS Board-Certified Plastic Surgeon</p>
          <p className={styles.specialty}>Breast &amp; body surgery</p>
        </div>
      </section>

      <section id="official-links" className={styles.destinations} aria-label="Official OPUS links">
        <div className={styles.indexHeading} aria-hidden="true">
          <span>THE PRACTICE</span>
          <span>01 — 03</span>
        </div>
        <nav className={styles.linkList} aria-label="Explore OPUS">
          {links.map((link, index) => (
            <a
              key={link.id}
              className={styles.link}
              href={sameSite ? link.internalPath : link.href}
              onPointerEnter={() => setActive(index)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
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

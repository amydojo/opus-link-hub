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

const frewLetters = ["F", "r", "e", "w"] as const;

/**
 * The name is the interactive artwork. No second symbol or decorative object.
 * Movement is local to the letter under the pointer; it never shifts the links,
 * captures scroll, or gates navigation.
 */
function KineticName() {
  const wordRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<Array<HTMLSpanElement | null>>([]);

  function resetLetters() {
    for (const letter of lettersRef.current) {
      letter?.style.removeProperty("--lift");
      letter?.style.removeProperty("--turn");
      letter?.style.removeProperty("--tone");
    }
  }

  function moveLetters(event: ReactPointerEvent<HTMLHeadingElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (event.pointerType === "touch" && event.buttons === 0) return;
    const word = wordRef.current;
    if (!word) return;

    const rect = word.getBoundingClientRect();
    if (!rect.width) return;
    const x = (event.clientX - rect.left) / rect.width;

    lettersRef.current.forEach((letter, i) => {
      if (!letter) return;
      const center = (i + .5) / frewLetters.length;
      const strength = Math.max(0, 1 - Math.abs(x - center) * 2.25);
      letter.style.setProperty("--lift", `${(-12 * strength).toFixed(1)}px`);
      letter.style.setProperty("--turn", `${((i < 2 ? -1 : 1) * 2.1 * strength).toFixed(2)}deg`);
      letter.style.setProperty("--tone", strength.toFixed(2));
    });
  }

  function impressLetters() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lettersRef.current.forEach((letter, i) => {
      if (!letter) return;
      letter.animate(
        [
          { transform: "translateY(0px) rotate(0deg)", offset: 0 },
          { transform: `translateY(${i % 2 === 0 ? -11 : -7}px) rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`, offset: .28 },
          { transform: "translateY(1px) rotate(0deg)", offset: .66 },
          { transform: "translateY(0px) rotate(0deg)", offset: 1 },
        ],
        { duration: 650, delay: i * 35, easing: "cubic-bezier(.22,1,.36,1)" }
      );
    });
  }

  return (
    <h1
      id="surgeon-name"
      className={styles.name}
      aria-label="Dr. Frew"
      onPointerMove={moveLetters}
      onPointerLeave={resetLetters}
      onPointerCancel={resetLetters}
      onPointerUp={resetLetters}
      onClick={impressLetters}
    >
      <span className={styles.nameDoctor} aria-hidden="true">Dr.</span>
      <span ref={wordRef} className={styles.nameSurname} aria-hidden="true">
        {frewLetters.map((character, index) => (
          <span
            key={index}
            className={styles.letter}
            ref={(element) => { lettersRef.current[index] = element; }}
          >
            {character}
          </span>
        ))}
      </span>
    </h1>
  );
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
          <KineticName />
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

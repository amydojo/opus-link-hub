import type { Metadata } from "next";
import LinkCards from "./LinkCards";
import styles from "./links.module.css";

export const metadata: Metadata = {
  title: "Dr. Tyler Frew | OPUS Plastic Surgery — Official Links",
  description:
    "Meet Dr. Tyler Frew of OPUS Plastic Surgery in Upland, California. Request First Access, explore procedures, and view patient results.",
  robots: { index: false, follow: true },
};

export default function LinksPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#official-links">
        Skip to links
      </a>
      <main className={styles.container}>
        <header className={styles.header}>
          <a
            className={styles.brand}
            href="https://opusplasticsurgery.ai/"
            aria-label="OPUS Plastic Surgery — official website"
          >
            {/* Cormorant Garamond typographic lockup. Replace with approved vector logo if available. */}
            <span className={styles.brandName}>OPUS</span>
            <span className={styles.brandDescriptor}>PLASTIC SURGERY</span>
          </a>
          <span className={styles.headerDetail}>UPLAND, CALIFORNIA</span>
        </header>

        <section className={styles.intro} aria-labelledby="surgeon-name">
          <div className={styles.sectionIndex}>
            <span>THE SURGEON</span>
            <span>OPUS / UPLAND</span>
          </div>
          <h1 id="surgeon-name" className={styles.title}>Dr. Frew</h1>
          <p className={styles.credential}>ABPS Board-Certified Plastic Surgeon</p>
          <p className={styles.specialty}>Breast &amp; body surgery</p>
        </section>

        <section className={styles.linksSection} id="official-links" aria-label="Official OPUS links">
          <div className={styles.linksHeading}>
            <span>EXPLORE OPUS</span>
            <span>01 — 03</span>
          </div>
          <LinkCards />
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerTop}>
            <span className={styles.footerMark}>OPUS / PATIENT EXPERIENCE</span>
            <a
              className={styles.socialLink}
              href="https://www.instagram.com/opusresults/"
              aria-label="OPUS Results Instagram account"
            >
              @opusresults <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p>
            First Access offers an opportunity to request consultation availability; appointments are not guaranteed.
            Before-and-after results vary between patients.
          </p>
        </footer>
      </main>
    </div>
  );
}

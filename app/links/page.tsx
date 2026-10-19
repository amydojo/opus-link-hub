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
          <span className={styles.headerDetail}>OFFICIAL LINKS</span>
        </header>

        <section className={styles.intro} aria-labelledby="surgeon-name">
          <h1 id="surgeon-name" className={styles.title}>Dr. Frew</h1>
          <p className={styles.credential}>ABPS Board-Certified Plastic Surgeon</p>
          <p className={styles.specialty}>Upland, California</p>
        </section>

        <section className={styles.linksSection} id="official-links" aria-label="Official OPUS links">
          <LinkCards />
        </section>

        <footer className={styles.footer}>
          <a
            className={styles.socialLink}
            href="https://www.instagram.com/opusresults/"
            aria-label="Visit OPUS Results on Instagram"
          >
            @opusresults <span aria-hidden="true">↗</span>
          </a>
          <p>Consultations are by request. Individual results vary.</p>
        </footer>
      </main>
    </div>
  );
}

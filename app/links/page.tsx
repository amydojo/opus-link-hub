import type { Metadata } from "next";
import LinkCards from "./LinkCards";
import styles from "./links.module.css";

export const metadata: Metadata = {
  title: "Dr. Tyler Frew | Official Links | OPUS Plastic Surgery",
  description: "Official links for Dr. Tyler Frew at OPUS Plastic Surgery in Upland, California. Get First Access, see patient results, and explore the practice.",
  robots: { index: false, follow: true },
};

export default function LinksPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#official-links">Skip to official links</a>
      <main className={styles.container}>
        <header className={styles.header}>
          {/* Replace with official OPUS wordmark when integrated into the practice site. */}
          <a className={styles.brand} href="https://opusplasticsurgery.ai/" aria-label="OPUS Plastic Surgery home">
            <span className={styles.brandName}>OPUS</span>
            <span className={styles.brandDescriptor}>PLASTIC SURGERY</span>
          </a>
          <span className={styles.headerDetail}>UPLAND, CA</span>
        </header>
        <section className={styles.intro} aria-labelledby="surgeon-name">
          <p className={styles.eyebrow}>THE SURGEON / THE PRACTICE</p>
          <h1 id="surgeon-name" className={styles.title}>Dr. Tyler<br />Frew, MD<span className={styles.period}>.</span></h1>
          <p className={styles.credential}>ABPS Board-Certified Plastic Surgeon</p>
          <p className={styles.specialty}>Breast aesthetics &amp; body contouring</p>
        </section>
        <section className={styles.linksSection} id="official-links" aria-label="Official OPUS links">
          <div className={styles.linksHeading} aria-hidden="true"><span>EXPLORE OPUS</span><span>01 — 03</span></div>
          <LinkCards />
        </section>
        <footer className={styles.footer}>
          <span className={styles.footerMark}>OPUS / UPLAND, CALIFORNIA</span>
          <p>First Access provides an opportunity to request consultation availability; appointments are not guaranteed. Individual patient results vary.</p>
        </footer>
      </main>
    </div>
  );
}

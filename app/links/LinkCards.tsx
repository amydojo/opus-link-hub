"use client";

import { useEffect, useState } from "react";
import styles from "./links.module.css";

type LinkId = "first_access" | "procedures" | "gallery";
type LinkItem = {
  id: LinkId;
   title: string;
   href: string;
  internalPath: string;
  primary?: boolean;
};

const links: readonly LinkItem[] = [
  {
    id: "first_access",
    title: "Request First Access",
    href: "https://opusplasticsurgery.ai/first-access",
    internalPath: "/first-access",
    primary: true,
  },
  {
    id: "procedures",
    title: "Procedures",
    href: "https://opusplasticsurgery.ai/procedures",
    internalPath: "/procedures",
  },
  {
    id: "gallery",
    title: "Before & After",
    href: "https://opusplasticsurgery.ai/gallery",
    internalPath: "/gallery",
  },
];

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

function destination(link: LinkItem, onOfficialDomain: boolean) {
  return onOfficialDomain ? link.internalPath : link.href;
}

function recordLinkClick(link: LinkItem, onOfficialDomain: boolean) {
  // Navigation-only event. Never equate this to first_access_submit or a conversion.
  (window as DataLayerWindow).dataLayer?.push({
    event: "opus_linkhub_click",
    link_id: link.id,
    link_url: destination(link, onOfficialDomain),
    link_hub: "dr_frew",
  });
}

function ArrowIcon() {
  return (
    <svg
      className={styles.arrow}
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.75 15.25 15 5m-8.25 0H15v8.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export default function LinkCards() {
  const [onOfficialDomain, setOnOfficialDomain] = useState(false);

  useEffect(() => {
    setOnOfficialDomain(window.location.hostname === "opusplasticsurgery.ai");
  }, []);

  return (
    <nav className={styles.linkList} aria-label="OPUS destinations">
      {links.map((link) => (
        <a
          key={link.id}
          className={[styles.linkCard, link.primary ? styles.primary : styles.secondary].join(" ")}
          href={destination(link, onOfficialDomain)}
          onClick={() => recordLinkClick(link, onOfficialDomain)}
        >
          <span className={styles.linkTitle}>{link.title}</span>
          <ArrowIcon />
        </a>
      ))}
    </nav>
  );
}

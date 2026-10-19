"use client";
import { useEffect, useState } from "react";
import styles from "./links.module.css";

type LinkItem = { id: "first_access" | "results" | "website"; title: string; description: string; href: string; primary?: boolean };

const links: readonly LinkItem[] = [
  { id:"first_access", title:"Get First Access", description:"Priority consultation requests", href:"https://opusplasticsurgery.ai/first-access", primary:true },
  { id:"results", title:"Patient Results", description:"Before & after gallery", href:"https://www.instagram.com/opusresults/" },
  { id:"website", title:"Explore OPUS", description:"Procedures & the practice", href:"https://opusplasticsurgery.ai/" },
];

type DataLayerWindow = Window & { dataLayer?: Array<Record<string,unknown>> };

function destination(link: LinkItem, onOfficialDomain: boolean) {
  if (link.id !== "first_access") return link.href;
  if (onOfficialDomain) return "/first-access"; // Never overwrite original campaign attribution on an internal navigation.
  return link.href + "?utm_source=instagram&utm_medium=organic_social&utm_campaign=opus_profile_hub&utm_content=dr_frew_first_access";
}

function recordLinkClick(link: LinkItem, onOfficialDomain: boolean) {
  // An optional GTM event, not a lead conversion. Does nothing when GTM is absent.
  (window as DataLayerWindow).dataLayer?.push({
    event:"opus_linkhub_click", link_id:link.id, link_url:destination(link,onOfficialDomain), link_hub:"dr_frew"
  });
}

function ArrowIcon() {
  return <svg className={styles.arrow} aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.25 15.75 15.5 4.5m-8.5 0h8.5V13" stroke="currentColor" strokeWidth="1.45" strokeLinecap="square" strokeLinejoin="miter"/></svg>;
}

export default function LinkCards() {
  const [onOfficialDomain, setOnOfficialDomain] = useState(false);
  useEffect(() => { setOnOfficialDomain(window.location.hostname === "opusplasticsurgery.ai"); }, []);
  return <nav className={styles.linkList} aria-label="Explore OPUS">
    {links.map(link => <a key={link.id}
      className={[styles.linkCard, link.primary ? styles.primary : styles.secondary].join(" ")}
      href={destination(link,onOfficialDomain)}
      onClick={() => recordLinkClick(link,onOfficialDomain)}
    >
      <span className={styles.linkCopy}><span className={styles.linkTitle}>{link.title}</span><span className={styles.linkDescription}>{link.description}</span></span>
      <ArrowIcon />
    </a>)}
  </nav>;
}

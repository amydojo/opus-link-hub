import type { Metadata } from "next";
import LinkCards from "./LinkCards";

export const metadata: Metadata = {
  title: "Dr. Tyler Frew | OPUS Plastic Surgery — Official Links",
  description:
    "Official links for Dr. Tyler Frew of OPUS Plastic Surgery in Upland, California. Request First Access, explore procedures, and view patient results.",
  robots: { index: false, follow: true },
};

export default function LinksPage() {
  return <LinkCards />;
}

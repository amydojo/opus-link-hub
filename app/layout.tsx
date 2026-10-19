import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Tyler Frew | OPUS Plastic Surgery",
  description: "Official links for Dr. Tyler Frew, OPUS Plastic Surgery, Upland, California.",
  robots: { index: false, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

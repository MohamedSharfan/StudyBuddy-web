import type { Metadata, Viewport } from "next";
import { Amiri, Noto_Sans_Tamil, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-tamil", weight: ["400", "600", "700"], display: "swap" });
// Arabic is only used inside lesson notes, so it is not preloaded on every page.
const amiri = Amiri({ subsets: ["arabic"], variable: "--font-amiri", weight: ["400", "700"], display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "O/L Islam Past Papers, Notes & Quizzes | StudyBuddy", template: "%s · StudyBuddy" },
  description:
    "Free Sri Lankan O/L Islam past papers, notes, flashcards and quizzes for Grade 10 and 11 in Tamil and English medium. Practise chapter by chapter with StudyBuddy.",
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "StudyBuddy",
    title: "O/L Islam Past Papers, Notes & Quizzes | StudyBuddy",
    description: "Free Sri Lankan O/L Islam study resources for Grade 10 and 11 in Tamil and English medium.",
    url: SITE_URL,
    locale: "en_LK",
    images: ["/logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "O/L Islam Past Papers, Notes & Quizzes | StudyBuddy",
    description: "Free Sri Lankan O/L Islam study resources for Grade 10 and 11 in Tamil and English medium.",
    images: ["/logo.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#120a26",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${tamil.variable} ${amiri.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}

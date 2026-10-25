import type { Metadata, Viewport } from "next";
import { Amiri, Noto_Sans_Tamil, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-tamil", weight: ["400", "600", "700"], display: "swap" });
// Arabic is only used inside lesson notes, so it is not preloaded on every page.
const amiri = Amiri({ subsets: ["arabic"], variable: "--font-amiri", weight: ["400", "700"], display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "StudyBuddy — Play · Learn · Level up", template: "%s · StudyBuddy" },
  description:
    "StudyBuddy helps Sri Lankan O/L and A/L students study chapter by chapter with notes, flashcards, quizzes and 10 years of past papers.",
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
  openGraph: { title: "StudyBuddy", description: "Play · Learn · Level up", images: ["/logo.jpg"] },
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

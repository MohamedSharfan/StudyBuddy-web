import type { Metadata, Viewport } from "next";
import { Amiri, Fredoka, Noto_Sans_Tamil, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka", weight: ["500", "600", "700"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-tamil", weight: ["400", "500", "700", "800"] });
const amiri = Amiri({ subsets: ["arabic"], variable: "--font-amiri", weight: ["400", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "StudyBuddy — Play · Learn · Level up", template: "%s · StudyBuddy" },
  description:
    "StudyBuddy helps Sri Lankan O/L students master Islam (Tamil medium) with notes, flashcards, quizzes and 10 years of past papers — chapter by chapter.",
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
  openGraph: { title: "StudyBuddy", description: "Play · Learn · Level up", images: ["/logo.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#0d0221",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${jakarta.variable} ${tamil.variable} ${amiri.variable}`}>
      <body>
        <div className="sky" aria-hidden />
        {children}
      </body>
    </html>
  );
}

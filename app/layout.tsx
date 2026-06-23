import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ParticleField from "@/components/ParticleField";
import CursorSpotlight from "@/components/CursorSpotlight";
import CursorRings from "@/components/CursorRings";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yash Gupta — Data Engineer",
  description:
    "Data Engineer building cost-efficient, reliable data platforms and real-time systems. Migrations, lakehouses, ClickHouse, Spark, Airflow, AWS.",
  authors: [{ name: "Yash Gupta" }],
  openGraph: {
    title: "Yash Gupta — Data Engineer",
    description:
      "Building cost-efficient, reliable data platforms and real-time systems.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f6fb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* No-FOUC: apply stored theme before first paint. Dark is the default. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var _t=localStorage.getItem('theme');if(_t==='dark'){document.documentElement.classList.remove('light')}else{document.documentElement.classList.add('light')}}catch(e){document.documentElement.classList.add('light')}`,
          }}
        />
        <div className="bg-grid" aria-hidden />
        <div className="bg-mesh" aria-hidden>
          <span className="blob blob-1" />
          <span className="blob blob-2" />
          <span className="blob blob-3" />
        </div>
        <div className="bg-noise" aria-hidden />
        <ParticleField />
        <CursorSpotlight />
        <CursorRings />
        {children}
      </body>
    </html>
  );
}

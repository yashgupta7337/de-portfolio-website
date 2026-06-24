import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ResumeViewer from "@/components/ResumeViewer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
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
  themeColor: "#07070a",
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
            __html: `try{if(localStorage.getItem('theme')==='light'){document.documentElement.classList.add('light')}}catch(e){}try{history.scrollRestoration='manual';var t=function(){try{scrollTo(0,0)}catch(e){}};addEventListener('beforeunload',t);addEventListener('pagehide',t)}catch(e){}`,
          }}
        />
        <div className="bg-grid" aria-hidden />
        <div className="bg-mesh" aria-hidden>
          <span className="blob blob-1" />
          <span className="blob blob-2" />
          <span className="blob blob-3" />
        </div>
        <div className="bg-noise" aria-hidden />
        {children}
        <ResumeViewer />
      </body>
    </html>
  );
}

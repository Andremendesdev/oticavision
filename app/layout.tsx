import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { DEFAULT_SITE_NAME, siteName } from "@/lib/site/env";

const displayName = siteName || DEFAULT_SITE_NAME;

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Ótica Vision",

  description:
    "Ótica Vision. Armações modernas, lentes de qualidade e atendimento direto pelo WhatsApp. Enxergue melhor, com mais facilidade.",

  keywords: [
    "otica",
    "oculos de grau",
    "oculos de sol",
    "lentes de contato",
    "exame de vista",
    "oculos",
  ],

  authors: [{ name: "Ótica Vision" }],

  openGraph: {
    title: "Ótica Vision",
    description: "Armações modernas, lentes de qualidade e atendimento rápido.",
    type: "website",
    locale: "pt_BR",
  },

  // remove qualquer favicon padrão
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background font-sans antialiased">
        {children}

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}

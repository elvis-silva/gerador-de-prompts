import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ai2you.com.br"),
  title: {
    default: "Gerador de Prompts para IA | AI2You",
    template: "%s | AI2You",
  },
  description:
    "Crie prompts prontos para IA em segundos. Gere comandos profissionais para ChatGPT, marketing, vendas, programação e muito mais.",
  keywords: [
    "gerador de prompts para ia",
    "gerador de prompts chatgpt",
    "prompts prontos para ia",
    "criar prompts para ia",
    "prompt engineering",
  ],
  openGraph: {
    type: "website",
    url: "https://www.ai2you.com.br",
    title: "Gerador de Prompts para IA | AI2You",
    description:
      "Crie prompts profissionais para IA em segundos e obtenha respostas melhores do ChatGPT e outras IAs.",
    siteName: "AI2You",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerador de Prompts para IA | AI2You",
    description:
      "Crie prompts profissionais para IA em segundos e obtenha respostas melhores.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-8TMK294LL0" />
    </html>
  );
}

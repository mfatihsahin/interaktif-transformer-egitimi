import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Transformer Architecture Explained",
  description: "An interactive explanation of the Transformer architecture - step by step from fundamentals to advanced concepts",
  keywords: "transformer, machine learning, deep learning, nlp, attention mechanism, neural networks",
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://mfatihsahin.github.io/interaktif-transformer-egitimi'
      : 'http://localhost:3000'
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

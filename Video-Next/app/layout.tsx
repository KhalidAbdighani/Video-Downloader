import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "YouTube Video Downloader | Fast & Free in 1080p",
  
  description: "Download YouTube videos and audio in high quality free and without limits.",
  keywords: [
    "YouTube Downloader",
    "Download YouTube Videos",
    "Save YouTube 1080p",
    "YouTube to MP4",
    "YouTube to MP3",
    "Free Video Downloader",
    "Fast Media Converter"
  ],
  authors: [{ name: "khalidabdighani" }],
  creator: "khalidabdighani",
  publisher: "khalidabdighani",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(
  process.env.NODE_ENV === "production"
    ? "https://video-downloader-phi-woad.vercel.app"
    : "http://localhost:3000"
),
  openGraph: {
    title: "Free YouTube Video Downloader - High Quality 1080p",
    description: "Paste the video link and download high-quality with zero limits.",
    url: "https://video-downloader-phi-woad.vercel.app",
    siteName: "Video Downloader",
    
    locale: "en_US",
    type: "website",
  },
  
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

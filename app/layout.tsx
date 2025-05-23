
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { abeeZee, bagelFatOne } from './font/font';
import { ThemeProvider } from "@/Components/landing/theme-provider";
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
  title: "AI-Chat",
  description: "interface for AI using gemini",
  openGraph: {
    images: [
      {
        url: "/debate.jpg",
        alt: "AI Debate Image",
      },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} ${abeeZee.variable} ${bagelFatOne.variable} antialiased`}
      >
        <ThemeProvider>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
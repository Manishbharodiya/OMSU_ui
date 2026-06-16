import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OMSU | Solar Lead & Survey System",
  description: "Enterprise Solar Lead Management and Consumer Survey Platform for Field Executives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full overflow-hidden bg-background text-foreground`}
      >
        <div className="flex h-screen w-screen overflow-hidden bg-background">
          {/* Sidebar - Desktop Only */}
          <Sidebar className="hidden md:flex shrink-0" />

          {/* Main Area */}
          <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PIO DURAN EMS NCII | EMS Reviewer",
  description: "Comprehensive study and review platform for Emergency Medical Service NCII TESDA standards in the Philippines. Features learning roadmap, study materials, interactive diagrams, practice assessments, and more.",
  keywords: ["EMS", "NCII", "TESDA", "Philippines", "Pio Duran", "First Aid", "CPR", "Emergency Medical Service", "BLS", "Assessment"],
  icons: {
    icon: "/pio-duran-ems-logo.png",
    apple: "/icons/icon-192x192.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EMS NCII",
  },
  openGraph: {
    type: "website",
    title: "PIO DURAN EMS NCII | EMS Reviewer",
    description: "Train anytime, anywhere — even offline. Comprehensive EMS NCII TESDA study platform.",
    siteName: "PIO DURAN EMS NCII",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2EC4B6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="EMS NCII" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

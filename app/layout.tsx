import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JERIN REX G — Full Stack Developer | MERN Stack | MCA Graduate",
  description:
    "Full Stack Developer (MERN Stack) with internship experience at Queenbug Technologies. Specialized in building web and mobile applications. Fresher seeking IT opportunities from Tamil Nadu, India.",
  keywords: [
    "Full Stack Developer",
    "MERN Stack",
    "React.js",
    "Node.js",
    "MongoDB",
    "Flutter",
    "Cybersecurity",
    "Java",
    "REST API",
    "MCA",
    "Tamil Nadu",
    "India",
  ],
  authors: [{ name: "JERIN REX G" }],
  creator: "JERIN REX G",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "JERIN REX G — Full Stack Developer | MERN Stack",
    description:
      "Building full stack web & mobile applications using MERN Stack, Flutter & Java. Based in Tamil Nadu, India 🇮🇳",
    siteName: "JERIN REX G Portfolio",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "JERIN REX G — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JERIN REX G — Full Stack Developer | MERN Stack",
    description:
      "Building full stack web & mobile applications using MERN Stack, Flutter & Java.",
    images: ["/images/profile.jpg"],
  },
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="JERIN REX G" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
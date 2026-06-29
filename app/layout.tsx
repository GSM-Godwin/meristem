import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Outfit } from "next/font/google";
import "./globals.css";
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const description =
  "Meristem Family Office partners with high-net-worth families to preserve, grow, and transfer their wealth — and the values, relationships, and legacy that matter most — across generations.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.meristemfamilyoffice.com"),

  title: {
    default: "Meristem Family Office",
    template: "%s | Meristem Family Office",
  },

  description,

  openGraph: {
    type: "website",
    siteName: "Meristem Family Office",
    title: "Meristem Family Office",
    description,
    url: "https://www.meristemfamilyoffice.com",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Meristem Family Office",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Meristem Family Office",
    description,
    images: ["/logo.png"],
  },

  icons: {
    icon: "/logo.svg",
    apple: "/logo.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-outfit)]">
        {children}
      </body>
      {gaMeasurementId ? <GoogleAnalytics gaId={gaMeasurementId} /> : null}
    </html>
  );
}

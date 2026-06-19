import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
// metadataBase: replace the placeholder URL with the real production domain.
// og-image.png: place a 1200×630 PNG at public/og-image.png.
// apple-touch-icon.png: place a 180×180 PNG at public/apple-touch-icon.png.

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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-outfit)]">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import dynamic from "next/dynamic";
import "./globals.css";

// Dynamically import client components
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

const siteUrl = "https://animeweapons.org";
const siteName = "Anime Weapons";
const ogImage = `${siteUrl}/android-chrome-512x512.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Anime Weapons - Codes, Guides & Tips | Roblox Weapon Grinder",
  description: "Get the latest Anime Weapons codes, drop locations, and boss guides. Farm weapons, accessories, and avatars faster with up-to-date Roblox codes and tips.",
  keywords: ["Anime Weapons", "Roblox", "codes", "Anime Weapons codes", "anime", "guides", "boss drops"],
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "Anime Weapons - Codes, Guides & Tips | Roblox Weapon Grinder",
    description: "Find active Anime Weapons codes, drop guides, and farming tips for this fast-growing Roblox hit.",
    images: [
      {
        url: ogImage,
        width: 512,
        height: 512,
        alt: "Anime Weapons logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@animeweapons",
    title: "Anime Weapons - Codes, Guides & Tips",
    description: "Active Anime Weapons codes and guides for Roblox players.",
    images: [ogImage],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: metadata.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const gameStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Anime Weapons",
    url: "https://www.roblox.com/games/79189799490564/Anime-Weapons",
    description: "Anime Weapons is a Roblox grinder where you clear anime-themed worlds, farm enemies for weapons and accessories, and fight secret bosses for rare drops.",
    genre: ["Action", "Farming", "Anime"],
    gamePlatform: "Roblox",
    author: {
      "@type": "Organization",
      name: "AlphaXnewera"
    },
    publisher: {
      "@type": "Organization",
      name: "Roblox"
    },
    applicationCategory: "Game",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gameStructuredData) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1LGY9BYR0X"
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1LGY9BYR0X');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mlondevice.fr"),
  title: {
    default: "ML ON DEVICE | Développement Web & Mobile à Paris",
    template: "%s | ML ON DEVICE",
  },
  description: "Agence de développement web et mobile à Paris. Création de sites web, applications mobiles et solutions digitales sur mesure. Devis gratuit sous 24h.",
  keywords: [
    "développement web Paris",
    "création site internet",
    "application mobile",
    "agence digitale Paris",
    "développeur freelance",
    "React Native",
    "Next.js",
    "Firebase",
    "UI/UX design",
    "site web sur mesure",
    "développement application",
  ],
  authors: [{ name: "Max Levy", url: "https://mlondevice.fr" }],
  creator: "Max Levy",
  publisher: "ML ON DEVICE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://mlondevice.fr",
  },
  openGraph: {
    title: "ML ON DEVICE | Développement Web & Mobile à Paris",
    description: "Agence de développement web et mobile à Paris. Création de sites web, applications mobiles et solutions digitales sur mesure. Devis gratuit sous 24h.",
    url: "https://mlondevice.fr",
    siteName: "ML ON DEVICE",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ML ON DEVICE - Développement Web & Mobile à Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ML ON DEVICE | Développement Web & Mobile à Paris",
    description: "Agence de développement web et mobile à Paris. Création de sites web, applications mobiles et solutions digitales sur mesure.",
    images: ["/og-image.jpg"],
    creator: "@mlondevice",
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
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ML ON DEVICE",
  description: "Agence de développement web et mobile à Paris. Création de sites web, applications mobiles et solutions digitales sur mesure.",
  url: "https://mlondevice.fr",
  logo: "https://mlondevice.fr/logo.png",
  image: "https://mlondevice.fr/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.8566,
    longitude: 2.3522,
  },
  areaServed: {
    "@type": "Country",
    name: "France",
  },
  priceRange: "€€",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  founder: {
    "@type": "Person",
    name: "Max Levy",
  },
  sameAs: ["https://linkedin.com/company/mlondevice"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Ads tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11444275097"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11444275097');
            `,
          }}
        />
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

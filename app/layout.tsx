import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://bha-nine.vercel.app";
const officialBhaAsset = "https://raw.githubusercontent.com/Omoluabi1003/bha/main/9DF002EA-EE3F-4507-924B-82B021A3F925.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Best Home Academy | Eket",
  description: "Best Home Academy, Eket, Akwa Ibom State. Excellence Is Doing Ordinary Things Extraordinarily Well.",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: officialBhaAsset, type: "image/png" }],
    shortcut: officialBhaAsset,
    apple: officialBhaAsset,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Best Home Academy",
    title: "Best Home Academy | Eket",
    description: "Preparation that turns ambition into results. JAMB, WAEC and NECO preparation in Eket, Akwa Ibom State.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Best Home Academy, Eket" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Home Academy | Eket",
    description: "Preparation that turns ambition into results. JAMB, WAEC and NECO preparation in Eket, Akwa Ibom State.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

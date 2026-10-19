import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Best Home Academy | Eket",
  description: "Best Home Academy, Eket, Akwa Ibom State. Excellence Is Doing Ordinary Things Extraordinarily Well.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

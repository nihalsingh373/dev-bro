import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/layout/SmoothScroll";

export const metadata: Metadata = {
  title: "DevBros — Built to convert. Designed to last.",
  description:
    "A two-person studio crafting high-performance websites, Shopify storefronts and brand identities for founders who refuse to blend in.",
  keywords: [
    "web development",
    "UI/UX design",
    "Shopify",
    "freelance",
    "studio",
  ],
  openGraph: {
    title: "DevBros Studio",
    description: "Built to convert. Designed to last.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

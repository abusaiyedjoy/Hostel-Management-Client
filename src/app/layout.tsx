import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "next-themes";
import Header from "@/components/shadcn-studio/blocks/hero-section-41/header";
import { NavigationSection } from "@/components/shadcn-studio/blocks/menu-dropdown";
import Footer from "@/components/shadcn-studio/blocks/hero-section-41/footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Review App",
  description: "Review App",
};

const navigationData: NavigationSection[] = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Testimonials",
    href: "/testimonials",
  },
  {
    title: "Contact us",
    href: "/contact",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class">
          <Header navigationData={navigationData} />
          <Providers>{children}</Providers>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

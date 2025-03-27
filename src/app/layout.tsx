import type { Metadata } from "next";
import { Montserrat_Alternates, Montserrat } from "next/font/google";
import "./globals.css";
import NavbarGuest from "@/components/common/NavbarGuest";
import BottomBar from "@/components/common/BottomBar";

const mostSans = Montserrat({
  variable: "--font-most-sans",
  subsets: ["latin"],
});

const geistAlter = Montserrat_Alternates({
  variable: "--font-most-alter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Give a paw!",
  description: "Happy to help you give a paw!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mostSans.variable} ${geistAlter.variable} antialiased`}
      >
        <header className="container mx-auto">
          <NavbarGuest />
        </header>

        {children}
        <footer className="">
          <BottomBar />
        </footer>
      </body>
    </html>
  );
}

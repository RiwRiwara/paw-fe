"use client";
import { Montserrat_Alternates, Montserrat } from "next/font/google";
import "./globals.css";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const mostSans = Montserrat({
  variable: "--font-most-sans",
  subsets: ["latin"],
});

const geistAlter = Montserrat_Alternates({
  variable: "--font-most-alter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// export const metadata: Metadata = {
//   title: "Give a paw!",
//   description: "Happy to help you give a paw!",
// };

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
        <Toaster position="top-center" />
        <AuthLayout>{children}</AuthLayout>
      </body>
    </html>
  );
}
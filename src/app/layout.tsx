"use client";
import { Montserrat_Alternates, Montserrat } from "next/font/google";
import "./globals.css";
import AuthLayout from "@/components/layouts/AuthLayout";
import { SessionProvider } from "next-auth/react";

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
        <SessionProvider>
          <AuthLayout>{children}</AuthLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
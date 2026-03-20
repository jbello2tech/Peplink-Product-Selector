import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { WizardProvider } from "@/context/WizardContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peplink Product Selector",
  description: "Find the right Peplink router for your deployment in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <WizardProvider>{children}</WizardProvider>
      </body>
    </html>
  );
}

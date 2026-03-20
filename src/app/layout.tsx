import type { Metadata } from "next";
import { Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { WizardProvider } from "@/context/WizardContext";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peplink Product Selector",
  description: "Find the right Peplink router for your deployment in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg">
        <WizardProvider>{children}</WizardProvider>
      </body>
    </html>
  );
}

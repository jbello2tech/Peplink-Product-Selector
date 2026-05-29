import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { WizardProvider } from "@/context/WizardContext";

const josefin = Josefin_Sans({
  weight: ["100", "200", "300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peplink Product Selector — KJJ Tech",
  description: "Find the right Peplink router for your deployment in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${josefin.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <WizardProvider>{children}</WizardProvider>
      </body>
    </html>
  );
}

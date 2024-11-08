import type { Metadata } from "next";
import { Darker_Grotesque, Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
const darker = Darker_Grotesque({ subsets: ["latin"], weight: "500" });
export const metadata: Metadata = {
  title: "Insight Junction",
  description: "Created by Trang and friends",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

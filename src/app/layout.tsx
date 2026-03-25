import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tem | Etico",
  description: "Etico e-ticaret ana sayfasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conference Program – Server Functions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

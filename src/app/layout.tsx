import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyQuest - Create Your Character",
  description: "Pick your pixel character and study with friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

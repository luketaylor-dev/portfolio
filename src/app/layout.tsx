import "../styles/globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "Luke Taylor — Portfolio",
  description: "Unity Developer specialising in VR, EEG & Free-to-Play",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-white min-h-screen">
        <header className="border-b border-neutral-800">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="font-semibold tracking-tight">
              Luke Taylor
            </Link>
            <nav className="flex gap-6 text-sm text-neutral-300">
              <Link href="/projects">Projects</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
        <footer className="border-t border-neutral-800 mt-16">
          <div className="container py-8 text-sm text-neutral-400">
            © {new Date().getFullYear()} Luke Taylor. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

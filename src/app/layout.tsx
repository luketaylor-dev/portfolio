import "../styles/globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import { Home, FolderOpen, User, Mail, Menu, X } from "lucide-react";
import MobileNav from "@/components/mobile-nav";

export const metadata = {
  title: "Luke Taylor — Unity Developer Portfolio",
  description:
    "Unity Developer specialising in VR, EEG & Free-to-Play game development. Building immersive experiences that push boundaries.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-neutral-950 text-white min-h-screen antialiased">
        {/* Background gradient for all pages */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-950/20 via-neutral-950 to-purple-900/20 pointer-events-none"></div>

        <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-purple-800/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link href="/" className="group flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-2 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300">
                  <span className="text-white font-bold text-lg">LT</span>
                </div>
                <span className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
                  Luke Taylor
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-neutral-300 hover:text-purple-300 transition-colors duration-200 group"
                >
                  <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="flex items-center gap-2 text-neutral-300 hover:text-purple-300 transition-colors duration-200 group"
                >
                  <FolderOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-2 text-neutral-300 hover:text-purple-300 transition-colors duration-200 group"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  About
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-neutral-300 hover:text-purple-300 transition-colors duration-200 group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Contact
                </Link>
              </nav>

              {/* Mobile Navigation */}
              <MobileNav />
            </div>
          </div>
        </header>

        <main className="relative z-10 container mx-auto px-4 py-10">
          {children}
        </main>

        <footer className="relative z-10 border-t border-purple-800/30 mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3">
                    <span className="text-white font-bold text-lg">LT</span>
                  </div>
                  <span className="font-bold text-xl text-white">
                    Luke Taylor
                  </span>
                </div>
                <p className="text-neutral-400 max-w-xs">
                  Unity Developer crafting immersive experiences in VR, EEG
                  visualization, and game development.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Quick Links</h3>
                <div className="space-y-2">
                  <Link
                    href="/projects"
                    className="block text-neutral-400 hover:text-purple-300 transition-colors"
                  >
                    View Projects
                  </Link>
                  <Link
                    href="/about"
                    className="block text-neutral-400 hover:text-purple-300 transition-colors"
                  >
                    About Me
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-neutral-400 hover:text-purple-300 transition-colors"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Let's Connect</h3>
                <p className="text-neutral-400">
                  Ready to build something amazing together? Let's discuss your
                  next Unity project.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-medium text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                >
                  Start a Project
                </Link>
              </div>
            </div>

            <div className="border-t border-purple-800/30 mt-8 pt-8 text-center">
              <p className="text-sm text-neutral-500">
                © {new Date().getFullYear()} Luke Taylor. All rights reserved.
                Built with Unity, Next.js, and a lot of purple.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

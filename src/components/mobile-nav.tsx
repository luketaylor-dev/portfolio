"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, FolderOpen, User, Mail, Menu, X } from "lucide-react";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: FolderOpen },
    { href: "/about", label: "About", icon: User },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg border border-purple-800/50 text-purple-300 hover:bg-purple-900/20 transition-colors"
        aria-label="Toggle mobile menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Menu panel */}
          <div className="absolute right-0 top-0 h-full w-80 bg-neutral-950/95 border-l border-purple-800/50 backdrop-blur-md">
            <div className="p-6 space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-2">
                    <span className="text-white font-bold text-lg">LT</span>
                  </div>
                  <span className="font-bold text-xl text-white">
                    Luke Taylor
                  </span>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg text-purple-300 hover:bg-purple-900/20 transition-colors"
                  aria-label="Close mobile menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation items */}
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-4 rounded-xl text-neutral-300 hover:text-purple-300 hover:bg-purple-900/20 transition-all duration-200 group"
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* CTA */}
              <div className="pt-6 border-t border-purple-800/50">
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-medium text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Start a Project
                </Link>
              </div>

              {/* Footer info */}
              <div className="pt-6 border-t border-purple-800/50">
                <p className="text-xs text-neutral-500 text-center">
                  Unity Developer crafting immersive experiences
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

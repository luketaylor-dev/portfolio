"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, FileText } from "lucide-react";
import { navItems, socialLinks } from "@/lib/navigation";
import { ResumeDownload } from "@/components/content";

export default function MobileNavEnhanced() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg border border-primary-800/50 text-primary-300 hover:bg-primary-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-95"
        aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Menu Overlay - rendered via portal to escape header's stacking context */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[70] md:hidden ${
              isOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className={`absolute top-0 right-0 w-80 h-full overflow-hidden border-l border-primary-800/50 shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ isolation: "isolate" }}
        >
          {/* Opaque background layer - prevents content bleed-through on mobile */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#0a0a0a" }}
            aria-hidden
          />
          <div className="relative flex flex-col h-full z-10">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary-800/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-2 shadow-lg shadow-primary-500/25">
                  <span className="text-white font-bold text-lg">LT</span>
                </div>
                <span className="font-bold text-xl text-white">Luke Taylor</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-primary-300 hover:bg-primary-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-4 rounded-xl text-neutral-300 hover:bg-primary-900/20 hover:text-primary-300 transition-all duration-200 active:scale-95 group"
                >
                  <div className="p-2 rounded-lg bg-primary-900/20 group-hover:bg-primary-800/30 transition-colors">
                    <item.icon className="w-5 h-5" aria-hidden />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              {/* Resume Download */}
              <div className="pt-4 border-t border-primary-800/30">
                <div className="flex items-center gap-3 p-4">
                  <div className="p-2 rounded-lg bg-primary-900/20">
                    <FileText className="w-5 h-5" />
                  </div>
                  <ResumeDownload variant="ghost" size="sm" />
                </div>
              </div>
            </nav>

            {/* Social Links */}
            <div className="p-6 border-t border-primary-800/30 space-y-2">
              <h3 className="text-sm font-medium text-neutral-400 mb-3">Connect</h3>
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg text-neutral-300 hover:bg-primary-900/20 hover:text-primary-300 transition-all duration-200 active:scale-95"
                  >
                    <div className="p-2 rounded-lg bg-primary-900/20">
                      <Icon className="w-5 h-5" aria-hidden />
                    </div>
                    <span className="font-medium">{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* CTA */}
            <div className="p-6 border-t border-primary-800/30">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-3 px-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200 active:scale-95"
              >
                Start a Project
              </Link>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-primary-800/30">
              <p className="text-xs text-neutral-500 text-center">
                Unity Developer crafting immersive experiences
              </p>
            </div>
          </div>
        </div>
      </div>,
      document.body
      )}
    </>
  );
}

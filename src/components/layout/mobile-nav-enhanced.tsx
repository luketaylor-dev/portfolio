"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navItems, socialLinks } from "@/lib/navigation";

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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
        aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[70] md:hidden ${
              isOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {/* Backdrop */}
            <div
              className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
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
              className={`absolute top-0 right-0 w-72 h-full border-l border-neutral-800 shadow-2xl transition-transform duration-300 ease-out ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
              style={{ isolation: "isolate" }}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "#0f0f0f" }}
                aria-hidden
              />
              <div className="relative flex flex-col h-full z-10">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <Image src="/icons/favicon.png" alt="Luke Taylor logo" width={36} height={36} className="rounded-lg" />
                    <span className="font-bold text-white">Luke Taylor</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-neutral-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="Close mobile menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-4 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors duration-200"
                    >
                      <item.icon className="w-5 h-5 text-neutral-500" aria-hidden />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* Social Links */}
                <div className="p-4 border-t border-neutral-800 space-y-1">
                  <p className="text-xs font-medium text-neutral-500 px-4 mb-2">Connect</p>
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors duration-200"
                      >
                        <Icon className="w-5 h-5 text-neutral-500" aria-hidden />
                        <span className="font-medium">{link.label}</span>
                      </a>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="p-4 border-t border-neutral-800">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 px-6 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors duration-200"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

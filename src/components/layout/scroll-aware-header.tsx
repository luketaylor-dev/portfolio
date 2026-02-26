"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { navItems } from "@/lib/navigation";
import { MobileNavEnhanced } from "@/components/layout";
import { ResumeDownload } from "@/components/content";
import InteractiveText from "@/components/interactive-text";

const HEADER_HEIGHT = 72;
const SCROLL_THRESHOLD = 80; // Hide header after scrolling down 80px (sooner)

export function ScrollAwareHeader({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < SCROLL_THRESHOLD) {
        setVisible(true);
      } else if (scrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[60] backdrop-blur-md bg-neutral-950/80 border-b border-primary-800/30 transition-transform duration-300 ease-out"
        style={{
          minHeight: HEADER_HEIGHT,
          transform: visible ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="group flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-2 shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 group-hover:scale-110 transition-all duration-300">
                  <span className="text-white font-bold text-lg">LT</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-white group-hover:text-primary-300 transition-colors">
                    Luke Taylor
                  </span>
                  <span className="text-xs text-primary-300 opacity-80">
                    From Brainwaves to Gameplay
                  </span>
                </div>
              </Link>
              <span
                className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-600/20 text-primary-300 border border-primary-500/30"
                aria-label="Availability status"
              >
                Currently Available
              </span>
            </div>

            <nav
              className="hidden md:flex items-center gap-8"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={item.prefetch ?? false}
                    className="flex items-center gap-2 group hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg p-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                    aria-label={item.ariaLabel ?? item.label}
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <InteractiveText variant="link">{item.label}</InteractiveText>
                  </Link>
                );
              })}
              <ResumeDownload variant="secondary" size="sm" />
            </nav>

            <MobileNavEnhanced />
          </div>
        </div>
      </header>
      <div style={{ height: HEADER_HEIGHT }} aria-hidden />
      {children}
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/lib/navigation";
import { MobileNavEnhanced } from "@/components/layout";
import InteractiveText from "@/components/interactive-text";

const HEADER_HEIGHT = 64;
const SCROLL_THRESHOLD = 80;

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
        className="fixed top-0 left-0 right-0 z-[60] backdrop-blur-md bg-[#0f0f0f]/90 border-b border-neutral-800 transition-transform duration-300 ease-out"
        style={{
          minHeight: HEADER_HEIGHT,
          transform: visible ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-3 py-3 pr-[max(0.25rem,env(safe-area-inset-right))]">
            <Link
              href="/"
              className="group flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:flex-none md:min-w-0"
            >
              <Image
                src="/icons/favicon.png"
                alt="Luke Taylor logo"
                width={36}
                height={36}
                className="shrink-0 rounded-lg"
              />
              <div className="min-w-0 flex flex-col">
                <span className="truncate font-bold text-base text-white transition-colors duration-200 group-hover:text-primary-300">
                  Luke Taylor
                </span>
                <span className="hidden text-xs leading-none text-neutral-500 sm:block">
                  From Brainwaves to Gameplay
                </span>
              </div>
            </Link>

            <nav
              className="hidden md:flex items-center gap-6"
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
                    className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg p-1"
                    aria-label={item.ariaLabel ?? item.label}
                  >
                    <Icon className="w-4 h-4 text-neutral-400" />
                    <InteractiveText variant="link">{item.label}</InteractiveText>
                  </Link>
                );
              })}
            </nav>

            <div className="shrink-0">
              <MobileNavEnhanced />
            </div>
          </div>
        </div>
      </header>
      <div style={{ height: HEADER_HEIGHT }} aria-hidden />
      {children}
    </>
  );
}

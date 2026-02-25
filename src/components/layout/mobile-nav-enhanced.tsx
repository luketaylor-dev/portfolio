"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  FolderOpen,
  User,
  Mail,
  FileText,
  Linkedin,
  Github,
} from "lucide-react";
import { ResumeDownload } from "@/components/content";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNavEnhanced() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
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

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: FolderOpen },
    { href: "/blog", label: "Blog", icon: FileText },
    { href: "/about", label: "About", icon: User },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/luke-taylor-ab5080166/",
      label: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      href: "https://github.com/luketaylor-dev",
      label: "GitHub",
      icon: <Github className="w-5 h-5" />,
    },
  ];

  if (!mounted) {
    return (
      <button className="md:hidden p-2 rounded-lg border border-primary-800/50 text-primary-300 hover:bg-primary-900/20 transition-colors">
        <Menu className="w-5 h-5" />
      </button>
    );
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={handleToggleMenu}
        className="md:hidden p-2 rounded-lg border border-primary-800/50 text-primary-300 hover:bg-primary-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-95"
        aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={handleCloseMenu}
            />

            {/* Menu Panel */}
            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.4,
              }}
              className="absolute top-0 right-0 w-80 h-full bg-neutral-950 border-l border-primary-800/50 shadow-2xl"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center justify-between p-6 border-b border-primary-800/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-2 shadow-lg shadow-primary-500/25">
                      <span className="text-white font-bold text-lg">LT</span>
                    </div>
                    <span className="font-bold text-xl text-white">
                      Luke Taylor
                    </span>
                  </div>
                  <button
                    onClick={handleCloseMenu}
                    className="p-2 rounded-lg text-primary-300 hover:bg-primary-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="Close mobile menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>

                {/* Navigation Items */}
                <nav className="flex-1 p-6 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleCloseMenu}
                        className="flex items-center gap-3 p-4 rounded-xl text-neutral-300 hover:bg-primary-900/20 hover:text-primary-300 transition-all duration-200 active:scale-95 group"
                      >
                        <div className="p-2 rounded-lg bg-primary-900/20 group-hover:bg-primary-800/30 transition-colors">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Resume Download */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="pt-4 border-t border-primary-800/30"
                  >
                    <div className="flex items-center gap-3 p-4">
                      <div className="p-2 rounded-lg bg-primary-900/20">
                        <FileText className="w-5 h-5" />
                      </div>
                      <ResumeDownload variant="ghost" size="sm" />
                    </div>
                  </motion.div>
                </nav>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 border-t border-primary-800/30 space-y-2"
                >
                  <h3 className="text-sm font-medium text-neutral-400 mb-3">
                    Connect
                  </h3>
                  {socialLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + index * 0.05 }}
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleCloseMenu}
                        className="flex items-center gap-3 p-3 rounded-lg text-neutral-300 hover:bg-primary-900/20 hover:text-primary-300 transition-all duration-200 active:scale-95"
                      >
                        <div className="p-2 rounded-lg bg-primary-900/20">
                          {link.icon}
                        </div>
                        <span className="font-medium">{link.label}</span>
                      </a>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-6 border-t border-primary-800/30"
                >
                  <Link
                    href="/contact"
                    onClick={handleCloseMenu}
                    className="block w-full text-center py-3 px-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200 active:scale-95"
                  >
                    Start a Project
                  </Link>
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="p-6 border-t border-primary-800/30"
                >
                  <p className="text-xs text-neutral-500 text-center">
                    Unity Developer crafting immersive experiences
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

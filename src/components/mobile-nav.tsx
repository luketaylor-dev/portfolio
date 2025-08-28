"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, FolderOpen, User, Mail, Menu, X } from "lucide-react";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    console.log("Toggle menu clicked, current state:", isOpen);
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    console.log("Close menu clicked");
    setIsOpen(false);
  };

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/projects", label: "Projects", icon: "📁" },
    { href: "/blog", label: "Blog", icon: "📝" },
    { href: "/about", label: "About", icon: "👤" },
    { href: "/contact", label: "Contact", icon: "📧" },
  ];

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <button className="md:hidden p-2 rounded-lg border border-purple-800/50 text-purple-300 hover:bg-purple-900/20 transition-colors">
        <Menu className="w-5 h-5" />
      </button>
    );
  }

  console.log("MobileNav render - isOpen:", isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          borderRadius: "8px",
          color: "#d1d5db",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(88, 28, 135, 0.2)";
          e.currentTarget.style.color = "#c4b5fd";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#d1d5db";
        }}
      >
        {isOpen ? (
          <X width={24} height={24} />
        ) : (
          <Menu width={24} height={24} />
        )}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          {/* Full screen backdrop */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            }}
            onClick={closeMenu}
          />

          {/* Menu panel */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "320px",
              height: "100%",
              backgroundColor: "#0a0a0a",
              borderLeft: "1px solid #581c87",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "24px",
                color: "white",
                backgroundColor: "#0a0a0a",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      LT
                    </span>
                  </div>
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Luke Taylor
                  </span>
                </div>
                <button
                  onClick={closeMenu}
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    color: "#c4b5fd",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  aria-label="Close mobile menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation items */}
              <nav
                style={{
                  marginBottom: "32px",
                  flex: 1,
                }}
              >
                {navItems.map((item) => {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "16px",
                        borderRadius: "12px",
                        color: "#d1d5db",
                        textDecoration: "none",
                        marginBottom: "8px",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(88, 28, 135, 0.2)";
                        e.currentTarget.style.color = "#c4b5fd";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#d1d5db";
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>{item.icon}</span>
                      <span style={{ fontWeight: "500" }}>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Social Links */}
                <div
                  style={{ paddingTop: "16px", borderTop: "1px solid #581c87" }}
                >
                  <a
                    href="https://www.linkedin.com/in/luke-taylor-ab5080166/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "16px",
                      borderRadius: "12px",
                      color: "#d1d5db",
                      textDecoration: "none",
                      marginBottom: "8px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(88, 28, 135, 0.2)";
                      e.currentTarget.style.color = "#c4b5fd";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#d1d5db";
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span style={{ fontWeight: "500" }}>LinkedIn</span>
                  </a>

                  <a
                    href="https://github.com/luketaylor-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "16px",
                      borderRadius: "12px",
                      color: "#d1d5db",
                      textDecoration: "none",
                      marginBottom: "8px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(88, 28, 135, 0.2)";
                      e.currentTarget.style.color = "#c4b5fd";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#d1d5db";
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span style={{ fontWeight: "500" }}>GitHub</span>
                  </a>
                </div>
              </nav>

              {/* CTA */}
              <div
                style={{
                  marginBottom: "32px",
                  paddingTop: "24px",
                  borderTop: "1px solid #581c87",
                }}
              >
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    padding: "12px 24px",
                    background: "linear-gradient(90deg, #9333ea, #7c3aed)",
                    borderRadius: "12px",
                    fontWeight: "500",
                    color: "white",
                    textDecoration: "none",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(147, 51, 234, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Start a Project
                </Link>
              </div>

              {/* Footer info */}
              <div
                style={{
                  paddingTop: "24px",
                  borderTop: "1px solid #581c87",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    textAlign: "center",
                  }}
                >
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

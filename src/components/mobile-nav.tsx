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
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: FolderOpen },
    { href: "/about", label: "About", icon: User },
    { href: "/contact", label: "Contact", icon: Mail },
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
                  const Icon = item.icon;
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
                      <Icon size={20} />
                      <span style={{ fontWeight: "500" }}>{item.label}</span>
                    </Link>
                  );
                })}
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

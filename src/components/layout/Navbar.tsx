"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

interface NavbarProps {
  siteName?: string;
  isLoggedIn?: boolean;
}

import { useTheme } from "@/providers/ThemeProvider";

export function Navbar({ siteName: propSiteName, isLoggedIn = false }: NavbarProps) {
  const { settings } = useTheme();
  const siteName = propSiteName || settings.siteName;
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-secondary)]/95 backdrop-blur-md border-b border-[var(--color-primary)]/20">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-gradient-primary">
              {siteName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 relative py-2",
                  pathname === item.href
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-accent)]/80 hover:text-[var(--color-primary)]"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Login/Admin Button */}
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-secondary)] text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-all"
              >
                <User size={16} />
                Admin
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-[var(--color-accent)]/80 hover:text-[var(--color-primary)] transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[var(--color-accent)]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 bg-[var(--color-secondary-light)] rounded-lg mt-2 p-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-[var(--color-primary)] text-[var(--color-secondary)]"
                        : "text-[var(--color-accent)]/80 hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)]"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={isLoggedIn ? "/dashboard" : "/login"}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
                >
                  {isLoggedIn ? "Admin" : "Login"}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

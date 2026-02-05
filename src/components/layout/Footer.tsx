"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";

interface FooterProps {
  siteName?: string;
  instagram?: string;
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export function Footer({
  siteName = "ArchiDuo",
  instagram = "archiduo",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-secondary)]">
      {/* wrapper que CENTRALIZA tudo */}
      <div className="flex justify-center px-4 py-16 lg:py-20">
        {/* bloco central real */}
        <div className="w-full max-w-7xl flex flex-col items-center gap-8 text-center">

          {/* NAV */}
          <nav className="w-full max-w-md">
            <ul className="grid grid-cols-3 items-center list-none p-0 m-0">
              {quickLinks.map((link) => (
                <li key={link.href} className="text-center">
                  <Link
                    href={link.href}
                    className="text-[var(--color-accent)]/60 hover:text-[var(--color-primary)] transition-colors text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-[var(--color-accent)]/10" />

          {/* Instagram */}
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-2 text-[var(--color-accent)]/60 hover:text-[var(--color-primary)] transition-colors text-base"
          >
            <Instagram size={18} />
            <span>@{instagram}</span>
          </a>

          {/* Copyright */}
          <div className="text-[var(--color-accent)]/40 text-xs flex flex-col gap-1">
            <p>© {currentYear} {siteName}. Todos os direitos reservados.</p>
            <p>Desenvolvido com ❤️ por matmata_</p>
          </div>

        </div>
      </div>
    </footer>
  );
}

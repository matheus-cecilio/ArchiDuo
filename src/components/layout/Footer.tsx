"use client";

import Link from "next/link";
import { 
  Instagram
} from "lucide-react";

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
    <footer className="relative bg-[var(--color-secondary)] overflow-hidden">

      {/* Main Footer Content */}
      <div className="relative min-h-[15vh] flex items-center justify-center py-24 lg:py-32">
        <div className="w-full px-4">
          <div className="flex flex-col items-center justify-center text-center space-y-10 mx-auto">
            
            {/* Links de navegação */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-md mx-auto text-center">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[var(--color-accent)]/60 hover:text-[var(--color-primary)] transition-colors duration-300 text-base"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Linha divisória */}
            <div className="w-full max-w-md h-px bg-[var(--color-accent)]/10 my-8 mx-auto" />

            {/* Instagram */}
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center justify-center gap-1 text-[var(--color-accent)]/60 hover:text-[var(--color-primary)] transition-colors text-base leading-none"
            >
              <Instagram size={18} className="shrink-0" />
              <span>@{instagram}</span>
            </a>


            {/* Copyright */}
            <div className="text-[var(--color-accent)]/40 text-xs space-y-2">
              <p>© {currentYear} {siteName}. Todos os direitos reservados.</p>
              <p>Desenvolvido com ❤️ por {siteName}</p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

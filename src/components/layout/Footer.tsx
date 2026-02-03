import Link from "next/link";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  siteName?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  whatsapp?: string;
}

export function Footer({
  siteName = "ArchiDuo",
  email,
  phone,
  instagram,
  whatsapp,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-secondary)] text-[var(--color-text-on-dark)]">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-gradient-gold">
              {siteName}
            </h3>
            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
              Transformando espaços em experiências únicas. 
              Arquitetura e design que inspiram.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--color-primary)]">
              Links Rápidos
            </h4>
            <nav className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/projetos" 
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
              >
                Projetos
              </Link>
              <Link 
                href="/sobre" 
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
              >
                Sobre
              </Link>
              <Link 
                href="/contato" 
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
              >
                Contato
              </Link>
            </nav>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--color-primary)]">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <Mail size={16} />
                  {email}
                </a>
              )}
              {phone && (
                <a 
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <Phone size={16} />
                  {phone}
                </a>
              )}
              {instagram && (
                <a 
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <Instagram size={16} />
                  @{instagram}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divisor e Copyright */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              © {currentYear} {siteName}. Todos os direitos reservados.
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              Desenvolvido com 💛 por{" "}
              <span className="text-[var(--color-primary)]">ArchiDuo</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

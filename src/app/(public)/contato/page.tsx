"use client";

import { motion } from "framer-motion";
import { MapPin, Instagram } from "lucide-react";

export default function ContatoPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-12 bg-[var(--color-secondary)]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
              <span className="text-gradient-gold">Fale</span> <span className="text-white">Conosco</span>
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-center leading-relaxed">
              Tem um projeto em mente? Adoraríamos ouvir sobre ele.
              Entre em contato através dos nossos canais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className=" bg-[var(--color-background)] min-h-[60vh] flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
              {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
            >
              <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] text-center mb-20">
                Informações de Contato
              </h2>

              <div className="space-y-6 p-8">
                <motion.a
                  href="https://instagram.com/archiduo"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg"
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
                    <Instagram size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-1">Instagram</h3>
                    <p className="text-[var(--color-text-muted)]">@archiduo</p>
                  </div>
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-start gap-4 p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg"
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                    <MapPin size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-1">Localização</h3>
                    <p className="text-[var(--color-text-muted)]">Santa Catarina - SC - Brasil</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

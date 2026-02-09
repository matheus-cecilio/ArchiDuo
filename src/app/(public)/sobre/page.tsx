"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";
import { LightTrail } from "@/components/effects/LightTrail";


export default function SobrePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={containerRef} className="relative bg-[var(--color-secondary)]">
      {/* ============================================
          HERO - Apresentação Pessoal
          ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background com Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: backgroundY }}
        >
          {/* Gradiente radial dourado sutil */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--color-primary)]/5 blur-[150px]" />
        </motion.div>

        {/* Linhas decorativas arquitetônicas */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <motion.line
            x1="10%"
            y1="0"
            x2="10%"
            y2="100%"
            stroke="#D4AF37"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.line
            x1="90%"
            y1="0"
            x2="90%"
            y2="100%"
            stroke="#D4AF37"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.7 }}
          />
        </svg>

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge sutil */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-12"
            >
              <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="text-sm text-[var(--color-primary)] tracking-[0.3em] uppercase">
                Sobre
              </span>
              <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
            </motion.div>

            {/* Nome com animação dramática */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold font-[family-name:var(--font-playfair)] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <span className="text-gradient-gold">ArchiDuo</span>
            </motion.h1>

            {/* Linha dourada animada */}
            <motion.div
              className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent mx-auto mb-12"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-400 font-light tracking-wide"
            >
              Onde cada linha conta uma história
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-16 bg-gradient-to-b from-[var(--color-primary)] to-transparent"
          />
        </motion.div>
      </section>

      {/* ============================================
          MANIFESTO - O que move a arquiteta
          ============================================ */}
      <section className="py-32 relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Quote grande e impactante */}
            <blockquote className="relative">
              {/* Aspas decorativas */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute -top-8 -left-2 md:-top-12 md:-left-4 text-[100px] md:text-[150px] text-[var(--color-primary)]/10 font-serif leading-none select-none"
              >
                "
              </motion.span>

              <p className="text-xl md:text-xl lg:text-2xl font-[family-name:var(--font-playfair)] text-white leading-relaxed relative z-10 text-center">
                {/* Animação palavra por palavra */}
                {[
                  { text: "Acredito", gold: false },
                  { text: "que", gold: false },
                  { text: "a", gold: false },
                  { text: "arquitetura", gold: false },
                  { text: "tem", gold: false },
                  { text: "o", gold: false },
                  { text: "poder", gold: false },
                  { text: "de", gold: false },
                  { text: "transformar", gold: true },
                  { text: "vidas.", gold: true },
                  { text: "Cada", gold: false },
                  { text: "espaço", gold: false },
                  { text: "que", gold: false },
                  { text: "projeto", gold: false },
                  { text: "é", gold: false },
                  { text: "uma", gold: false },
                  { text: "extensão", gold: false },
                  { text: "de", gold: false },
                  { text: "quem", gold: false },
                  { text: "você", gold: false },
                  { text: "é", gold: false },
                  { text: "—", gold: false },
                  { text: "seus", gold: false },
                  { text: "sonhos,", gold: false },
                  { text: "sua", gold: false },
                  { text: "rotina,", gold: false },
                  { text: "sua", gold: false },
                  { text: "forma", gold: false },
                  { text: "de", gold: false },
                  { text: "viver.", gold: false },
                ].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={word.gold ? "text-gradient-gold" : ""}
                  >
                    {word.text}{" "}
                  </motion.span>
                ))}
              </p>

              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-12 -right-2 md:-bottom-16 md:-right-4 text-[100px] md:text-[150px] text-[var(--color-primary)]/10 font-serif leading-none select-none rotate-180"
              >
                "
              </motion.span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ============================================
          A ESSÊNCIA - Cards com design premium
          ============================================ */}
      <section className="py-32 relative overflow-hidden bg-[var(--color-background)]">
        <div className="container-custom relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-sm text-[var(--color-primary)] tracking-[0.4em] uppercase mb-16 pb-8"
          >
            A essência
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Escuta",
                text: "Antes de desenhar, eu escuto. Cada projeto começa com uma boa conversa.",
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" />
                    <path d="M12 22C12 22 4 17.5 4 12C4 6.5 7.58 2 12 2C16.42 2 20 6.5 20 12C20 17.5 12 22 12 22Z" />
                  </svg>
                ),
              },
              {
                number: "02",
                title: "Emoção",
                text: "Espaços onde você se sente verdadeiramente em casa.",
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
                  </svg>
                ),
              },
              {
                number: "03",
                title: "Detalhe",
                text: "A magia está nos pequenos gestos. Cada textura, cada luz, cada proporção é pensada.",
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3L14.5 8.5L21 9.5L16.5 14L17.5 21L12 18L6.5 21L7.5 14L3 9.5L9.5 8.5L12 3Z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-[var(--color-border)] overflow-hidden"
              >
                {/* Número de fundo gigante */}
                <span className="absolute -top-4 -right-4 text-[140px] font-bold font-[family-name:var(--font-playfair)] text-[var(--color-primary)]/5 leading-none select-none group-hover:text-[var(--color-primary)]/10 transition-colors duration-500">
                  {item.number}
                </span>

                {/* Linha de destaque no topo */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-amber-400 to-[var(--color-primary)]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                />

                {/* Ícone que "acende" no hover */}
                <div
                  className="relative w-16 h-16 rounded-2xl bg-[#0d0d0d] border flex items-center justify-center mb-6 overflow-hidden transition-all duration-100 group-hover:border-[var(--color-primary)]/0"
                >
                  {/* Glow de fundo - aparece no hover (lâmpada acendendo) */}
                  <div
                    className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/25 rounded-2xl transition-all duration-100"
                  />
                  <div
                    className="relative z-10 text-yellow-500 group-hover:text-yellow transition-all duration-100"
                  >
                    {item.icon}
                  </div>


                </div>

                {/* Título */}
                <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] mb-4 relative z-10">
                  {item.title}
                </h3>

                {/* Texto */}
                <p className="text-[var(--color-text-muted)] leading-relaxed relative z-10">
                  {item.text}
                </p>

                {/* Brilho hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/0 to-[var(--color-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          TEXTO FLUINDO - Com spots de luz ambiente (como iluminação arquitetônica)
          ============================================ */}
      <section className="py-40 relative overflow-hidden">
        {/* Spots de luz - como downlights de um projeto de iluminação */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Spot 1 - Canto superior esquerdo */}
          <motion.div
            className="absolute w-[350px] h-[350px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.15) 40%, transparent 70%)",
              top: "5%",
              left: "10%",
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Spot 2 - Canto inferior direito */}
          <motion.div
            className="absolute w-[450px] h-[450px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.12) 40%, transparent 70%)",
              bottom: "0%",
              right: "5%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto space-y-16">
            {[
              "Minha jornada começou com uma paixão: criar espaços que fazem as pessoas se sentirem especiais.",
              "Cada cliente é único. Cada projeto, uma história esperando para ser contada através de luz, textura e forma.",
            ].map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0.15 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.5 + index * 0.3 }}
                className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed text-center"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA FINAL - Com pontos de luz traçando linhas
          ============================================ */}
      <section className="py-32 relative overflow-hidden">
        {/* Componente de ponto de luz traçando linhas */}
        <LightTrail />

        {/* Fundo com gradiente */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[var(--color-primary)]/10 blur-[150px] rounded-full" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >

            <p className="text-xl text-gray-400 mb-12">
              Adoraria ouvir sobre o seu projeto e como posso ajudar a transformá-lo em realidade.
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/contato">
                <Button size="lg" className="group text-lg px-10 py-4">
                  Contato
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

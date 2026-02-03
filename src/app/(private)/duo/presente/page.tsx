"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Gift, Sparkles, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui";
import confetti from "canvas-confetti";

// Mock data do presente - será substituído por dados do banco
const giftData = {
  id: "1",
  title: "Kindle Unlimited",
  message: `Ei, minha duo favorita! 🎮💛

Você é incrível, sabia? Cada partida ao seu lado é uma aventura, cada vitória fica ainda mais especial porque é com você.

Esse site é meu presente pra você - um espacinho nosso na internet, onde suas conquistas como arquiteta brilham tanto quanto nossas vitórias no Fortnite.

E como você ama ler (e merece muito mais momentos de paz e leitura), aqui vai um extra: 2 meses de Kindle Unlimited, pra você devorar todos os livros que quiser!

Obrigado por ser minha duo, no jogo e na vida. 💛

Com carinho,
Seu duo favorito 🏆`,
  content: "Email: seu-email-kindle@email.com\nSenha: (vou te mandar no WhatsApp! 😉)",
  isRevealed: false,
};

export default function PresentePage() {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(giftData.isRevealed);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = async () => {
    setIsOpening(true);

    // Animação de abertura
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Confetti!
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#F5E6C8", "#FFFFFF"],
    });

    setIsOpened(true);
    setIsOpening(false);

    // Revelar conteúdo após um delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setShowContent(true);

    // Em produção: chamar Server Action para marcar como revelado
  };

  return (
    <div className="max-w-3xl mx-auto min-h-[80vh] flex flex-col items-center justify-center px-4">
      {/* Back button */}
      <Link
        href="/duo"
        className="absolute top-8 left-8 inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ArrowLeft size={20} />
        Voltar para Duo Zone
      </Link>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          // Supply Drop (Caixa Fechada)
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            className="text-center"
          >
            <motion.div
              animate={isOpening ? {
                scale: [1, 1.1, 1.05, 1.15, 0],
                rotate: [0, -5, 5, -3, 0],
              } : {
                y: [0, -10, 0],
              }}
              transition={isOpening ? {
                duration: 1.5,
                times: [0, 0.3, 0.5, 0.8, 1],
              } : {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 blur-3xl bg-[var(--color-primary)] opacity-30 rounded-full scale-75" />
              
              {/* Supply Drop Icon */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-3xl transform rotate-3 shadow-2xl" />
                <div className="absolute inset-2 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-light)] rounded-2xl flex items-center justify-center">
                  <Gift className="w-20 h-20 text-[var(--color-primary)]" />
                </div>
                {/* Ribbon */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-16 bg-[var(--color-primary)]" />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-8 bg-[var(--color-primary)] rounded-full" />
              </div>

              {/* Sparkles around */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none"
              >
                {[...Array(6)].map((_, i) => (
                  <Sparkles
                    key={i}
                    className="absolute w-6 h-6 text-[var(--color-primary)]"
                    style={{
                      top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                      left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 45}%`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] mb-4">
                Supply Drop <span className="text-gradient-gold">Especial</span>
              </h1>
              <p className="text-[var(--color-text-muted)] mb-8">
                Tem algo muito especial esperando por você aqui dentro... 💛
              </p>

              <Button 
                size="lg" 
                onClick={handleOpen}
                disabled={isOpening}
                className="animate-pulse-gold"
              >
                {isOpening ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="mr-2" size={20} />
                    </motion.div>
                    Abrindo...
                  </>
                ) : (
                  <>
                    <Gift className="mr-2" size={20} />
                    Abrir Presente
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          // Presente Aberto
          <motion.div
            key="opened"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            {/* Card do Presente */}
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-accent-soft)] rounded-3xl p-8 md:p-12 border-2 border-[var(--color-primary)]/30 shadow-2xl"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--color-primary)] flex items-center justify-center"
                >
                  <Heart className="w-10 h-10 text-[var(--color-secondary)] fill-current" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]">
                  {giftData.title}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2 text-[var(--color-primary)]">
                  <BookOpen size={18} />
                  <span className="text-sm font-medium">2 Meses de Assinatura</span>
                </div>
              </div>

              {/* Message */}
              <AnimatePresence>
                {showContent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-[var(--color-surface)] rounded-2xl p-6 mb-6 border border-[var(--color-border)]">
                      <p className="text-[var(--color-text-secondary)] whitespace-pre-line leading-relaxed">
                        {giftData.message}
                      </p>
                    </div>

                    {/* Credentials */}
                    <div className="bg-[var(--color-secondary)] rounded-2xl p-6 text-center">
                      <p className="text-[var(--color-text-muted)] text-sm mb-3">
                        Suas credenciais de acesso:
                      </p>
                      <div className="bg-[var(--color-secondary-light)] rounded-lg p-4 font-mono text-sm text-[var(--color-accent)]">
                        {giftData.content.split("\n").map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-center"
              >
                <p className="text-[var(--color-text-muted)] text-sm flex items-center justify-center gap-2">
                  <Sparkles size={14} className="text-[var(--color-primary)]" />
                  Presente feito com muito carinho para você
                  <Sparkles size={14} className="text-[var(--color-primary)]" />
                </p>
              </motion.div>
            </motion.div>

            {/* Back to Duo Zone */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-center mt-8"
            >
              <Link href="/duo">
                <Button variant="secondary">
                  <ArrowLeft size={18} className="mr-2" />
                  Voltar para Duo Zone
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

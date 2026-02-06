"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Gift, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui";
import confetti from "canvas-confetti";

// Dados do presente
const giftData = {
  id: "1",
  title: "VOCÊ É A MELHOR DUO! 🏆",
  message: `Ei, minha duo favorita!  

Você é INCRÍVEL, sabia? Cada partida ao seu lado é uma partida e momento de alguns minutos juntos muito ÉPIC, cada dancinha esperando no lobbye cada vitória fica ainda mais especial porque é com VOCÊ.

Esse site é um pequeno presente meu pra você (pow você merece, fora que já me presenteou tbm) - isso aqui tbm é um espaço nosso na internet, onde suas conquistas como arquiteta brilham tanto quanto nossas Victory Royales! 🏆

OBRIGADO por ser minha duo <3

E a promessa? Simples: vamos continuar jogando Fortnite juntos, dropando em locais aleatórios, pegando loot lendário e conquistando mais vitórias! 🎮

Bora pra mais uma? 

Com muito carinho,
Seu duo favorito 😎 (e parceiro de squad)`,
  content: "",
  isRevealed: false,
};

const HITS_TO_BREAK = 10; // Quantos cliques pra quebrar a lhama

export default function PresentePage() {
  const [hits, setHits] = useState(0);
  const [isBreaking, setIsBreaking] = useState(false);
  const [isOpened, setIsOpened] = useState(giftData.isRevealed);
  const [showContent, setShowContent] = useState(false);
  const [showHitEffect, setShowHitEffect] = useState(false);

  const handleHit = async () => {
    if (isBreaking || isOpened) return;

    const newHits = hits + 1;
    setHits(newHits);

    // Animação de hit
    setShowHitEffect(true);
    setTimeout(() => setShowHitEffect(false), 200);

    // Se completou os hits, quebra a lhama
    if (newHits >= HITS_TO_BREAK) {
      setIsBreaking(true);

      // Animação de quebra
      await new Promise(resolve => setTimeout(resolve, 800));

      // CONFETTI EXPLOSION! 🎉
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#9333EA", "#EC4899", "#FFD700", "#FFFFFF"],
      });

      // Mais confetti!
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#9333EA", "#EC4899", "#FFD700"],
        });
      }, 200);

      setIsOpened(true);
      setIsBreaking(false);

      // Revelar conteúdo
      await new Promise(resolve => setTimeout(resolve, 500));
      setShowContent(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD700] via-[#FFC700] to-[#FFB700] relative overflow-hidden">
      {/* Fortnite-style background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 70px)`
        }} />
      </div>

      {/* Back button */}
      <Link
        href="/duo"
        className="absolute top-8 left-8 inline-flex items-center gap-2 text-gray-800 hover:text-gray-900 transition-colors font-bold z-10 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
      >
        <ArrowLeft size={20} />
        Voltar
      </Link>

      <div className="max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            // Lhama Piñata (Clicável)
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
              className="text-center"
            >
              <div className="relative mb-8">
                {/* Glow Effect */}
                <div className="absolute inset-0 blur-3xl bg-purple-500 opacity-40 rounded-full scale-110" />

                {/* Lhama do Fortnite (CLICÁVEL!) */}
                <motion.div
                  onClick={handleHit}
                  animate={isBreaking ? {
                    scale: [1, 1.2, 0.8, 1.1, 0],
                    rotate: [0, -10, 10, -5, 0],
                    opacity: [1, 1, 1, 0.5, 0],
                  } : showHitEffect ? {
                    scale: [1, 0.95, 1.05, 1],
                    rotate: [0, -3, 3, 0],
                  } : {
                    y: [0, -15, 0],
                  }}
                  transition={isBreaking ? {
                    duration: 0.8,
                  } : showHitEffect ? {
                    duration: 0.2,
                  } : {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative cursor-pointer hover:scale-105 transition-transform"
                  style={{ cursor: 'url("https://w7.pngwing.com/pngs/556/502/png-transparent-pickaxe-fortnite-battle-royale-battle-royale-game-tool-axe-harvest-video-game-metal-thumbnail.png") 16 16, pointer' }}
                >
                  <img
                    src="https://s2-techtudo.glbimg.com/DJtCXJ85bGeulFgJ3cNFzoT6R-0=/0x0:1280x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2018/y/A/Pd2yOmR7GijkZVLOjPtA/maxresdefault.jpg"
                    alt="Lhama Piñata"
                    className="w-80 h-80 object-contain drop-shadow-2xl mx-auto select-none"
                    draggable={false}
                  />

                  {/* Damage Numbers */}
                  <AnimatePresence>
                    {showHitEffect && (
                      <motion.div
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={{ opacity: 0, y: -50, scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      >
                        <span className="text-6xl font-black text-purple-600" style={{ textShadow: '2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white' }}>
                          {Math.floor(Math.random() * 30) + 20}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Sparkles around (só giram)*/}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[...Array(8)].map((_, i) => (
                    <Sparkles
                      key={i}
                      className="absolute w-8 h-8 text-purple-600"
                      style={{
                        top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 45}%`,
                        left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 50}%`,
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-purple-600"
              >
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4" style={{ textShadow: '2px 2px 0px rgba(147, 51, 234, 0.3)' }}>
                  LHAMA 🎁
                </h1>
                <p className="text-gray-700 text-lg mb-4 font-bold">
                  Clique na lhama para quebrar! 🔨
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm font-bold text-purple-600 mb-2">
                    <span>HITS: {hits}/{HITS_TO_BREAK}</span>
                    <span>{Math.floor((hits / HITS_TO_BREAK) * 100)}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden border-2 border-purple-600">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(hits / HITS_TO_BREAK) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <p className="text-gray-600 text-sm">
                  💡 Dica: Use a picareta (cursor) para bater na lhama!
                </p>
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
                className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 border-4 border-purple-600 shadow-2xl"
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-4 border-purple-700"
                  >
                    <Heart className="w-12 h-12 text-white fill-current" />
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2" style={{ textShadow: '2px 2px 0px rgba(147, 51, 234, 0.2)' }}>
                    {giftData.title}
                  </h2>
                </div>

                {/* Message */}
                <AnimatePresence>
                  {showContent && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                        <p className="text-gray-800 whitespace-pre-line leading-relaxed text-lg">
                          {giftData.message}
                        </p>
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
                  <p className="text-gray-600 text-sm flex items-center justify-center gap-2 font-medium">
                    <Sparkles size={16} className="text-purple-500" />
                    Feito com 💜 para minha duo favorita
                    <Sparkles size={16} className="text-purple-500" />
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
                  <Button className="bg-white/90 hover:bg-white text-gray-900 font-bold border-4 border-gray-800 shadow-lg">
                    <ArrowLeft size={18} className="mr-2" />
                    Voltar para o Lobby (página)
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

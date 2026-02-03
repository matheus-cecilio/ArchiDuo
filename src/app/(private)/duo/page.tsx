"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Trophy, 
  Gamepad2, 
  Upload, 
  Play, 
  Calendar,
  Target,
  Crown,
  Sparkles,
  Plus
} from "lucide-react";
import { Button, Card } from "@/components/ui";

// Mock data - será substituído por dados do banco
const mockMemories = [
  {
    id: "1",
    title: "Victory Royale - 15 Kills",
    description: "Aquela partida insana onde ganhamos com a storm fechando!",
    mediaUrl: "/placeholder.jpg",
    mediaType: "IMAGE" as const,
    matchDate: "2024-01-28",
    kills: 15,
    placement: "#1 Victory Royale",
    isHighlight: false,
  },
  {
    id: "2",
    title: "Duo Win com Sniper",
    description: "Só de sniper nessa, foi lindo demais!",
    mediaUrl: "/placeholder.jpg",
    mediaType: "IMAGE" as const,
    matchDate: "2024-01-25",
    kills: 12,
    placement: "#1 Victory Royale",
    isHighlight: false,
  },
  {
    id: "3",
    title: "Nossa Melhor Partida! 🏆",
    description: "A partida mais épica que jogamos juntos. Replay salvo para sempre!",
    mediaUrl: "https://www.youtube.com/watch?v=XXXXX", // Substituir pelo link real
    mediaType: "VIDEO" as const,
    matchDate: "2024-01-20",
    kills: 22,
    placement: "#1 Victory Royale",
    isHighlight: true,
  },
];

// Estatísticas do duo
const duoStats = {
  totalWins: 47,
  totalKills: 892,
  avgKillsPerMatch: 8.5,
  winStreak: 5,
  favoriteWeapon: "Pump Shotgun",
  playingSince: "Agosto 2023",
};

export default function DuoZonePage() {
  const [memories, setMemories] = useState(mockMemories);
  const highlightVideo = memories.find(m => m.isHighlight && m.mediaType === "VIDEO");
  const regularMemories = memories.filter(m => !m.isHighlight);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Estilo Fortnite */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 mb-4">
          <Gamepad2 className="w-5 h-5 text-[var(--color-primary)]" />
          <span className="text-[var(--color-primary)] font-medium">Área Exclusiva</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] mb-4">
          Duo <span className="text-gradient-gold">Zone</span>
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
          Nossas memórias épicas do Fortnite. Cada vitória conta uma história! 🎮
        </p>
      </motion.div>

      {/* Stats Grid - Estilo Career do Fortnite */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
      >
        {[
          { icon: Trophy, label: "Vitórias", value: duoStats.totalWins, color: "text-yellow-500" },
          { icon: Target, label: "Eliminations", value: duoStats.totalKills, color: "text-red-500" },
          { icon: Crown, label: "Win Streak", value: duoStats.winStreak, color: "text-purple-500" },
          { icon: Sparkles, label: "Média K/D", value: duoStats.avgKillsPerMatch, color: "text-blue-500" },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.label} 
              className="text-center py-4 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-accent-soft)]"
            >
              <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">
                {stat.label}
              </div>
            </Card>
          );
        })}
      </motion.div>

      {/* Highlight Video - A Melhor Partida */}
      {highlightVideo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-6 h-6 text-[var(--color-primary)]" />
            <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]">
              Nossa Melhor Partida
            </h2>
          </div>
          
          <Card className="overflow-hidden border-2 border-[var(--color-primary)]/30 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-primary)]/5">
            {/* Video Placeholder - Em produção, usar YouTube embed */}
            <div className="aspect-video bg-[var(--color-secondary)] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-[var(--color-primary)] flex items-center justify-center mb-4 cursor-pointer hover:scale-110 transition-transform animate-pulse-gold">
                  <Play className="w-8 h-8 text-[var(--color-secondary)] ml-1" />
                </div>
                <p className="text-[var(--color-accent)] font-medium">
                  Clique para assistir o replay
                </p>
              </div>
              {/* Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--color-primary)] text-[var(--color-secondary)] text-sm font-bold rounded-full flex items-center gap-2">
                <Trophy size={14} />
                22 Kills
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                {highlightVideo.title}
              </h3>
              <p className="text-[var(--color-text-muted)] mb-4">
                {highlightVideo.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(highlightVideo.matchDate).toLocaleDateString("pt-BR")}
                </span>
                <span className="text-[var(--color-primary)] font-medium">
                  {highlightVideo.placement}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Hall da Fama - Grid de Memórias */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-[var(--color-primary)]" />
            <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]">
              Hall da Fama
            </h2>
          </div>
          <Button variant="secondary" size="sm">
            <Plus size={16} className="mr-2" />
            Adicionar Memória
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Card hover className="overflow-hidden group">
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)] relative">
                  {/* Kill badge */}
                  {memory.kills && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded flex items-center gap-1">
                      <Target size={12} />
                      {memory.kills}
                    </div>
                  )}
                  {/* Victory badge */}
                  <div className="absolute bottom-3 left-3 px-2 py-1 bg-[var(--color-primary)] text-[var(--color-secondary)] text-xs font-bold rounded">
                    {memory.placement}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                    {memory.title}
                  </h3>
                  {memory.description && (
                    <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-3">
                      {memory.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                    <Calendar size={12} />
                    {new Date(memory.matchDate).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Add New Memory Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="aspect-auto min-h-[280px] flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/10 transition-colors">
                <Upload className="w-6 h-6 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
              </div>
              <p className="text-[var(--color-text-muted)] font-medium group-hover:text-[var(--color-primary)] transition-colors">
                Adicionar Print
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Clique ou arraste
              </p>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Easter Egg - Link para o Presente */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-16 text-center"
      >
        <Link href="/duo/presente">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[var(--color-primary)]/10 to-purple-500/10 border border-[var(--color-primary)]/30 hover:border-[var(--color-primary)] transition-all cursor-pointer group animate-pulse-gold">
            <div className="text-3xl">🎁</div>
            <div className="text-left">
              <p className="text-[var(--color-primary)] font-semibold group-hover:underline">
                Tem uma surpresa esperando por você...
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Clique aqui para descobrir!
              </p>
            </div>
            <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Trophy,
  Gamepad2,
  Upload,
  Target,
  Sparkles,
  Plus,
  Crown
} from "lucide-react";
import { Button, Card } from "@/components/ui";

// Mock data - será substituído por dados do banco
const mockMemories = [
  {
    id: "1",
    title: "Modo Trocação - Duo - 1",
    mediaUrl: "/placeholder.jpg",
    mediaType: "IMAGE" as const,
    placement: "#1 Victory Royale",
  },
  {
    id: "2",
    title: "Modo Trocação - Duo - 2",
    mediaUrl: "/placeholder.jpg",
    mediaType: "IMAGE" as const,
    placement: "#2 Victory Royale",
  },
];

export default function DuoZonePage() {
  const [memories, setMemories] = useState(mockMemories);
  const [fortniteStats, setFortniteStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const regularMemories = memories;

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/fortnite-stats");
        if (response.ok) {
          const data = await response.json();
          setFortniteStats(data.stats);
        }
      } catch (error) {
        console.error("Erro ao buscar stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

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
        <p className="text-[var(--color-text-muted)] text-center">
          Estatísticas do Fortnite da DehMarka! 🎮
        </p>
      </motion.div>

      {/* Stats Grid - 6 cards em 2x3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
      >
        {[
          {
            icon: Crown,
            label: "Level",
            value: "215",
            color: "text-cyan-500"
          },
          {
            icon: Trophy,
            label: "Victory Royales",
            value: loading ? "..." : (fortniteStats?.wins || 0).toLocaleString(),
            color: "text-yellow-500"
          },
          {
            icon: Sparkles,
            label: "Win Rate",
            value: loading ? "..." : `${(fortniteStats?.winRate || 0).toFixed(1)}%`,
            color: "text-green-500"
          },
          {
            icon: Gamepad2,
            label: "Partidas",
            value: loading ? "..." : (fortniteStats?.matches || 0).toLocaleString(),
            color: "text-purple-500"
          },
          {
            icon: Target,
            label: "K/D Ratio",
            value: loading ? "..." : (fortniteStats?.kd || 0).toFixed(2),
            color: "text-blue-500"
          },
          {
            icon: Target,
            label: "Total Kills",
            value: loading ? "..." : (fortniteStats?.kills || 0).toLocaleString(),
            color: "text-red-500"
          },
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

      {/* Stats Detalhados */}
      {fortniteStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
        </motion.div>
      )}

      {/* Victory Royales - Grid de Memórias */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-[var(--color-primary)]" />
            <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]">
              Nossas Vitórias
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
                  {/* Victory badge */}
                  <div className="absolute bottom-3 left-3 px-2 py-1 bg-[var(--color-primary)] text-[var(--color-secondary)] text-xs font-bold rounded">
                    {memory.placement}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                    {memory.title}
                  </h4>
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

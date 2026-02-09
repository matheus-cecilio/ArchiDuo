"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FolderKanban,
  Palette,
  Gamepad2,
  Gift,
  ArrowUpRight,
  TrendingUp,
  Trophy,
  Target,
  Zap
} from "lucide-react";
import { Card } from "@/components/ui";

const quickActions = [
  {
    title: "Aparência do Site",
    description: "Customize cores, fontes e textos",
    href: "/admin/aparencia",
    icon: Palette,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Duo Zone",
    description: "Veja nossas memórias do Fortnite",
    href: "/duo",
    icon: Gamepad2,
    color: "bg-green-500/10 text-green-500",
    highlight: true,
  },
  {
    title: "Presente Surpresa",
    description: "Tem algo especial esperando por você...",
    href: "/duo/presente",
    icon: Gift,
    color: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
    highlight: true,
  },
];

export default function DashboardPage() {
  const [fortniteStats, setFortniteStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const stats = [
    {
      label: "Victory Royales",
      value: loading ? "..." : (fortniteStats?.wins || 0).toLocaleString(),
      icon: Trophy,
      color: "text-yellow-500"
    },
    {
      label: "Total Kills",
      value: loading ? "..." : (fortniteStats?.kills || 0).toLocaleString(),
      icon: Target,
      color: "text-red-500"
    },
    {
      label: "Partidas",
      value: loading ? "..." : (fortniteStats?.matches || 0).toLocaleString(),
      icon: Gamepad2,
      color: "text-purple-500"
    },
    {
      label: "K/D Ratio",
      value: loading ? "..." : (fortniteStats?.kd || 0).toFixed(2),
      icon: Zap,
      color: "text-blue-500"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Link href={action.href}>
                  <Card
                    hover
                    className={`relative overflow-hidden ${action.highlight ? "border-[var(--color-primary)]/30" : ""}`}
                  >
                    {action.highlight && (
                      <div className="absolute top-0 right-0 px-3 py-1 bg-[var(--color-primary)] text-[var(--color-secondary)] text-xs font-medium rounded-bl-lg">
                        Especial ✨
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                          {action.title}
                          <ArrowUpRight size={16} className="text-[var(--color-text-muted)]" />
                        </h3>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

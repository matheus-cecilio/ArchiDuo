"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FolderKanban, 
  Palette, 
  Gamepad2, 
  Gift, 
  ArrowUpRight,
  TrendingUp,
  Eye,
  Image as ImageIcon
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

const quickActions = [
  {
    title: "Gerenciar Projetos",
    description: "Adicione, edite ou remova projetos do portfólio",
    href: "/admin/projetos",
    icon: FolderKanban,
    color: "bg-blue-500/10 text-blue-500",
  },
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

const stats = [
  { label: "Projetos", value: "0", icon: FolderKanban },
  { label: "Imagens", value: "0", icon: ImageIcon },
  { label: "Vitórias Duo", value: "0", icon: Gamepad2 },
  { label: "Visualizações", value: "0", icon: Eye },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]">
          Dashboard
        </h1>
        <p className="text-[var(--color-text-muted)] mt-2">
          Bem-vindo(a) de volta! Gerencie seu site por aqui.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--color-text-muted)] text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Icon size={20} className="text-[var(--color-primary)]" />
                </div>
              </div>
            </Card>
          );
        })}
      </motion.div>

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

      {/* Recent Activity Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
          Atividade Recente
        </h2>
        <Card className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center">
            <TrendingUp size={28} className="text-[var(--color-text-muted)]" />
          </div>
          <p className="text-[var(--color-text-muted)]">
            Nenhuma atividade recente
          </p>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">
            Adicione projetos ou memórias para ver o histórico aqui.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}

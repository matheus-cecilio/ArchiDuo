"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Settings, Image, FolderOpen } from "lucide-react";

export default function AdminPage() {
    const router = useRouter();

    const adminSections = [
        {
            title: "Aparência",
            description: "Personalize cores, fontes e estilo do site",
            icon: Settings,
            href: "/admin/aparencia",
            color: "from-purple-500 to-pink-500",
        },
        {
            title: "Projetos",
            description: "Gerencie portfólio de projetos",
            icon: FolderOpen,
            href: "/admin/projetos",
            color: "from-blue-500 to-cyan-500",
        },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-secondary)] p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] mb-4">
                        Painel Administrativo
                    </h1>
                    <p className="text-[var(--color-text-muted)]">
                        Gerencie o conteúdo e aparência do site
                    </p>
                </motion.div>

                {/* Admin Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {adminSections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => router.push(section.href)}
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 hover:border-[var(--color-primary)] transition-all duration-300">
                                {/* Gradient Background */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                />

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <section.icon className="w-8 h-8 text-[var(--color-primary)]" />
                                    </div>

                                    <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] mb-3">
                                        {section.title}
                                    </h3>

                                    <p className="text-[var(--color-text-muted)] mb-6">
                                        {section.description}
                                    </p>

                                    <div className="flex items-center text-[var(--color-primary)] font-medium group-hover:translate-x-2 transition-transform duration-300">
                                        Acessar
                                        <svg
                                            className="w-5 h-5 ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

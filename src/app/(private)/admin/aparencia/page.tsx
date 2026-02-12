"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw, Eye, Loader2, Sparkles, Check } from "lucide-react";
import { Button, Input, Card, ConfirmationModal } from "@/components/ui";
import { useTheme } from "@/providers/ThemeProvider";
import {
    SiteSettings,
    defaultSettings,
    fontOptions,
    FONTS_URLS,
    colorPresets
} from "@/config/theme";
import { calculateDerivedColors, getContrastYIQ } from "@/lib/theme-utils";

export default function AparenciaPage() {
    const { refreshSettings } = useTheme();
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [hasChanges, setHasChanges] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    // Carregar configurações salvas
    useEffect(() => {
        async function fetchSettings() {
            try {
                const response = await fetch("/api/site-settings");
                if (response.ok) {
                    const data = await response.json();
                    // Merge com default para garantir que campos novos não quebrem
                    setSettings({ ...defaultSettings, ...data.settings });
                }
            } catch (error) {
                console.error("Erro ao carregar configurações:", error);
            } finally {
                setIsFetching(false);
            }
        }

        fetchSettings();
    }, []);

    // Carregar fonte dinamicamente para o preview
    useEffect(() => {
        const url = FONTS_URLS[settings.fontFamily];
        if (url) {
            let link = document.getElementById("preview-font-loader") as HTMLLinkElement;
            if (!link) {
                link = document.createElement("link");
                link.id = "preview-font-loader";
                link.rel = "stylesheet";
                document.head.appendChild(link);
            }
            if (link.href !== url) {
                link.href = url;
            }
        }
    }, [settings.fontFamily]);

    const derivedColors = calculateDerivedColors(settings.primaryColor);

    const updateSetting = <K extends keyof SiteSettings>(
        key: K,
        value: SiteSettings[K]
    ) => {
        setSettings({ ...settings, [key]: value });
        setHasChanges(true);
    };

    const handleSave = async () => {
        setIsLoading(true);

        try {
            const response = await fetch("/api/site-settings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(settings),
            });

            if (response.ok) {
                setHasChanges(false);
                // Atualizar o tema global
                await refreshSettings();
                alert("Configurações salvas com sucesso! 🎨");
            } else {
                alert("Erro ao salvar configurações. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar configurações. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = async () => {
        setIsResetting(true);

        try {
            const response = await fetch("/api/site-settings", {
                method: "POST",
            });

            if (response.ok) {
                const data = await response.json();
                setSettings(data.settings);
                setHasChanges(false);
                setShowResetModal(false);
                // Atualizar o tema global
                await refreshSettings();
                alert("Configurações restauradas! 🔄");
            } else {
                alert("Erro ao restaurar configurações.");
            }
        } catch (error) {
            console.error("Erro ao restaurar:", error);
            alert("Erro ao restaurar configurações.");
        } finally {
            setIsResetting(false);
        }
    };

    const ColorSwatch = ({ color, selected, onClick }: { color: string, selected: boolean, onClick: () => void }) => (
        <button
            type="button"
            onClick={onClick}
            className={`w-6 h-6 rounded-full border border-gray-200 shadow-sm flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${selected ? 'ring-2 ring-[var(--color-primary)] ring-offset-1' : ''}`}
            style={{ backgroundColor: color }}
            title={color}
        >
            {selected && <Check size={12} className={getContrastYIQ(color) === 'black' ? 'text-black' : 'text-white'} />}
        </button>
    );

    // Helper para renderizar o título com formatação rica se for o texto padrão
    const renderHeroTitle = (title: string) => {
        const defaultTitle = "Transformando Espaços em Experiências";

        if (title === defaultTitle) {
            return (
                <>
                    <span className="text-[var(--color-accent)]/90 block sm:inline mr-2">Transformando</span>
                    <span className="text-gradient-primary block sm:inline">Espaços</span>
                    <br className="hidden sm:block" />
                    <span className="text-[var(--color-accent)]/90 block sm:inline mr-2">em</span>
                    <span className="text-gradient-primary block sm:inline">Experiências</span>
                </>
            );
        }

        return <span className="text-[var(--color-accent)]">{title}</span>;
    };

    if (isFetching) {
        return (
            <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)] mx-auto mb-4" />
                    <p className="text-[var(--color-text-muted)]">Carregando configurações...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-between mb-8"
            >

                <div>
                    <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]">
                        Aparência do Site
                    </h1>
                    <p className="text-[var(--color-text-muted)] mt-1">
                        Personalize as cores, fontes e textos do seu site
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => setShowResetModal(true)}
                        className="border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)]/50"
                    >
                        <RotateCcw size={18} className="mr-2" />
                        Restaurar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        isLoading={isLoading}
                        disabled={!hasChanges}
                        className="shadow-lg shadow-[var(--color-primary)]/20"
                    >
                        <Save size={18} className="mr-2" />
                        Salvar Alterações
                    </Button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="space-y-6"
                >
                    {/* Colors */}
                    <Card>
                        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">
                            Cores do Tema
                        </h2>

                        <div className="space-y-6">
                            {/* Primary Color */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2 mt-6">
                                    Cor Primária (Destaques e Botões)
                                </label>
                                <div className="flex gap-3 mb-3">
                                    <input
                                        type="color"
                                        value={settings.primaryColor}
                                        onChange={(e) => updateSetting("primaryColor", e.target.value)}
                                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-[var(--color-border)] p-1 bg-transparent"
                                    />
                                    <Input
                                        value={settings.primaryColor}
                                        onChange={(e) => updateSetting("primaryColor", e.target.value)}
                                        className="flex-1 font-mono uppercase"
                                        maxLength={7}
                                    />
                                </div>

                                {/* Paleta Primária */}
                                <div className="flex flex-wrap gap-2">
                                    {colorPresets.primary.map((color) => (
                                        <ColorSwatch
                                            key={color}
                                            color={color}
                                            selected={settings.primaryColor.toLowerCase() === color.toLowerCase()}
                                            onClick={() => updateSetting("primaryColor", color)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Secondary Color */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                                    Cor Secundária (Fundo Escuro)
                                </label>
                                <div className="flex gap-3 mb-3">
                                    <input
                                        type="color"
                                        value={settings.secondaryColor}
                                        onChange={(e) => updateSetting("secondaryColor", e.target.value)}
                                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-[var(--color-border)] p-1 bg-transparent"
                                    />
                                    <Input
                                        value={settings.secondaryColor}
                                        onChange={(e) => updateSetting("secondaryColor", e.target.value)}
                                        className="flex-1 font-mono uppercase"
                                        maxLength={7}
                                    />
                                </div>

                                {/* Paleta Secundária */}
                                <div className="flex flex-wrap gap-2">
                                    {colorPresets.secondary.map((color) => (
                                        <ColorSwatch
                                            key={color}
                                            color={color}
                                            selected={settings.secondaryColor.toLowerCase() === color.toLowerCase()}
                                            onClick={() => updateSetting("secondaryColor", color)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Accent Color */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                                    Cor de Texto/Contraste (Clara)
                                </label>
                                <div className="flex gap-3 mb-3">
                                    <input
                                        type="color"
                                        value={settings.accentColor}
                                        onChange={(e) => updateSetting("accentColor", e.target.value)}
                                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-[var(--color-border)] p-1 bg-transparent"
                                    />
                                    <Input
                                        value={settings.accentColor}
                                        onChange={(e) => updateSetting("accentColor", e.target.value)}
                                        className="flex-1 font-mono uppercase"
                                        maxLength={7}
                                    />
                                </div>

                                {/* Paleta Accent */}
                                <div className="flex flex-wrap gap-2">
                                    {colorPresets.accent.map((color) => (
                                        <ColorSwatch
                                            key={color}
                                            color={color}
                                            selected={settings.accentColor.toLowerCase() === color.toLowerCase()}
                                            onClick={() => updateSetting("accentColor", color)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Typography */}
                    <Card>
                        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">
                            Tipografia
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2 mt-6">
                                Fonte dos Títulos
                            </label>
                            <select
                                value={settings.fontFamily}
                                onChange={(e) => updateSetting("fontFamily", e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            >
                                {fontOptions.map((font) => (
                                    <option key={font.value} value={font.value}>
                                        {font.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Card>

                    {/* Hero Section */}
                    <Card>
                        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">
                            Textos do Hero
                        </h2>

                        <div className="space-y-5 mt-6">
                            <Input
                                label="Nome do Site"
                                value={settings.siteName}
                                onChange={(e) => updateSetting("siteName", e.target.value)}
                            />
                            <Input
                                label="Título Principal"
                                value={settings.heroTitle}
                                onChange={(e) => updateSetting("heroTitle", e.target.value)}
                            />
                            <Input
                                label="Subtítulo"
                                value={settings.heroSubtitle}
                                onChange={(e) => updateSetting("heroSubtitle", e.target.value)}
                            />
                        </div>
                    </Card>
                </motion.div>

                {/* Preview Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className="sticky top-24 overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                                Preview em Tempo Real
                            </h2>
                            <a
                                href="/"
                                target="_blank"
                                className="text-sm text-[var(--color-primary)] flex items-center gap-1 hover:underline"
                            >
                                <Eye size={16} />
                                Ver site
                            </a>
                        </div>

                        {/* Scaled Preview of the Real Site */}
                        <div
                            className="rounded-xl overflow-hidden border border-[var(--color-border)] relative shadow-lg group aspect-video bg-[var(--color-surface)]"
                        >
                            <div
                                className="w-[286%] h-[286%] origin-top-left transform scale-[0.35] bg-[var(--color-secondary)] text-[var(--color-text-primary)]"
                                style={{
                                    '--color-primary': settings.primaryColor,
                                    '--color-secondary': settings.secondaryColor,
                                    '--color-accent': settings.accentColor,
                                    '--font-playfair': `'${settings.fontFamily}', serif`,
                                    '--color-primary-light': derivedColors.light,
                                    '--color-primary-dark': derivedColors.dark,
                                    '--color-primary-softer': derivedColors.softer,
                                    '--color-primary-highlight': derivedColors.highlight,
                                    '--color-surface': settings.accentColor, // Base surface color
                                } as React.CSSProperties}
                            >
                                {/* Navbar Simulada (Baseada na real) */}
                                <div className="absolute top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="text-xl font-bold tracking-tight"
                                            style={{ fontFamily: `'${settings.fontFamily}', serif` }}
                                        >
                                            <span className="text-gradient-primary">Archi</span>
                                            <span className="text-gradient-primary">Duo</span>
                                        </span>
                                    </div>
                                    <div className="hidden md:flex items-center gap-8">
                                        {['Home', 'Sobre', 'Contato', 'Login'].map((link) => (
                                            <span key={link} className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-primary)] opacity-80 transition-colors cursor-pointer">
                                                {link}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Hero Section (Cópia da Home Page) */}
                                <div className="relative h-full flex items-center justify-center text-center px-4">
                                    {/* Linha de acento no topo (igual a home) */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />

                                    <div className="max-w-4xl mx-auto">
                                        {/* Badge */}
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-[var(--color-accent)]/5 backdrop-blur-sm border border-[var(--color-primary)]/20 mx-auto">
                                            <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
                                            <span className="text-sm text-[var(--color-primary)]">
                                                {settings.siteName}
                                            </span>
                                        </div>

                                        {/* Main Title */}
                                        <h1
                                            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                                            style={{ fontFamily: `'${settings.fontFamily}', serif` }}
                                        >
                                            {renderHeroTitle(settings.heroTitle)}
                                        </h1>

                                        {/* Subtitle */}
                                        <p className="text-base md:text-lg text-[var(--color-accent)]/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                                            {settings.heroSubtitle || "Criamos projetos arquitetônicos únicos que unem funcionalidade, estética e a essência de cada cliente."}
                                        </p>

                                        {/* CTAs */}
                                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
                                            <div className="px-8 py-3 rounded-md font-medium text-sm transition-all shadow-lg hover:brightness-110 active:scale-[0.98]"
                                                style={{ backgroundColor: settings.primaryColor, color: settings.secondaryColor }}>
                                                Fale Conosco
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Section (Rodapé) */}
                                <div className="absolute bottom-0 left-0 right-0 py-4 bg-[var(--color-surface)] border-t border-[var(--color-primary)]/10">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        {[
                                            { num: "5+", label: "Projetos" },
                                            { num: "8", label: "Anos" },
                                            { num: "100%", label: "Clientes" }
                                        ].map((stat) => (
                                            <div key={stat.label}>
                                                <div
                                                    className="text-2xl font-bold text-gradient-primary"
                                                    style={{ fontFamily: `'${settings.fontFamily}', serif` }}
                                                >
                                                    {stat.num}
                                                </div>
                                                <div className="text-xs text-[var(--color-accent)]/60 uppercase tracking-widest mt-1">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-[var(--color-text-muted)] text-center pt-6 block">
                            Preview aproximado. Salve para ver o resultado final no site.
                        </p>
                    </Card>
                </motion.div>
            </div>

            {/* Modal de Confirmação para Restaurar */}
            <ConfirmationModal
                open={showResetModal}
                onClose={() => setShowResetModal(false)}
                onConfirm={handleReset}
                title="Restaurar Configurações"
                message="Tem certeza que deseja restaurar as configurações padrão? Todas as personalizações serão perdidas."
                confirmText="Restaurar"
                variant="warning"
                isLoading={isResetting}
            />
        </div>
    );
}

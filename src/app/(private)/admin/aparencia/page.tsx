"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw, Eye, Loader2, Sparkles, Check } from "lucide-react";
import { Button, Input, Card, ConfirmationModal } from "@/components/ui";
import { useTheme, SiteSettings } from "@/providers/ThemeProvider";

const fontOptions = [
    { label: "Playfair Display", value: "Playfair Display" },
    { label: "Cormorant Garamond", value: "Cormorant Garamond" },
    { label: "Libre Baskerville", value: "Libre Baskerville" },
    { label: "Merriweather", value: "Merriweather" },
    { label: "Lora", value: "Lora" },
    { label: "Montserrat", value: "Montserrat" },
    { label: "Open Sans", value: "Open Sans" },
];

const colorPresets = {
    primary: [
        "#D4AF37", // Dourado Original
        "#EAB308", // Amarelo
        "#F97316", // Laranja
        "#EF4444", // Vermelho
        "#DB2777", // Rosa
        "#8B5CF6", // Roxo
        "#2563EB", // Azul Real
        "#0EA5E9", // Azul Céu
        "#10B981", // Verde Esmeralda
        "#84CC16", // Verde Lima
    ],
    secondary: [
        "#0A0A0A", // Preto Original
        "#171717", // Neutral 900
        "#1F2937", // Gray 800
        "#1E1B4B", // Indigo 950
        "#312E81", // Indigo 900
        "#14532D", // Green 900
        "#450A0A", // Red 900
        "#271C19", // Marrom
    ],
    accent: [
        "#FAFAFA", // Branco Original
        "#F3F4F6", // Gray 100
        "#E5E7EB", // Gray 200
        "#FFF7ED", // Orange 50 (Creme)
        "#FEF2F2", // Red 50
        "#F0F9FF", // Sky 50
        "#F5F3FF", // Violet 50
    ]
};

// Valores padrão alinhados com o site real
const defaultSettings: SiteSettings = {
    primaryColor: "#D4AF37",
    secondaryColor: "#0A0A0A",
    accentColor: "#FAFAFA",
    fontFamily: "Playfair Display",
    heroTitle: "Transformando Espaços em Experiências",
    heroSubtitle: "Criamos projetos arquitetônicos únicos que unem funcionalidade, estética e a essência de cada cliente.",
    siteName: "ArchiDuo",
};

export default function AparenciaPage() {
    const { settings: savedSettings, refreshSettings, isLoading: isLoadingTheme } = useTheme();
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

    // Helper para decidir cor do ícone de check (preto ou branco) baseado no fundo
    const getContrastYIQ = (hexcolor: string) => {
        hexcolor = hexcolor.replace("#", "");
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

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
                    <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]">
                        Aparência do Site
                    </h1>
                    <p className="text-[var(--color-text-muted)] mt-1">
                        Personalize as cores, fontes e textos do seu site
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="ghost" onClick={() => setShowResetModal(true)}>
                        <RotateCcw size={18} className="mr-2" />
                        Restaurar
                    </Button>
                    <Button
                        onClick={handleSave}
                        isLoading={isLoading}
                        disabled={!hasChanges}
                    >
                        <Save size={18} className="mr-2" />
                        Salvar
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
                                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
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
                            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
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
                            Seção Hero
                        </h2>

                        <div className="space-y-5">
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

                        {/* Miniatura do Site Real */}
                        <div
                            className="rounded-xl overflow-hidden border border-[var(--color-border)] relative shadow-lg group"
                            style={{
                                backgroundColor: settings.secondaryColor,
                                color: settings.accentColor,
                                fontFamily: 'var(--font-inter)',
                            } as React.CSSProperties}
                        >
                            {/* Navbar Simulada */}
                            <div
                                className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center z-20"
                            >
                                <span className="font-bold" style={{ fontSize: '10px', fontFamily: settings.fontFamily, color: settings.primaryColor }}>
                                    {settings.siteName}
                                </span>
                                <div className="flex gap-2">
                                    {['Home', 'Sobre', 'Contato', 'Login'].map((link) => (
                                        <span key={link} className="font-medium opacity-80 cursor-pointer hover:text-[var(--color-primary)] transition-colors" style={{ fontSize: '6px', color: settings.accentColor }}>
                                            {link}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hero Section Miniatura */}
                            <div className="relative aspect-video flex items-center justify-center p-4 text-center overflow-hidden">

                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-5"
                                    style={{
                                        backgroundImage: `radial-gradient(circle, ${settings.accentColor} 0.5px, transparent 0.5px)`,
                                        backgroundSize: '16px 16px'
                                    }}
                                />

                                {/* Linhas decorativas (Bordas superior/inferior) */}
                                <div className="absolute top-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-20" style={{ backgroundColor: settings.primaryColor }} />
                                <div className="absolute bottom-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-20" style={{ backgroundColor: settings.primaryColor }} />

                                <div className="relative z-10 flex flex-col items-center max-w-[95%]">
                                    {/* Badge - Sem borda visível, apenas padding */}
                                    <div className="flex items-center gap-1 mb-2 px-1.5 py-0.5 rounded-full">
                                        <Sparkles size={8} style={{ color: settings.primaryColor }} />
                                        <span style={{ fontSize: '8px', color: settings.primaryColor }}>
                                            Arquitetura & Design de Interiores
                                        </span>
                                    </div>

                                    {/* Título com cores alternadas e quebra de linha inteligente */}
                                    <div
                                        className="font-bold mb-2 leading-tight"
                                        style={{ fontSize: '16px', fontFamily: settings.fontFamily }}
                                    >
                                        {/* Renderiza o título tentando simular a estrutura do site real */}
                                        {settings.heroTitle.split(' ').map((word, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    color: index % 2 === 0 ? settings.accentColor : settings.primaryColor,
                                                    display: 'inline-block',
                                                    marginRight: '3px'
                                                }}
                                            >
                                                {word}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Subtítulo */}
                                    <p
                                        className="mb-3 leading-relaxed opacity-60 max-w-[200px]"
                                        style={{ fontSize: '7px', color: settings.accentColor }}
                                    >
                                        {settings.heroSubtitle}
                                    </p>

                                    {/* Botão */}
                                    <div
                                        className="px-4 py-1.5 rounded-[3px] font-bold tracking-wide shadow-sm transform transition-transform group-hover:scale-105"
                                        style={{
                                            fontSize: '7px',
                                            backgroundColor: settings.primaryColor,
                                            color: settings.secondaryColor
                                        }}
                                    >
                                        Fale Conosco
                                    </div>
                                </div>
                            </div>

                            {/* Stats Section (Rodapé Branco) */}
                            <div
                                className="py-2 px-4 grid grid-cols-3 gap-1 text-center"
                                style={{ backgroundColor: settings.accentColor }}
                            >
                                {[
                                    { num: "5+", label: "Projetos" },
                                    { num: "8", label: "Anos" },
                                    { num: "100%", label: "Clientes" }
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <div
                                            className="font-bold mb-[2px]"
                                            style={{
                                                fontSize: '12px',
                                                color: settings.primaryColor,
                                                fontFamily: settings.fontFamily
                                            }}
                                        >
                                            {stat.num}
                                        </div>
                                        <div
                                            className="uppercase tracking-wide font-medium leading-none"
                                            style={{ fontSize: '5px', color: settings.secondaryColor, opacity: 0.6 }}
                                        >
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="text-xs text-[var(--color-text-muted)] text-center mt-4">
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

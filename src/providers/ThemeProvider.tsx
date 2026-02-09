"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface SiteSettings {
    id?: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    heroTitle: string;
    heroSubtitle: string;
    siteName: string;
}

const defaultSettings: SiteSettings = {
    primaryColor: "#D4AF37",
    secondaryColor: "#0A0A0A",
    accentColor: "#FAFAFA",
    fontFamily: "Playfair Display",
    heroTitle: "Arquitetura & Design",
    heroSubtitle: "Transformando espaços em experiências",
    siteName: "ArchiDuo",
};

interface ThemeContextType {
    settings: SiteSettings;
    isLoading: boolean;
    refreshSettings: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
    settings: defaultSettings,
    isLoading: true,
    refreshSettings: async () => { },
});

export function useTheme() {
    return useContext(ThemeContext);
}

// Função para calcular cores derivadas com base na cor primária
function calculateDerivedColors(primaryColor: string) {
    // Converter hex para HSL para manipular luminosidade
    const hex = primaryColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    // Criar variações
    const hslToHex = (h: number, s: number, l: number) => {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        const toHex = (x: number) => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    return {
        light: hslToHex(h, s, Math.min(l + 0.15, 0.95)),
        dark: hslToHex(h, s, Math.max(l - 0.1, 0.2)),
        softer: hslToHex(h, Math.max(s - 0.2, 0), Math.min(l + 0.25, 0.9)),
    };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const response = await fetch("/api/site-settings");
            if (response.ok) {
                const data = await response.json();
                setSettings(data.settings);
            }
        } catch (error) {
            console.error("Erro ao carregar configurações do tema:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshSettings = async () => {
        await fetchSettings();
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    // Aplicar CSS variables quando as configurações mudarem
    useEffect(() => {
        if (typeof window !== "undefined") {
            const root = document.documentElement;

            // Calcular cores derivadas
            const derived = calculateDerivedColors(settings.primaryColor);

            // Cores primárias
            root.style.setProperty("--color-primary", settings.primaryColor);
            root.style.setProperty("--color-primary-light", derived.light);
            root.style.setProperty("--color-primary-dark", derived.dark);
            root.style.setProperty("--color-primary-softer", derived.softer);

            // Cores secundárias
            root.style.setProperty("--color-secondary", settings.secondaryColor);
            root.style.setProperty("--color-secondary-light", `${settings.secondaryColor}20`);

            // Cores de destaque
            root.style.setProperty("--color-accent", settings.accentColor);
            root.style.setProperty("--color-accent-soft", `${settings.accentColor}ee`);

            // Background e surface (baseado no accent)
            root.style.setProperty("--color-background", settings.accentColor);
        }
    }, [settings]);

    return (
        <ThemeContext.Provider value={{ settings, isLoading, refreshSettings }}>
            {children}
        </ThemeContext.Provider>
    );
}

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { SiteSettings, defaultSettings, FONTS_URLS } from "@/config/theme";
import { calculateDerivedColors } from "@/lib/theme-utils";

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
            root.style.setProperty("--color-primary-highlight", derived.highlight);

            // Cores secundárias
            root.style.setProperty("--color-secondary", settings.secondaryColor);
            root.style.setProperty("--color-secondary-light", `${settings.secondaryColor}20`);

            // Cores de destaque
            root.style.setProperty("--color-accent", settings.accentColor);
            root.style.setProperty("--color-accent-soft", `${settings.accentColor}ee`);

            // Background e surface (baseado no accent)
            root.style.setProperty("--color-background", settings.accentColor);

            // Fontes Dinâmicas - Carregar e Aplicar
            const fontName = settings.fontFamily;

            if (FONTS_URLS[fontName]) {
                // Carregar fonte via link tag
                const linkId = `dynamic-font-theme`;
                let link = document.getElementById(linkId) as HTMLLinkElement;
                if (!link) {
                    link = document.createElement("link");
                    link.id = linkId;
                    link.rel = "stylesheet";
                    document.head.appendChild(link);
                }
                if (link.href !== FONTS_URLS[fontName]) {
                    link.href = FONTS_URLS[fontName];
                }

                // Aplicar a fonte sobrescrevendo a variável do Next.js
                // Aplicamos apenas na fonte de títulos/destaques
                const fontValueMain = `'${fontName}', serif`;

                root.style.setProperty("--font-playfair", fontValueMain);

                if (document.body) {
                    document.body.style.setProperty("--font-playfair", fontValueMain);
                }
            }
        }
    }, [settings]);

    return (
        <ThemeContext.Provider value={{ settings, isLoading, refreshSettings }}>
            {children}
        </ThemeContext.Provider>
    );
}

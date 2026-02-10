
"use client";

import { useEffect } from "react";

// Lista de fontes suportadas e suas URLs no Google Fonts
const FONTS = {
    "Playfair Display": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap",
    "Cormorant Garamond": "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap",
    "Cinzel": "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap",
    "Lora": "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap",
    "Montserrat": "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
    "Raleway": "https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap",
    "Oswald": "https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap",
};

export function DynamicFontLoader({ font }: { font: string }) {
    useEffect(() => {
        if (!font || !FONTS[font as keyof typeof FONTS]) return;

        const fontUrl = FONTS[font as keyof typeof FONTS];
        const linkId = `dynamic-font-${font.replace(/\s+/g, "-").toLowerCase()}`;

        // Evitar carregar se já existir
        if (document.getElementById(linkId)) return;

        const link = document.createElement("link");
        link.id = linkId;
        link.href = fontUrl;
        link.rel = "stylesheet";
        document.head.appendChild(link);

        // Opcional: remover fontes não usadas para limpar o head? 
        // Por enquanto deixo acumular pois o usuário pode voltar para a anterior.

        return () => {
            // Cleanup? Talvez não precise remover imediatamente para evitar flash.
        };
    }, [font]);

    return null;
}

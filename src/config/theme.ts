export const FONTS_URLS: Record<string, string> = {
    "Inter": "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap",
    "Playfair Display": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap",
    "Cormorant Garamond": "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap",
    "Cinzel": "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap",
    "Lora": "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap",
    "Montserrat": "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
    "Raleway": "https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap",
    "Oswald": "https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap",
};

export const fontOptions = [
    { label: "Inter", value: "Inter" },
    { label: "Playfair Display", value: "Playfair Display" },
    { label: "Cormorant Garamond", value: "Cormorant Garamond" },
    { label: "Cinzel", value: "Cinzel" },
    { label: "Lora", value: "Lora" },
    { label: "Montserrat", value: "Montserrat" },
    { label: "Raleway", value: "Raleway" },
    { label: "Oswald", value: "Oswald" },
];

export const colorPresets = {
    primary: [
        "#D4AF37", // Gold
        "#B76E79", // Rose Gold
        "#C0C0C0", // Silver
        "#0F52BA", // Sapphire Blue
        "#50C878", // Emerald Green
        "#800020", // Bordeaux
        "#1A1A1B", // Dark Zinc
        "#E5C100", // Bright Gold
    ],
    secondary: [
        "#0A0A0A", // Jet Black
        "#171717", // Neutral 900
        "#1E1B4B", // Indigo 950
        "#064E3B", // Emerald 950
        "#450A0A", // Red 950
        "#141414", // Deep Gray
    ],
    accent: [
        "#FAFAFA", // Pure White
        "#F3F4F6", // Neutral Gray
        "#FFF7ED", // Cream/Almond
        "#FEFCE8", // Pale Gold
        "#F0F9FF", // Ice Blue
        "#FAF5FF", // Lavender Mist
    ]
};

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

export const defaultSettings: SiteSettings = {
    primaryColor: "#D4AF37",
    secondaryColor: "#0A0A0A",
    accentColor: "#FAFAFA",
    fontFamily: "Playfair Display",
    heroTitle: "Transformando Espaços em Experiências",
    heroSubtitle: "Criamos projetos arquitetônicos únicos que unem funcionalidade, estética e a essência de cada cliente.",
    siteName: "ArchiDuo",
};

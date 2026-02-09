import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetSettings() {
    console.log('Resetando configurações do site...');

    const defaultSettings = {
        primaryColor: "#D4AF37",
        secondaryColor: "#0A0A0A",
        accentColor: "#FAFAFA",
        fontFamily: "Playfair Display",
        heroTitle: "Transformando Espaços em Experiências",
        heroSubtitle: "Criamos projetos arquitetônicos únicos que unem funcionalidade, estética e a essência de cada cliente.",
        siteName: "ArchiDuo",
    };

    try {
        // Tenta encontrar o primeiro registro
        const existing = await prisma.siteSettings.findFirst();

        if (existing) {
            // Atualiza o existente
            await prisma.siteSettings.update({
                where: { id: existing.id },
                data: defaultSettings,
            });
            console.log('Configurações atualizadas para o padrão do site!');
        } else {
            // Cria novo se não existir
            await prisma.siteSettings.create({
                data: defaultSettings,
            });
            console.log('Configurações padrão criadas!');
        }
    } catch (error) {
        console.error('Erro ao resetar configurações:', error);
    } finally {
        await prisma.$disconnect();
    }
}

resetSettings();

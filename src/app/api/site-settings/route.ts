import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Configurações padrão
const defaultSettings = {
    primaryColor: "#D4AF37",
    secondaryColor: "#0A0A0A",
    accentColor: "#FAFAFA",
    fontFamily: "Playfair Display",
    heroTitle: "Arquitetura & Design",
    heroSubtitle: "Transformando espaços em experiências",
    siteName: "ArchiDuo",
};

// GET - Buscar configurações atuais
export async function GET() {
    try {
        // Buscar a primeira (e única) configuração do banco
        let settings = await prisma.siteSettings.findFirst();

        // Se não existir, criar com valores padrão
        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: defaultSettings,
            });
        }

        return NextResponse.json({ settings });
    } catch (error) {
        console.error("Erro ao buscar configurações:", error);
        return NextResponse.json(
            { error: "Erro ao buscar configurações" },
            { status: 500 }
        );
    }
}

// PUT - Atualizar configurações
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            primaryColor,
            secondaryColor,
            accentColor,
            fontFamily,
            heroTitle,
            heroSubtitle,
            siteName,
        } = body;

        // Buscar configuração existente
        let settings = await prisma.siteSettings.findFirst();

        if (settings) {
            // Atualizar existente
            settings = await prisma.siteSettings.update({
                where: { id: settings.id },
                data: {
                    primaryColor,
                    secondaryColor,
                    accentColor,
                    fontFamily,
                    heroTitle,
                    heroSubtitle,
                    siteName,
                },
            });
        } else {
            // Criar nova
            settings = await prisma.siteSettings.create({
                data: {
                    primaryColor,
                    secondaryColor,
                    accentColor,
                    fontFamily,
                    heroTitle,
                    heroSubtitle,
                    siteName,
                },
            });
        }

        return NextResponse.json({ settings });
    } catch (error) {
        console.error("Erro ao salvar configurações:", error);
        return NextResponse.json(
            { error: "Erro ao salvar configurações" },
            { status: 500 }
        );
    }
}

// POST - Restaurar configurações padrão
export async function POST() {
    try {
        let settings = await prisma.siteSettings.findFirst();

        if (settings) {
            settings = await prisma.siteSettings.update({
                where: { id: settings.id },
                data: defaultSettings,
            });
        } else {
            settings = await prisma.siteSettings.create({
                data: defaultSettings,
            });
        }

        return NextResponse.json({ settings, message: "Configurações restauradas!" });
    } catch (error) {
        console.error("Erro ao restaurar configurações:", error);
        return NextResponse.json(
            { error: "Erro ao restaurar configurações" },
            { status: 500 }
        );
    }
}

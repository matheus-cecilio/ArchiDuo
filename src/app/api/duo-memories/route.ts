import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Listar todas as memórias
export async function GET() {
    try {
        const memories = await prisma.duoMemory.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ memories });
    } catch (error) {
        console.error("Erro ao buscar memórias:", error);
        return NextResponse.json(
            { error: "Erro ao buscar memórias" },
            { status: 500 }
        );
    }
}

// POST - Criar nova memória
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, mediaUrl, placement, kills, matchDate } = body;

        if (!title || !mediaUrl) {
            return NextResponse.json(
                { error: "Título e imagem são obrigatórios" },
                { status: 400 }
            );
        }

        const memory = await prisma.duoMemory.create({
            data: {
                title,
                description,
                mediaUrl,
                mediaType: "IMAGE",
                placement,
                kills: kills ? parseInt(kills) : null,
                matchDate: matchDate ? new Date(matchDate) : new Date(),
            },
        });

        return NextResponse.json({ memory }, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar memória:", error);
        return NextResponse.json(
            { error: "Erro ao criar memória" },
            { status: 500 }
        );
    }
}

// DELETE - Deletar memória
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "ID da memória é obrigatório" },
                { status: 400 }
            );
        }

        await prisma.duoMemory.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erro ao deletar memória:", error);
        return NextResponse.json(
            { error: "Erro ao deletar memória" },
            { status: 500 }
        );
    }
}

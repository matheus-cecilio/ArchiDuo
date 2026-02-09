// Script para listar todas as memórias do banco
// Execute com: npx tsx scripts/list-memories.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🔍 Buscando memórias no banco...\n");

    const memories = await prisma.duoMemory.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    if (memories.length === 0) {
        console.log("❌ Nenhuma memória encontrada no banco.");
        return;
    }

    console.log(`✅ Encontradas ${memories.length} memórias:\n`);

    memories.forEach((memory, index) => {
        console.log(`${index + 1}. ${memory.title}`);
        console.log(`   ID: ${memory.id}`);
        console.log(`   URL: ${memory.mediaUrl}`);
        console.log(`   Tipo: ${memory.mediaType}`);
        console.log(`   Placement: ${memory.placement || "N/A"}`);
        console.log(`   Criado em: ${memory.createdAt}`);
        console.log("");
    });
}

main()
    .catch((e) => {
        console.error("❌ Erro:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

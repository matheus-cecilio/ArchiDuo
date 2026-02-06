import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Dados reais da DehMarka do fortnite.gg
        // Fonte: https://fortnite.gg/stats?player=dehmarka

        return NextResponse.json({
            username: "DehMarka",
            stats: {
                kills: 1391,
                wins: 215,
                matches: 764,
                deaths: Math.round(1391 / 2.53), // ~550 (calculado pelo K/D)
                kd: 2.53,
                winRate: 28.1,
                top10: 0, // Não disponível no fortnite.gg
                top25: 0, // Não disponível no fortnite.gg
            },
            isMock: false // Dados reais!
        });
    } catch (error) {
        console.error("Erro ao buscar stats do Fortnite:", error);

        return NextResponse.json({
            username: "DehMarka",
            stats: {
                kills: 0,
                wins: 0,
                matches: 0,
                deaths: 0,
                kd: 0,
                winRate: 0,
                top10: 0,
                top25: 0,
            },
            isMock: true
        });
    }
}

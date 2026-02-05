import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...\n");

  // Limpar dados existentes
  await prisma.gift.deleteMany();
  await prisma.duoMemory.deleteMany();
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️  Dados existentes removidos\n");

  // Criar usuários admin
  const passwordHash = await bcrypt.hash("SenhaSegura123!", 10);

  const matheus = await prisma.user.create({
    data: {
      name: "Matheus",
      email: "matheus@archiduo.com",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  const arquiteta = await prisma.user.create({
    data: {
      name: "Arquiteta",
      email: "arquiteta@archiduo.com",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  console.log("👥 Usuários criados:");
  console.log(`   - ${matheus.email}`);
  console.log(`   - ${arquiteta.email}\n`);

  // Criar configurações do site
  await prisma.siteSettings.create({
    data: {
      primaryColor: "#D4AF37",
      secondaryColor: "#0A0A0A",
      accentColor: "#FAFAFA",
      fontFamily: "Playfair Display",
      heroTitle: "Arquitetura & Design",
      heroSubtitle: "Transformando espaços em experiências únicas",
      siteName: "ArchiDuo",
    },
  });

  console.log("⚙️  Configurações do site criadas\n");

  // Criar memórias do Duo (Fortnite)
  const memory1 = await prisma.duoMemory.create({
    data: {
      title: "Nossa Melhor Partida! Modo Trocação 🏆",
      description: "A partida mais épica que jogamos juntos. 22 kills combinados e uma bela vitória!",
      mediaUrl: "https://www.youtube.com/watch?v=XXXXX",
      mediaType: "VIDEO",
      matchDate: new Date("2026-01-31"),
      kills: 22,
      placement: "#1 Victory Royale",
      isHighlight: true,
    },
  });

  const memory2 = await prisma.duoMemory.create({
    data: {
      title: "Blitz - 15 Kills",
      description: "Partida insana onde ganhamos com!",
      mediaUrl: "/images/duo/blitz-1.jpg",
      mediaType: "IMAGE",
      matchDate: new Date("2024-01-31"),
      kills: 15,
      placement: "#1 Victory Royale",
    },
  });

  console.log("🎮 Memórias do Duo criadas:");
  console.log(`   - ${memory1.title}`);
  console.log(`   - ${memory2.title}\n`);

  // Criar o presente surpresa
  const gift = await prisma.gift.create({
    data: {
      title: "Kindle Unlimited",
      message: `Ei, minha duo favorita! 🎮💛

Você é incrível, sabia? Cada partida ao seu lado é insana, cada vitória fica ainda mais especial porque é especialmente com você.

Esse site é meu presente pra você - um espaço nosso na internet, onde suas conquistas como arquiteta são sensacionais quanto nossas vitórias no Fortnite.

E como você ama ler (e merece muito mais momentos de paz e leitura), aqui vai um extra: 2 meses de Kindle Unlimited, pra você devorar os livros que quiser!

Obrigado por ser minha duo, no jogo e na vida. 💛

Agradeço por tudo,
Seu duo favorito 🏆`,
      content: "Email: fortniteduo2@gmail.com\nSenha: (vou te mandar no WhatsApp! 😉)",
      recipientId: arquiteta.id,
      isRevealed: false,
    },
  });

  console.log("🎁 Presente surpresa criado:");
  console.log(`   - ${gift.title} para ${arquiteta.name}\n`);
  console.log("✅ Seed concluído com sucesso!");
  console.log("\n📋 Credenciais de acesso:");
  console.log("   Email: matheus@archiduo.com");
  console.log("   Email: arquiteta@archiduo.com");
  console.log("   Senha: DuoFortnite@123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

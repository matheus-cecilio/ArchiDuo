"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Heart, Lightbulb, Target } from "lucide-react";

export default function SobrePage() {
  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-12 bg-[var(--color-secondary)]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-accent)] mb-4">
              Sobre <span className="text-gradient-gold">Nós</span>
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
              Conheça a história por trás dos projetos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--color-secondary-light)]">
                <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)] flex items-center justify-center">
                  <span className="text-6xl">👩‍🎨</span>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-[var(--color-primary)] rounded-2xl -z-10" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] mb-6">
                Uma paixão por criar{" "}
                <span className="text-gradient-gold">espaços únicos</span>
              </h2>
              
              <div className="space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
                <p>
                  Com anos de experiência no mercado de arquitetura e design de interiores, 
                  nossa missão é transformar cada projeto em uma expressão única da 
                  personalidade e necessidades de nossos clientes.
                </p>
                <p>
                  Acreditamos que um bom projeto vai além da estética – ele deve funcionar 
                  perfeitamente para quem vive nele. Por isso, cada detalhe é pensado com 
                  cuidado, desde a disposição dos ambientes até a escolha dos materiais.
                </p>
                <p>
                  Nossa abordagem combina criatividade, funcionalidade e sustentabilidade, 
                  sempre respeitando o orçamento e os prazos estabelecidos.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                <p className="text-[var(--color-primary)] font-[family-name:var(--font-playfair)] text-xl italic">
                  "Cada espaço tem uma alma. Meu trabalho é revelá-la."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] mb-4">
              Nossos <span className="text-gradient-gold">Valores</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Inovação",
                description: "Buscamos constantemente novas soluções e tendências.",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Paixão",
                description: "Amamos o que fazemos e isso se reflete em cada projeto.",
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Precisão",
                description: "Atenção meticulosa a cada detalhe do projeto.",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Excelência",
                description: "Compromisso com a mais alta qualidade em tudo.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

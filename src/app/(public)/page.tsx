"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Award, Users } from "lucide-react";
import { Button } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--color-secondary)]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 mb-8">
                <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-sm text-[var(--color-primary)]">
                  Arquitetura & Design de Interiores
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-accent)] mb-6 leading-tight">
                Transformando{" "}
                <span className="text-gradient-gold">Espaços</span>
                <br />
                em Experiências
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-10 max-w-2xl mx-auto leading-relaxed">
                Criamos projetos arquitetônicos únicos que unem funcionalidade, 
                estética e a essência de cada cliente.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/projetos">
                  <Button size="lg" className="group">
                    Ver Projetos
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button variant="secondary" size="lg">
                    Fale Conosco
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-[var(--color-primary)] flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-[var(--color-primary)]" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Projetos Realizados" },
              { number: "8", label: "Anos de Experiência" },
              { number: "100%", label: "Clientes Satisfeitos" },
              { number: "15", label: "Prêmios de Design" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-gradient-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] mb-4">
              Projetos em <span className="text-gradient-gold">Destaque</span>
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
              Conheça alguns dos nossos trabalhos mais recentes e inspire-se 
              para transformar o seu espaço.
            </p>
          </motion.div>

          {/* Projects Grid - Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-secondary-light)] cursor-pointer"
              >
                {/* Placeholder for project image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]" />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[var(--color-secondary)]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="text-xl font-bold text-[var(--color-accent)] font-[family-name:var(--font-playfair)] mb-2">
                      Projeto {item}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] mb-4">
                      Residencial • 250m²
                    </p>
                    <span className="text-[var(--color-primary)] text-sm font-medium flex items-center justify-center gap-2">
                      Ver Projeto <ArrowRight size={16} />
                    </span>
                  </div>
                </div>

                {/* Gold border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--color-primary)] rounded-xl transition-colors duration-300" />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projetos">
              <Button variant="secondary">
                Ver Todos os Projetos
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-[var(--color-secondary)]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-accent)] mb-4">
              Nossos <span className="text-gradient-gold">Serviços</span>
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
              Oferecemos soluções completas em arquitetura e design de interiores.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: "Projeto Arquitetônico",
                description: "Desenvolvimento completo do projeto, do conceito à execução.",
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Design de Interiores",
                description: "Ambientes funcionais e esteticamente harmoniosos.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Consultoria",
                description: "Orientação especializada para seu projeto ou reforma.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-secondary-light)] hover:border-[var(--color-primary)] transition-colors duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-6 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-playfair)] text-[var(--color-accent)] mb-3">
                  {service.title}
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-secondary)] mb-6">
              Pronto para transformar seu espaço?
            </h2>
            <p className="text-[var(--color-secondary)]/80 mb-8 max-w-xl mx-auto">
              Entre em contato e vamos conversar sobre como podemos 
              criar o projeto dos seus sonhos.
            </p>
            <Link href="/contato">
              <Button 
                size="lg" 
                className="bg-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-secondary)]/90"
              >
                Iniciar Conversa
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

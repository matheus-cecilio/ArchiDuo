"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Award, Users, X, ChevronRight } from "lucide-react";
import { Button, AnimatedBackground } from "@/components/ui";

const PROJECTS = [
  { src: "/projects/img-boa1.png", alt: "Projeto 1" },
  { src: "/projects/img-boa2.png", alt: "Projeto 2" },
  { src: "/projects/img-boa3.png", alt: "Projeto 3" },
  { src: "/projects/img-boa4.png", alt: "Projeto 4" },
  { src: "/projects/img-boa5.png", alt: "Projeto 5" },
  { src: "/projects/img-boa6.png", alt: "Projeto 6" },
  { src: "/projects/img-boa7.png", alt: "Projeto 7" },
  { src: "/projects/img-boa8.png", alt: "Projeto 8" },  
  { src: "/projects/img-boa9.png", alt: "Projeto 9" },
  { src: "/projects/img-boa10.png", alt: "Projeto 10" },
  { src: "/projects/img-boa11.png", alt: "Projeto 11" },
  { src: "/projects/img-boa12.png", alt: "Projeto 12" },
  { src: "/projects/img-boa13.jpg", alt: "Projeto 13" },
  { src: "/projects/img-boa14.png", alt: "Projeto 14" },
  { src: "/projects/img-boa15.png", alt: "Projeto 15" },
];

export default function HomePage() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpandedProject(null);
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <>
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern - now more subtle since we have animation */}
        <div className="absolute inset-0 opacity-5">
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8">
                <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-sm text-[var(--color-primary)]">
                  Arquitetura & Design de Interiores
                </span>
              </div>


              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-playfair)] mb-6 leading-tight">
                <span className="text-white">Transformando</span>{" "}
                <span className="text-gradient-gold">Espaços</span>
                <br />
                <span className="text-white">em</span>{" "}
                <span className="text-gradient-gold">Experiências</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Criamos projetos arquitetônicos únicos que unem funcionalidade, 
                estética e a essência de cada cliente.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/contato">
                  <Button size="lg" className="min-w-[180px]">
                    Fale Conosco
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { number: "5+", label: "Grandes Projetos Realizados" },
              { number: "8", label: "Anos de Experiência" },
              { number: "100%", label: "Clientes Satisfeitos" },
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
            className="flex flex-col items-center justify-center text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] mb-4">
              Projetos em <span className="text-gradient-gold">Destaque</span>
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl text-center leading-relaxed">
              Conheça alguns dos nossos trabalhos mais recentes e inspire-se para transformar o seu espaço.
            </p>
          </motion.div>

          {/* Projects Grid - Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {PROJECTS.map((project, index) => (
              <motion.button
                key={project.src}
                type="button"
                onClick={() => setExpandedProject(index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--color-primary)]/25 bg-[var(--color-secondary-light)] shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-black"
                aria-label={`Ver ${project.alt}`}
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority={index < 3}
                />

                {/* Vinheta para dar profundidade */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_120%_at_50%_20%,rgba(212,175,55,0.06)_0%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.6)_100%)]" />

                {/* Camada hover */}
                <div className="absolute inset-0 pointer-events-none bg-[var(--color-secondary)]/0 group-hover:bg-[var(--color-secondary)]/20 transition-colors duration-300" />

                {/* Borda dourada no hover */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-[var(--color-primary)] transition-colors duration-300" />
              </motion.button>
            ))}
          </div>


        </div>
      </section>

      {/* Services Section */}
      <section className="py-28 relative bg-[#0A0A0A] overflow-hidden">
        {/* Background Elements - Arquitetura */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-10 w-64 h-64 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 border border-white/5 rounded-full"></div>
          <div className="absolute top-40 right-1/3 w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45"></div>
          <div className="absolute bottom-40 left-1/3 w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent transform -rotate-45"></div>
        </div>

        {/* Decorative Architectural Grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-5 pointer-events-none">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-white/5"></div>
          ))}
        </div>

        {/* Title Container */}
        <div className="text-center mb-20 px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"></div>
              <div className="text-[var(--color-primary)] font-light tracking-widest text-sm uppercase">
                Nossas Especialidades
              </div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"></div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] !text-white mb-4">
              Serviços <span className="text-gradient-gold">Exclusivos</span>
            </h2>
            
            <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
              Transformamos suas ideias em espaços funcionais e esteticamente 
              impressionantes, com atenção aos mínimos detalhes.
            </p>
          </motion.div>
        </div>

        {/* Cards Container - Centered */}
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 justify-center lg:items-stretch">
            {/* Card 1 - Arquitetura */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-[#2a2a2a] hover:border-[var(--color-primary)]/30 transition-all duration-500 w-full lg:w-auto lg:flex-1 lg:max-w-[500px]"
            >
              {/* Card Background Pattern */}
              <div className="absolute inset-0 opacity-20"></div>
              
              {/* Gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-10 relative">
                {/* Icon and Title with Creative Layout */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--color-primary)]/40 transition-all duration-500">
                      <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[var(--color-primary)] to-amber-700 flex items-center justify-center shadow-lg">
                        <Award className="w-5 h-5 text-black" />
                      </div>
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)] !text-white mb-2">
                      Arquitetura
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-amber-600 mb-3"></div>
                    <p className="text-gray-300 text-sm">
                      Projetos residenciais e comerciais
                    </p>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6 text-justify group-hover:text-gray-300 transition-colors duration-300">
                  Criamos projetos arquitetônicos que unem estética, funcionalidade e sustentabilidade, 
                  atendendo às necessidades específicas de cada cliente e transformando conceitos em 
                  espaços tangíveis e inspiradores.
                </p>
                
                {/* Features List */}
                <ul className="space-y-3 mb-2">
                  {['Projetos residenciais personalizados', 'Aprovações legais e regulatórias', 'Gestão de obra'].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Card 2 - Design de Interiores */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-[#2a2a2a] hover:border-[var(--color-primary)]/30 transition-all duration-500 w-full lg:w-auto lg:flex-1 lg:max-w-[500px]"
            >
              {/* Card Background Pattern */}
              <div className="absolute inset-0 opacity-20"></div>
              
              {/* Gold accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-10 relative">
                {/* Icon and Title with Creative Layout */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--color-primary)]/40 transition-all duration-500">
                      <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[var(--color-primary)] to-amber-700 flex items-center justify-center shadow-lg">
                        <Users className="w-5 h-5 text-black" />
                      </div>
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)] !text-white mb-2">
                      Design de Interiores
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-amber-600 mb-3"></div>
                    <p className="text-gray-300 text-sm">
                      Ambientes personalizados e funcionais
                    </p>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-6 text-justify group-hover:text-gray-300 transition-colors duration-300">
                  Desenvolvemos ambientes que refletem sua personalidade e estilo de vida, 
                  combinando estética, conforto e funcionalidade através da seleção criteriosa 
                  de materiais, mobiliário, iluminação e elementos decorativos.
                </p>
                
                {/* Features List */}
                <ul className="space-y-3 mb-2">
                  {['Projeto de ambientes residenciais', 'Design comercial e corporativo', 'Iluminação e mobiliário'].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative bottom elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent"></div>
        <div className="absolute -bottom-10 left-1/4 w-48 h-20 bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent -skew-y-6 blur-3xl"></div>
      </section>

      <AnimatePresence>
        {expandedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedProject(null)}
            className="fixed inset-0 z-50 bg-black/85 p-4 md:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--color-primary)]/40 shadow-2xl bg-black"
            >
              <Image
                src={PROJECTS[expandedProject].src}
                alt={PROJECTS[expandedProject].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />

              {/* Brilho sutil sobre a imagem expandida */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-80"
                initial={{ x: "-120%" }}
                animate={{ x: ["-120%", "130%"] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                style={{
                  background:
                    "linear-gradient(115deg, transparent 35%, rgba(245,230,200,0.25) 50%, transparent 65%)",
                }}
              />

              <button
                type="button"
                onClick={() => setExpandedProject(null)}
                className="absolute top-4 right-4 rounded-full border border-[var(--color-primary)]/50 bg-black/60 p-2 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black transition-colors"
                aria-label="Fechar visualizacao do projeto"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </>
  );
}

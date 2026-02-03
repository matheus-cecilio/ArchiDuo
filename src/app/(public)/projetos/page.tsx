"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";

// Mock data - será substituído por dados do banco
const mockProjects = [
  { id: "1", title: "Casa Moderna", slug: "casa-moderna", category: "Residencial", area: "350m²", year: "2024" },
  { id: "2", title: "Apartamento Jardins", slug: "apartamento-jardins", category: "Residencial", area: "180m²", year: "2024" },
  { id: "3", title: "Escritório Tech", slug: "escritorio-tech", category: "Comercial", area: "500m²", year: "2023" },
  { id: "4", title: "Restaurante Fusion", slug: "restaurante-fusion", category: "Comercial", area: "280m²", year: "2023" },
  { id: "5", title: "Loft Industrial", slug: "loft-industrial", category: "Residencial", area: "120m²", year: "2023" },
  { id: "6", title: "Clínica Bem-Estar", slug: "clinica-bem-estar", category: "Comercial", area: "400m²", year: "2022" },
];

const categories = ["Todos", "Residencial", "Comercial"];

export default function ProjetosPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects = activeCategory === "Todos"
    ? mockProjects
    : mockProjects.filter(p => p.category === activeCategory);

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
              Nossos <span className="text-gradient-gold">Projetos</span>
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
              Explore nossa coleção de projetos residenciais e comerciais. 
              Cada espaço conta uma história única.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-4">
            <Filter className="w-5 h-5 text-[var(--color-text-muted)]" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-[var(--color-primary)] text-[var(--color-secondary)]"
                    : "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/projetos/${project.slug}`}>
                  <div className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-secondary-light)] cursor-pointer card-hover">
                    {/* Placeholder gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[var(--color-primary)] text-[var(--color-secondary)] text-xs font-medium">
                      {project.category}
                    </div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-secondary)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-[var(--color-accent)] font-[family-name:var(--font-playfair)] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>{project.area}</span>
                        <span>•</span>
                        <span>{project.year}</span>
                      </div>
                    </div>

                    {/* Gold border on hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--color-primary)] rounded-xl transition-colors duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--color-text-muted)]">
                Nenhum projeto encontrado nesta categoria.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

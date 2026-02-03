"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Maximize } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

// Mock data - será substituído por dados reais
const mockProject = {
  id: "1",
  title: "Casa Moderna",
  slug: "casa-moderna",
  description: "Este projeto residencial foi desenvolvido com foco na integração entre os ambientes internos e externos, aproveitando a iluminação natural e criando espaços fluidos para uma família contemporânea. A paleta de cores neutras, combinada com elementos naturais como madeira e pedra, traz aconchego sem perder a modernidade.",
  clientName: "Família Silva",
  location: "São Paulo, SP",
  area: "350m²",
  year: "2024",
  images: [
    { id: "1", url: "/placeholder-1.jpg", comparisonUrl: "/placeholder-before-1.jpg", caption: "Sala de Estar" },
    { id: "2", url: "/placeholder-2.jpg", comparisonUrl: null, caption: "Cozinha Integrada" },
    { id: "3", url: "/placeholder-3.jpg", comparisonUrl: "/placeholder-before-3.jpg", caption: "Área Externa" },
  ],
};

export default function ProjetoDetalhePage({ params }: { params: { slug: string } }) {
  // Em produção, buscar projeto pelo slug
  const project = mockProject;

  return (
    <>
      {/* Header */}
      <section className="pt-8 pb-12 bg-[var(--color-secondary)]">
        <div className="container-custom">
          {/* Back button */}
          <Link 
            href="/projetos"
            className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Voltar para Projetos
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-accent)] mb-6">
              {project.title}
            </h1>

            {/* Project meta */}
            <div className="flex flex-wrap gap-6 text-[var(--color-text-muted)]">
              {project.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-[var(--color-primary)]" />
                  {project.location}
                </div>
              )}
              {project.area && (
                <div className="flex items-center gap-2">
                  <Maximize size={18} className="text-[var(--color-primary)]" />
                  {project.area}
                </div>
              )}
              {project.year && (
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-[var(--color-primary)]" />
                  {project.year}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Image / Slider */}
      <section className="py-12 bg-[var(--color-background)]">
        <div className="container-custom">
          {project.images[0]?.comparisonUrl ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage 
                    src={project.images[0].comparisonUrl} 
                    alt="Antes" 
                    style={{ objectFit: "cover" }}
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage 
                    src={project.images[0].url} 
                    alt="Depois" 
                    style={{ objectFit: "cover" }}
                  />
                }
                className="aspect-video"
                position={50}
              />
              <div className="flex justify-between p-4 bg-[var(--color-surface)] text-sm text-[var(--color-text-muted)]">
                <span>← Antes</span>
                <span className="text-[var(--color-primary)] font-medium">
                  Arraste para comparar
                </span>
                <span>Depois →</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="aspect-video rounded-xl overflow-hidden bg-[var(--color-secondary-light)]"
            >
              <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Description */}
      <section className="py-12 bg-[var(--color-surface)]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] mb-6">
              Sobre o Projeto
            </h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
              {project.description}
            </p>

            {project.clientName && (
              <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                <span className="text-sm text-[var(--color-text-muted)]">Cliente</span>
                <p className="text-[var(--color-text-primary)] font-medium">{project.clientName}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.images.length > 1 && (
        <section className="section-padding bg-[var(--color-background)]">
          <div className="container-custom">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] mb-8">
              Galeria de Imagens
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.slice(1).map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  {image.comparisonUrl ? (
                    <div className="rounded-xl overflow-hidden shadow-md">
                      <ReactCompareSlider
                        itemOne={
                          <ReactCompareSliderImage 
                            src={image.comparisonUrl} 
                            alt="Antes" 
                          />
                        }
                        itemTwo={
                          <ReactCompareSliderImage 
                            src={image.url} 
                            alt="Depois" 
                          />
                        }
                        className="aspect-[4/3]"
                        position={50}
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-secondary-light)] shadow-md">
                      <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]" />
                    </div>
                  )}
                  {image.caption && (
                    <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                      {image.caption}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-[var(--color-secondary)]">
        <div className="container-custom text-center">
          <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-accent)] mb-4">
            Gostou deste projeto?
          </h3>
          <p className="text-[var(--color-text-muted)] mb-8">
            Entre em contato para discutirmos o seu.
          </p>
          <Link href="/contato">
            <Button size="lg">
              Fale Conosco
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

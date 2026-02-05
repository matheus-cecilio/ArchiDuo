"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Save, Upload, Trash2, Plus, GripVertical } from "lucide-react";
import { Button, Input, Textarea, Card } from "@/components/ui";

interface ProjectImage {
  id: string;
  url: string;
  comparisonUrl?: string;
  caption?: string;
}

export default function NovoProjetoPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    clientName: "",
    location: "",
    area: "",
    year: new Date().getFullYear().toString(),
    featured: false,
  });

  const [images, setImages] = useState<ProjectImage[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Em produção: chamar Server Action para criar projeto
      console.log("Criando projeto:", formData, images);
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push("/admin/projetos");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = () => {
    // Em produção: abrir modal de upload ou usar input file
    const newImage: ProjectImage = {
      id: Date.now().toString(),
      url: "/placeholder.jpg",
      caption: "",
    };
    setImages([...images, newImage]);
  };

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Link
          href="/admin/projetos"
          className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Voltar para Projetos
        </Link>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]">
          Novo Projeto
        </h1>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card>
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">
                Informações Básicas
              </h2>
              
              <div className="space-y-5">
                <Input
                  label="Título do Projeto *"
                  placeholder="Ex: Apartamento Moderno em Santa Catarina"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />

                <Textarea
                  label="Descrição *"
                  placeholder="Descreva o projeto, seus conceitos e características principais..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[150px]"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Cliente"
                    placeholder="Nome do cliente (opcional)"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  />
                  <Input
                    label="Localização"
                    placeholder="Ex: Santa Catarina, SC"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Área"
                    placeholder="Ex: 350m²"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  />
                  <Input
                    label="Ano"
                    placeholder="Ex: 2024"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  />
                </div>
              </div>
            </Card>

            {/* Images Section */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Imagens do Projeto
                </h2>
                <Button type="button" variant="secondary" size="sm" onClick={handleImageUpload}>
                  <Upload size={16} className="mr-2" />
                  Adicionar
                </Button>
              </div>

              {images.length === 0 ? (
                <div 
                  className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-12 text-center cursor-pointer hover:border-[var(--color-primary)] transition-colors"
                  onClick={handleImageUpload}
                >
                  <Upload size={40} className="mx-auto text-[var(--color-text-muted)] mb-4" />
                  <p className="text-[var(--color-text-muted)]">
                    Clique ou arraste imagens para fazer upload
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-2">
                    Suporta JPG, PNG e WebP até 10MB
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {images.map((image, index) => (
                    <div 
                      key={image.id}
                      className="flex items-center gap-4 p-4 bg-[var(--color-accent-soft)] rounded-lg"
                    >
                      <GripVertical size={20} className="text-[var(--color-text-muted)] cursor-grab" />
                      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)] flex-shrink-0" />
                      <div className="flex-1">
                        <Input
                          placeholder="Legenda (opcional)"
                          value={image.caption || ""}
                          onChange={(e) => {
                            const updated = images.map(img => 
                              img.id === image.id ? { ...img, caption: e.target.value } : img
                            );
                            setImages(updated);
                          }}
                        />
                        <label className="flex items-center gap-2 mt-2 text-sm text-[var(--color-text-muted)]">
                          <input type="checkbox" className="rounded" />
                          Adicionar versão "antes" para slider
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                Publicação
              </h2>
              
              <label className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-accent-soft)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-[var(--color-primary)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <div>
                  <span className="font-medium text-[var(--color-text-primary)]">
                    Projeto em Destaque
                  </span>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Aparece na home do site
                  </p>
                </div>
              </label>

              <div className="mt-6 space-y-3">
                <Button type="submit" isLoading={isLoading} className="w-full">
                  <Save size={18} className="mr-2" />
                  Salvar Projeto
                </Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => router.back()}>
                  Cancelar
                </Button>
              </div>
            </Card>

            <Card className="bg-[var(--color-primary)]/5 border-[var(--color-primary)]/20">
              <h3 className="font-medium text-[var(--color-text-primary)] mb-2">
                💡 Dica
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Adicione uma imagem "antes" para criar o slider de comparação. 
                Isso é ótimo para mostrar a evolução do projeto!
              </p>
            </Card>
          </motion.div>
        </div>
      </form>
    </div>
  );
}

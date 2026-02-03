"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  MoreVertical,
  Star,
  Image as ImageIcon
} from "lucide-react";
import { Button, Card, Input } from "@/components/ui";
import { cn } from "@/lib/utils";

// Mock data - será substituído por dados do banco
const mockProjects = [
  { 
    id: "1", 
    title: "Casa Moderna", 
    slug: "casa-moderna", 
    featured: true,
    imagesCount: 8,
    createdAt: "2024-01-15",
  },
  { 
    id: "2", 
    title: "Apartamento Jardins", 
    slug: "apartamento-jardins", 
    featured: false,
    imagesCount: 12,
    createdAt: "2024-01-10",
  },
  { 
    id: "3", 
    title: "Escritório Tech", 
    slug: "escritorio-tech", 
    featured: true,
    imagesCount: 6,
    createdAt: "2023-12-20",
  },
];

export default function AdminProjetosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState(mockProjects);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
      setProjects(projects.filter(p => p.id !== id));
      // Em produção: chamar Server Action para deletar
    }
  };

  const toggleFeatured = async (id: string) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ));
    // Em produção: chamar Server Action para atualizar
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]">
            Projetos
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Gerencie os projetos do portfólio
          </p>
        </div>
        <Link href="/admin/projetos/novo">
          <Button>
            <Plus size={18} className="mr-2" />
            Novo Projeto
          </Button>
        </Link>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={20} />
          <Input
            placeholder="Buscar projetos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Projects List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredProjects.length === 0 ? (
          <Card className="text-center py-16">
            <ImageIcon size={48} className="mx-auto text-[var(--color-text-muted)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              {searchQuery ? "Nenhum projeto encontrado" : "Nenhum projeto ainda"}
            </h3>
            <p className="text-[var(--color-text-muted)] mb-6">
              {searchQuery 
                ? "Tente buscar com outros termos" 
                : "Comece adicionando seu primeiro projeto"
              }
            </p>
            {!searchQuery && (
              <Link href="/admin/projetos/novo">
                <Button>
                  <Plus size={18} className="mr-2" />
                  Criar Primeiro Projeto
                </Button>
              </Link>
            )}
          </Card>
        ) : (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="flex items-center gap-4 hover:border-[var(--color-primary)]/30 transition-colors">
                {/* Thumbnail placeholder */}
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)] flex-shrink-0" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[var(--color-text-primary)] truncate">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <Star size={16} className="text-[var(--color-primary)] fill-current flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <ImageIcon size={14} />
                      {project.imagesCount} imagens
                    </span>
                    <span>•</span>
                    <span>{new Date(project.createdAt).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleFeatured(project.id)}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      project.featured 
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" 
                        : "bg-[var(--color-accent-soft)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
                    )}
                    title={project.featured ? "Remover destaque" : "Destacar"}
                  >
                    <Star size={18} className={project.featured ? "fill-current" : ""} />
                  </button>
                  <Link 
                    href={`/projetos/${project.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    <Eye size={18} />
                  </Link>
                  <Link 
                    href={`/admin/projetos/${project.id}`}
                    className="p-2 rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}

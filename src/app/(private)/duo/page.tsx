"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Gamepad2,
  Upload,
  Target,
  Sparkles,
  Plus,
  Crown,
  X,
  Loader2,
  Trash2
} from "lucide-react";
import { Button, Card, Dialog, Input, ConfirmationModal } from "@/components/ui";

export default function DuoZonePage() {
  const [memories, setMemories] = useState<any[]>([]);
  const [fortniteStats, setFortniteStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mediaType, setMediaType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState({ url: "", alt: "" });
  const [newMemory, setNewMemory] = useState({
    title: "",
    youtubeUrl: "",
    imageFile: null as File | null,
    imagePreview: null as string | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States for delete confirmation
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memoryToDelete, setMemoryToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Ordenar: vídeos primeiro, depois imagens por data
  const regularMemories = memories.sort((a, b) => {
    // Vídeos sempre primeiro
    if (a.mediaType === 'VIDEO' && b.mediaType !== 'VIDEO') return -1;
    if (a.mediaType !== 'VIDEO' && b.mediaType === 'VIDEO') return 1;
    // Se ambos são do mesmo tipo, ordenar por data (mais recente primeiro)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Buscar memórias do banco
  useEffect(() => {
    async function fetchMemories() {
      try {
        const response = await fetch("/api/duo-memories");
        if (response.ok) {
          const data = await response.json();
          setMemories(data.memories);
        }
      } catch (error) {
        console.error("Erro ao buscar memórias:", error);
      }
    }

    fetchMemories();
  }, []);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/fortnite-stats");
        if (response.ok) {
          const data = await response.json();
          setFortniteStats(data.stats);
        }
      } catch (error) {
        console.error("Erro ao buscar stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewMemory((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleAddMemory = async () => {
    // Validação baseada no tipo de mídia
    if (mediaType === 'IMAGE') {
      if (!newMemory.title || !newMemory.imageFile) {
        alert("Por favor, preencha o título e selecione uma imagem!");
        return;
      }
    } else {
      if (!newMemory.title || !newMemory.youtubeUrl) {
        alert("Por favor, preencha o título e a URL do YouTube!");
        return;
      }
    }

    setIsUploading(true);

    try {
      let mediaUrl = "";

      if (mediaType === 'IMAGE') {
        // 1. Upload da imagem para Cloudinary
        const formData = new FormData();
        formData.append("file", newMemory.imageFile!);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Erro ao fazer upload da imagem");
        }

        const { url: imageUrl } = await uploadResponse.json();
        mediaUrl = imageUrl;
      } else {
        // Para vídeo, usar a URL do YouTube fornecida
        mediaUrl = newMemory.youtubeUrl;
      }

      // 2. Salvar memória no banco
      const memoryResponse = await fetch("/api/duo-memories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newMemory.title,
          // Placement automático: Victory Royale para imagens, null para vídeos
          placement: mediaType === 'IMAGE' ? "#1 Victory Royale" : null,
          mediaUrl: mediaUrl,
          mediaType: mediaType,
        }),
      });

      if (!memoryResponse.ok) {
        throw new Error("Erro ao salvar memória");
      }

      const { memory } = await memoryResponse.json();

      // 3. Atualizar lista de memórias
      setMemories((prev) => [memory, ...prev]);

      // 4. Resetar formulário
      setNewMemory({
        title: "",
        youtubeUrl: "",
        imageFile: null,
        imagePreview: null,
      });
      setMediaType('IMAGE');
      setIsDialogOpen(false);

      alert("Memória adicionada com sucesso! 🎉");
    } catch (error) {
      console.error("Erro ao adicionar memória:", error);
      alert("Erro ao adicionar memória. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setMediaType('IMAGE');
    setNewMemory({
      title: "",
      youtubeUrl: "",
      imageFile: null,
      imagePreview: null,
    });
  };

  const handleDeleteRequest = (memory: any) => {
    setMemoryToDelete(memory);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!memoryToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/duo-memories?id=${memoryToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMemories((prev) => prev.filter((m) => m.id !== memoryToDelete.id));
        setDeleteModalOpen(false);
        setMemoryToDelete(null);
        // Opcional: mostrar toast ou alert de sucesso
      } else {
        alert("Erro ao excluir memória. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao excluir memória:", error);
      alert("Erro ao excluir memória. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Header Estilo Fortnite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 mb-4">
            <Gamepad2 className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-[var(--color-primary)] font-medium">Área Exclusiva</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)] mb-4">
            Duo <span className="text-gradient-gold">Zone</span>
          </h1>
          <p className="text-[var(--color-text-muted)] text-center">
            Estatísticas do Fortnite da DehMarka! 🎮
          </p>
        </motion.div>

        {/* Stats Grid - 6 cards em 2x3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
        >
          {[
            {
              icon: Crown,
              label: "Level",
              value: "215",
              color: "text-cyan-500"
            },
            {
              icon: Trophy,
              label: "Victory Royales",
              value: loading ? "..." : (fortniteStats?.wins || 0).toLocaleString(),
              color: "text-yellow-500"
            },
            {
              icon: Gamepad2,
              label: "Partidas",
              value: loading ? "..." : (fortniteStats?.matches || 0).toLocaleString(),
              color: "text-purple-500"
            },
            {
              icon: Target,
              label: "K/D",
              value: loading ? "..." : (fortniteStats?.kd || 0).toFixed(2),
              color: "text-blue-500"
            },
            {
              icon: Target,
              label: "Total Kills",
              value: loading ? "..." : (fortniteStats?.kills || 0).toLocaleString(),
              color: "text-red-500"
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="text-center py-4 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-accent-soft)]"
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  {stat.label}
                </div>
              </Card>
            );
          })}
        </motion.div>

        {/* Stats Detalhados */}
        {fortniteStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
          </motion.div>
        )}

        {/* Victory Royales - Grid de Memórias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-[var(--color-primary)]" />
              <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]">
                Nossas Vitórias
              </h2>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setIsDialogOpen(true)}>
              <Plus size={16} className="mr-2" />
              Adicionar Memória
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularMemories.map((memory, index) => {
              // Verificar se é uma URL de vídeo do YouTube
              const isYouTubeVideo = memory.mediaUrl &&
                (memory.mediaUrl.includes('youtube.com') ||
                  memory.mediaUrl.includes('youtu.be'));

              // Se for URL normal do YouTube, converter para embed
              let embedUrl = memory.mediaUrl;
              if (isYouTubeVideo && !memory.mediaUrl.includes('/embed/')) {
                const videoId = memory.mediaUrl.split('v=')[1]?.split('&')[0];
                if (videoId) {
                  embedUrl = `https://www.youtube.com/embed/${videoId}`;
                }
              }

              return (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card hover className="overflow-hidden group">
                    {/* Image or Video */}
                    <div className="aspect-video bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)] relative">
                      {isYouTubeVideo ? (
                        // Renderizar vídeo do YouTube
                        <iframe
                          src={embedUrl}
                          title={memory.title}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : memory.mediaUrl ? (
                        // Renderizar imagem (clicável para expandir)
                        <div
                          className="absolute inset-0 cursor-pointer group/image"
                          onClick={() => {
                            setLightboxImage({
                              url: memory.mediaUrl,
                              alt: memory.title,
                            });
                            setLightboxOpen(true);
                          }}
                        >
                          <Image
                            src={memory.mediaUrl}
                            alt={memory.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={index === 0}
                            className="object-cover transition-transform duration-300 group-hover/image:scale-105"
                          />
                          {/* Overlay hint */}
                          <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors flex items-center justify-center">
                            <p className="text-white opacity-0 group-hover/image:opacity-100 transition-opacity text-sm font-medium">
                              Clique para expandir
                            </p>
                          </div>
                        </div>
                      ) : null}

                      {/* Victory badge */}
                      {memory.placement && (
                        <div className="absolute bottom-3 left-3 px-2 py-1 bg-[var(--color-primary)] text-[var(--color-secondary)] text-xs font-bold rounded z-10">
                          {memory.placement}
                        </div>
                      )}

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRequest(memory);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-[-10px] group-hover:translate-y-0 duration-200 z-20"
                        title="Excluir memória"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h4 className="font-semibold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                        {memory.title}
                      </h4>
                    </div>
                  </Card>
                </motion.div>
              );
            })}

            {/* Add New Memory Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card
                onClick={() => setIsDialogOpen(true)}
                className="aspect-auto min-h-[280px] flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/10 transition-colors">
                  <Upload className="w-6 h-6 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
                </div>
                <p className="text-[var(--color-text-muted)] font-medium group-hover:text-[var(--color-primary)] transition-colors">
                  Adicionar Print
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Adicione um nome para a memória
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Dialog para Adicionar Memória */}
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          title="Adicionar Nova Memória"
          maxWidth="lg"
        >
          <div className="space-y-4">
            {/* Toggle: Imagem ou Vídeo */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                Tipo de Memória
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setMediaType('IMAGE')}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${mediaType === 'IMAGE'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                    }`}
                >
                  📷 Imagem
                </button>
                <button
                  type="button"
                  onClick={() => setMediaType('VIDEO')}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${mediaType === 'VIDEO'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                    }`}
                >
                  🎥 Vídeo YouTube
                </button>
              </div>
            </div>

            {/* Upload de Imagem (condicional) */}
            {mediaType === 'IMAGE' && (
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  Imagem da Vitória
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />

                {newMemory.imagePreview ? (
                  <div className="relative h-32 rounded-xl overflow-hidden border-2 border-[var(--color-border)] group">
                    <Image
                      src={newMemory.imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => {
                        setNewMemory((prev) => ({
                          ...prev,
                          imageFile: null,
                          imagePreview: null,
                        }));
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 rounded-xl border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors flex flex-col items-center justify-center gap-2 bg-[var(--color-accent-soft)] hover:bg-[var(--color-primary)]/5"
                  >
                    <Upload className="w-6 h-6 text-[var(--color-text-muted)]" />
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Clique para selecionar
                    </p>
                  </button>
                )}
              </div>
            )}

            {/* URL do YouTube (condicional) */}
            {mediaType === 'VIDEO' && (
              <Input
                label="URL do Vídeo (YouTube Embed)"
                placeholder="https://www.youtube.com/embed/..."
                value={newMemory.youtubeUrl}
                onChange={(e) =>
                  setNewMemory((prev) => ({ ...prev, youtubeUrl: e.target.value }))
                }
              />
            )}

            {/* Título */}
            <Input
              label="Título da Memória"
              placeholder="Ex: Modo Trocação - Duo - 3"
              value={newMemory.title}
              onChange={(e) =>
                setNewMemory((prev) => ({ ...prev, title: e.target.value }))
              }
            />

            {/* Botões */}
            <div className="flex gap-3 justify-end pt-4">
              <Button
                variant="secondary"
                onClick={handleCloseDialog}
                disabled={isUploading}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddMemory}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Memória
                  </>
                )}
              </Button>
            </div>
          </div>
        </Dialog>

        {/* Easter Egg - Link para o Presente */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-center"
        >
          <Link href="/duo/presente">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[var(--color-primary)]/10 to-purple-500/10 border border-[var(--color-primary)]/30 hover:border-[var(--color-primary)] transition-all cursor-pointer group animate-pulse-gold">
              <div className="text-3xl">🎁</div>
              <div className="text-left">
                <p className="text-[var(--color-primary)] font-semibold group-hover:underline">
                  Tem uma surpresa esperando por você...
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Clique aqui para descobrir!
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox para expandir imagens - Estilo Landing Page */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 p-4 md:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden border border-[var(--color-primary)]/40 shadow-2xl bg-black"
            >
              <Image
                src={lightboxImage.url}
                alt={lightboxImage.alt}
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
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 rounded-full border border-[var(--color-primary)]/50 bg-black/60 p-2 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black transition-colors"
                aria-label="Fechar visualização"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <ConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Memória"
        message={`Tem certeza que deseja excluir "${memoryToDelete?.title}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
}

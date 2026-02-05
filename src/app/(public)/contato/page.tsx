"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Send, MessageCircle } from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio - em produção, integrar com API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Abrir WhatsApp com mensagem
    const whatsappMessage = encodeURIComponent(
      `Olá! Me chamo ${formData.name}.\n\n${formData.message}\n\nEmail: ${formData.email}\nTelefone: ${formData.phone}`
    );
    window.open(`https://wa.me/5511999999999?text=${whatsappMessage}`, "_blank");

    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-12 bg-[var(--color-secondary)]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
              <span className="text-gradient-gold">Fale</span> <span className="text-white">Conosco</span>
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-center leading-relaxed">
              Tem um projeto em mente? Adoraríamos ouvir sobre ele.
              Entre em contato e vamos transformar sua visão em realidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]" style={{ marginBottom: '2rem' }}>
                Informações de Contato
              </h2>

              <div className="space-y-6">

                <a
                  href="https://instagram.com/archiduo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-text-primary)]">Instagram</h3>
                    <p className="text-[var(--color-text-muted)] text-sm">@archiduo</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-text-primary)]">Localização</h3>
                    <p className="text-[var(--color-text-muted)] text-sm">Santa Catarina - SC - Brasil</p>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp CTA */}
              <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-[#F6E7A6] to-[#E6C75B] shadow-lg">
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                  Resposta Rápida via WhatsApp
                </h3>
                <p className="text-[#1a1a1a]/80 text-sm">
                  Prefere conversar diretamente? Clique abaixo para iniciar uma conversa.
                </p>
                <a
                  href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os serviços de arquitetura."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-6"
                >
                  <Button className="bg-[#1a1a1a] text-[#EBC960] hover:bg-black w-full border-none shadow-md">
                    <MessageCircle className="mr-2" size={18} />
                    Iniciar Conversa
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]" style={{ marginBottom: '2rem' }}>
                Envie uma Mensagem
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Nome"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    label="Telefone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <Textarea
                  label="Mensagem"
                  placeholder="Conte-nos sobre seu projeto ou dúvida..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[180px]"
                  required
                />

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full md:w-auto bg-[#EBC960] text-[#1a1a1a] hover:bg-[#D4AF37] border-none font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <Send className="mr-2" size={18} />
                  Enviar Mensagem
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

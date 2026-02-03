"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw, Eye } from "lucide-react";
import { Button, Input, Card } from "@/components/ui";

const fontOptions = [
  { label: "Playfair Display", value: "Playfair Display" },
  { label: "Cormorant Garamond", value: "Cormorant Garamond" },
  { label: "Libre Baskerville", value: "Libre Baskerville" },
  { label: "Merriweather", value: "Merriweather" },
  { label: "Lora", value: "Lora" },
];

const defaultSettings = {
  primaryColor: "#D4AF37",
  secondaryColor: "#0A0A0A",
  accentColor: "#FAFAFA",
  fontFamily: "Playfair Display",
  heroTitle: "Arquitetura & Design",
  heroSubtitle: "Transformando espaços em experiências",
  siteName: "ArchiDuo",
};

export default function AparenciaPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = <K extends keyof typeof settings>(
    key: K, 
    value: typeof settings[K]
  ) => {
    setSettings({ ...settings, [key]: value });
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Em produção: chamar Server Action para salvar
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasChanges(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm("Tem certeza que deseja restaurar as configurações padrão?")) {
      setSettings(defaultSettings);
      setHasChanges(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]">
            Aparência do Site
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Personalize as cores, fontes e textos do seu site
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleReset}>
            <RotateCcw size={18} className="mr-2" />
            Restaurar
          </Button>
          <Button 
            onClick={handleSave} 
            isLoading={isLoading}
            disabled={!hasChanges}
          >
            <Save size={18} className="mr-2" />
            Salvar
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Colors */}
          <Card>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">
              Cores do Tema
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  Cor Primária (Dourado)
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => updateSetting("primaryColor", e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-[var(--color-border)]"
                  />
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) => updateSetting("primaryColor", e.target.value)}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  Cor Secundária (Escura)
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => updateSetting("secondaryColor", e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-[var(--color-border)]"
                  />
                  <Input
                    value={settings.secondaryColor}
                    onChange={(e) => updateSetting("secondaryColor", e.target.value)}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                  Cor de Destaque (Clara)
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.accentColor}
                    onChange={(e) => updateSetting("accentColor", e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-[var(--color-border)]"
                  />
                  <Input
                    value={settings.accentColor}
                    onChange={(e) => updateSetting("accentColor", e.target.value)}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Typography */}
          <Card>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">
              Tipografia
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                Fonte dos Títulos
              </label>
              <select
                value={settings.fontFamily}
                onChange={(e) => updateSetting("fontFamily", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          {/* Hero Section */}
          <Card>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">
              Seção Hero
            </h2>
            
            <div className="space-y-5">
              <Input
                label="Nome do Site"
                value={settings.siteName}
                onChange={(e) => updateSetting("siteName", e.target.value)}
              />
              <Input
                label="Título Principal"
                value={settings.heroTitle}
                onChange={(e) => updateSetting("heroTitle", e.target.value)}
              />
              <Input
                label="Subtítulo"
                value={settings.heroSubtitle}
                onChange={(e) => updateSetting("heroSubtitle", e.target.value)}
              />
            </div>
          </Card>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Preview
              </h2>
              <a 
                href="/" 
                target="_blank" 
                className="text-sm text-[var(--color-primary)] flex items-center gap-1 hover:underline"
              >
                <Eye size={16} />
                Ver site
              </a>
            </div>
            
            {/* Mini Preview */}
            <div 
              className="rounded-xl overflow-hidden border border-[var(--color-border)]"
              style={{
                "--preview-primary": settings.primaryColor,
                "--preview-secondary": settings.secondaryColor,
                "--preview-accent": settings.accentColor,
              } as React.CSSProperties}
            >
              {/* Navbar preview */}
              <div 
                className="px-4 py-3 flex items-center justify-between"
                style={{ backgroundColor: settings.accentColor }}
              >
                <span 
                  className="font-bold text-sm"
                  style={{ 
                    color: settings.primaryColor,
                    fontFamily: settings.fontFamily,
                  }}
                >
                  {settings.siteName}
                </span>
                <div className="flex gap-2">
                  <div className="w-8 h-2 rounded" style={{ backgroundColor: settings.secondaryColor, opacity: 0.3 }} />
                  <div className="w-8 h-2 rounded" style={{ backgroundColor: settings.secondaryColor, opacity: 0.3 }} />
                </div>
              </div>

              {/* Hero preview */}
              <div 
                className="px-6 py-12 text-center"
                style={{ backgroundColor: settings.secondaryColor }}
              >
                <h3 
                  className="text-lg font-bold mb-2"
                  style={{ 
                    color: settings.accentColor,
                    fontFamily: settings.fontFamily,
                  }}
                >
                  {settings.heroTitle}
                </h3>
                <p 
                  className="text-xs mb-4"
                  style={{ color: `${settings.accentColor}80` }}
                >
                  {settings.heroSubtitle}
                </p>
                <div 
                  className="inline-block px-4 py-2 rounded-lg text-xs font-medium"
                  style={{ 
                    backgroundColor: settings.primaryColor,
                    color: settings.secondaryColor,
                  }}
                >
                  Ver Projetos
                </div>
              </div>

              {/* Content preview */}
              <div 
                className="px-6 py-8"
                style={{ backgroundColor: settings.accentColor }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div 
                    className="aspect-video rounded-lg"
                    style={{ backgroundColor: `${settings.secondaryColor}15` }}
                  />
                  <div 
                    className="aspect-video rounded-lg"
                    style={{ backgroundColor: `${settings.secondaryColor}15` }}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-[var(--color-text-muted)] text-center mt-4">
              As alterações serão aplicadas após salvar
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================
// Types do ArchiDuo Portfolio
// ============================================

// Tipos base vindos do Prisma
export type { User, Project, ProjectImage, DuoMemory, Gift, SiteSettings } from "@prisma/client";

// ============================================
// Tipos Compostos (com relações)
// ============================================

import type { Project, ProjectImage, DuoMemory, Gift, User } from "@prisma/client";

export type ProjectWithImages = Project & {
  images: ProjectImage[];
};

export type GiftWithRecipient = Gift & {
  recipient: User;
};

// ============================================
// Tipos de Formulários
// ============================================

export interface ProjectFormData {
  title: string;
  description: string;
  clientName?: string;
  location?: string;
  area?: string;
  year?: string;
  featured?: boolean;
}

export interface DuoMemoryFormData {
  title: string;
  description?: string;
  mediaUrl: string;
  mediaType: "IMAGE" | "VIDEO";
  matchDate: Date;
  kills?: number;
  placement?: string;
  isHighlight?: boolean;
}

export interface SiteSettingsFormData {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  heroTitle: string;
  heroSubtitle?: string;
  siteName: string;
  logoUrl?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  whatsapp?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

// ============================================
// Tipos de Resposta de API
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================
// Tipos de Upload
// ============================================

export interface UploadResult {
  url: string;
  publicId?: string;
}

// ============================================
// Props de Componentes
// ============================================

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  adminOnly?: boolean;
}

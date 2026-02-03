"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Palette, 
  Gamepad2, 
  Gift, 
  LogOut,
  ChevronLeft,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projetos",
    href: "/admin/projetos",
    icon: FolderKanban,
  },
  {
    label: "Aparência",
    href: "/admin/aparencia",
    icon: Palette,
  },
  {
    label: "Duo Zone",
    href: "/duo",
    icon: Gamepad2,
    highlight: true,
  },
  {
    label: "Presente",
    href: "/duo/presente",
    icon: Gift,
    highlight: true,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-[var(--color-secondary)] border-r border-[var(--color-border)] z-50 transition-all duration-300",
          isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "translate-x-0 w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[var(--color-border)]/20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-secondary)] font-bold">
                A
              </div>
              {!isCollapsed && (
                <span className="text-xl font-bold font-[family-name:var(--font-playfair)] text-gradient-gold">
                  ArchiDuo
                </span>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-[var(--color-primary)] text-[var(--color-secondary)]"
                      : item.highlight
                        ? "text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-accent)]/5 hover:text-[var(--color-accent)]"
                  )}
                >
                  <Icon size={20} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                  {item.highlight && !isCollapsed && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Collapse button (desktop) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center p-4 border-t border-[var(--color-border)]/20 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ChevronLeft 
              size={20} 
              className={cn("transition-transform", isCollapsed && "rotate-180")} 
            />
            {!isCollapsed && <span className="ml-2 text-sm">Recolher</span>}
          </button>

          {/* Logout */}
          <div className="p-4 border-t border-[var(--color-border)]/20">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={20} />
              {!isCollapsed && <span className="font-medium">Sair</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({ 
  className, 
  hover = false, 
  padding = "md",
  children, 
  ...props 
}: CardProps) {
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]",
        "shadow-sm",
        paddingStyles[padding],
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3 
      className={cn(
        "text-xl font-semibold text-[var(--color-text-primary)] font-[var(--font-heading)]",
        className
      )} 
      {...props}
    >
      {children}
    </h3>
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn("text-[var(--color-text-secondary)]", className)} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div 
      className={cn(
        "mt-4 pt-4 border-t border-[var(--color-border)] flex items-center gap-4",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

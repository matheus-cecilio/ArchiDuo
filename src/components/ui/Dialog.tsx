import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    maxWidth?: "sm" | "md" | "lg" | "xl";
}

const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
};

export function Dialog({
    open,
    onClose,
    title,
    children,
    maxWidth = "md",
}: DialogProps) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Dialog Container */}
                    <div
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`bg-[var(--color-surface)] rounded-2xl shadow-2xl w-full ${maxWidthClasses[maxWidth]} relative`}
                        >
                            {/* Header */}
                            {title && (
                                <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
                                    <h2 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-[var(--color-text-primary)]">
                                        {title}
                                    </h2>
                                    <button
                                        onClick={onClose}
                                        className="w-8 h-8 rounded-full hover:bg-[var(--color-accent-soft)] flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-5 h-5 text-[var(--color-text-muted)]" />
                                    </button>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6">{children}</div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

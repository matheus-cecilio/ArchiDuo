
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    variant?: "danger" | "warning" | "info";
}

export function ConfirmationModal({
    open,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    isLoading = false,
    variant = "danger",
}: ConfirmationModalProps) {
    const getIcon = () => {
        switch (variant) {
            case "danger":
                return <AlertTriangle className="w-12 h-12 text-red-500" />;
            case "warning":
                return <AlertTriangle className="w-12 h-12 text-yellow-500" />;
            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <div className="flex flex-col items-center text-center gap-6">
                {getIcon()}

                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                        {title}
                    </h3>

                    <p className="text-[var(--color-text-muted)]">
                        {message}
                    </p>
                </div>

                <div className="flex w-full gap-3 justify-center">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1"
                    >
                        {cancelText}
                    </Button>

                    <Button
                        variant={variant === "danger" ? "primary" : "secondary"}
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`flex-1 ${variant === "danger" ? "bg-red-500 hover:bg-red-600 border-red-500 text-white" : ""}`}
                        autoFocus
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Processando...
                            </>
                        ) : (
                            confirmText
                        )}
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

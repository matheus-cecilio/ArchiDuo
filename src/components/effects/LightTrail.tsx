"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef, useId } from "react";

interface LightPointProps {
    color: string;
    glowColor: string;
    delay: number;
    speed: number; // em segundos
}

function LightPoint({ color, glowColor, delay, speed }: LightPointProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const uniqueId = useId(); // SSR-safe unique ID

    const pointX = useMotionValue(0);
    const pointY = useMotionValue(0);

    const [lineStart, setLineStart] = useState({ x: 0, y: 0 });
    const [lineEnd, setLineEnd] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const drawLine = async () => {
            // Delay inicial diferente pra cada ponto
            await new Promise((r) => setTimeout(r, delay));

            while (isMounted) {
                const container = containerRef.current?.parentElement;
                const width = container?.offsetWidth || 1000;
                const height = container?.offsetHeight || 500;

                // Posições aleatórias
                const startX = Math.random() * (width * 0.7) + width * 0.15;
                const startY = Math.random() * (height * 0.6) + height * 0.2;
                const endX = Math.random() * (width * 0.7) + width * 0.15;
                const endY = Math.random() * (height * 0.6) + height * 0.2;

                // Seta posições iniciais
                pointX.jump(startX);
                pointY.jump(startY);
                setLineStart({ x: startX, y: startY });
                setLineEnd({ x: startX, y: startY });

                await new Promise((r) => setTimeout(r, 50));

                if (!isMounted) break;
                setIsVisible(true);

                await new Promise((r) => setTimeout(r, 400));

                if (!isMounted) break;

                const startTime = Date.now();

                // Animação sincronizada
                await new Promise<void>((resolve) => {
                    const updatePosition = () => {
                        if (!isMounted) {
                            resolve();
                            return;
                        }

                        const elapsed = (Date.now() - startTime) / 1000;
                        const progress = Math.min(elapsed / speed, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);

                        const currentX = startX + (endX - startX) * eased;
                        const currentY = startY + (endY - startY) * eased;

                        pointX.set(currentX);
                        pointY.set(currentY);
                        setLineEnd({ x: currentX, y: currentY });

                        if (progress < 1) {
                            requestAnimationFrame(updatePosition);
                        } else {
                            resolve();
                        }
                    };

                    requestAnimationFrame(updatePosition);
                });

                await new Promise((r) => setTimeout(r, 600));

                if (!isMounted) break;
                setIsVisible(false);

                // Pausa aleatória pra dessincronizar
                const pauseTime = 2000 + Math.random() * 1500;
                await new Promise((r) => setTimeout(r, pauseTime));
            }
        };

        const timeout = setTimeout(drawLine, 100);

        return () => {
            isMounted = false;
            clearTimeout(timeout);
        };
    }, [pointX, pointY, delay, speed]);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <filter id={`glow-${uniqueId}`}>
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <motion.line
                    x1={lineStart.x}
                    y1={lineStart.y}
                    x2={lineEnd.x}
                    y2={lineEnd.y}
                    stroke={color}
                    strokeWidth="1"
                    strokeLinecap="round"
                    filter={`url(#glow-${uniqueId})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 0.5 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </svg>

            <motion.div
                className="absolute"
                style={{
                    x: pointX,
                    y: pointY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: isVisible ? 1 : 0,
                        scale: isVisible ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                >
                    <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                            backgroundColor: color,
                            boxShadow: `0 0 8px 4px ${glowColor}`
                        }}
                    />
                    <div
                        className="absolute -inset-1 rounded-full blur-sm"
                        style={{ backgroundColor: glowColor }}
                    />
                    <div
                        className="absolute -inset-2 rounded-full blur-md"
                        style={{ backgroundColor: `${color}40` }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}

export function LightTrail() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Ponto dourado - mais lento */}
            <LightPoint
                color="#D4AF37"
                glowColor="rgba(212, 175, 55, 0.6)"
                delay={500}
                speed={4} // 4 segundos (50% mais lento que 2.5)
            />

            {/* Ponto âmbar - timing diferente */}
            <LightPoint
                color="#F59E0B"
                glowColor="rgba(245, 158, 11, 0.5)"
                delay={2500}
                speed={3.5}
            />
        </div>
    );
}

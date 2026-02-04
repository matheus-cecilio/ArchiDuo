"use client";

import { useEffect, useRef } from "react";

// Tipos de formas arquitetônicas
type ShapeType = "house" | "window" | "door" | "bed" | "couch" | "table" | "lamp" | "plant" | "frame";

interface ArchShape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  floatOffset: number;
  floatSpeed: number;
  opacity: number;
  type: ShapeType;
  drawProgress: number;
  drawSpeed: number;
  isDrawn: boolean;
  delay: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Sistema de zonas para distribuir formas uniformemente (evitando o centro)
    const shapes: ArchShape[] = [];
    const shapeTypes: ShapeType[] = ["house", "window", "door", "bed", "couch", "table", "lamp", "plant", "frame"];
    const edgeMargin = 80;
    
    // Zona de exclusão no centro (onde fica o texto)
    const centerExclusionWidth = canvas.width * 0.45; // 45% da largura no centro
    const centerExclusionHeight = canvas.height * 0.5; // 50% da altura no centro
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Função para verificar se está na zona de exclusão
    const isInExclusionZone = (x: number, y: number): boolean => {
      return (
        x > centerX - centerExclusionWidth / 2 &&
        x < centerX + centerExclusionWidth / 2 &&
        y > centerY - centerExclusionHeight / 2 &&
        y < centerY + centerExclusionHeight / 2
      );
    };
    
    // Dividir a tela em uma grade de zonas (5 colunas x 3 linhas = 15 zonas)
    const cols = 5;
    const rows = 3;
    const zoneWidth = (canvas.width - edgeMargin * 2) / cols;
    const zoneHeight = (canvas.height - edgeMargin * 2) / rows;
    
    // Criar lista de zonas, excluindo as do centro
    const zones: { col: number; row: number }[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Calcular centro da zona
        const zoneCenterX = edgeMargin + col * zoneWidth + zoneWidth / 2;
        const zoneCenterY = edgeMargin + row * zoneHeight + zoneHeight / 2;
        
        // Só adicionar se não estiver na zona de exclusão central
        if (!isInExclusionZone(zoneCenterX, zoneCenterY)) {
          zones.push({ col, row });
        }
      }
    }
    
    // Embaralhar as zonas para distribuição aleatória
    for (let i = zones.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [zones[i], zones[j]] = [zones[j], zones[i]];
    }
    
    // Função para verificar colisão entre duas formas (considera tamanho + margem de segurança + flutuação)
    const checkCollision = (
      x1: number, y1: number, size1: number,
      x2: number, y2: number, size2: number
    ): boolean => {
      // Margem extra para flutuação (floatY = ±6, floatX = ±3) + margem de segurança
      const safetyMargin = 20;
      const minDistance = (size1 / 2) + (size2 / 2) + safetyMargin;
      
      const dx = x1 - x2;
      const dy = y1 - y2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      return distance < minDistance;
    };
    
    // Função para verificar se nova forma colide com alguma existente
    const collidesWithExisting = (x: number, y: number, size: number): boolean => {
      for (const shape of shapes) {
        if (checkCollision(x, y, size, shape.x, shape.y, shape.size)) {
          return true;
        }
      }
      return false;
    };
    
    // Criar formas, uma em cada zona válida
    const numShapes = Math.min(zones.length, 12);
    
    for (let i = 0; i < numShapes; i++) {
      const zone = zones[i];
      const size = Math.random() * 25 + 40;
      
      // Calcular posição aleatória dentro da zona
      const zoneMargin = 30;
      let x = edgeMargin + zone.col * zoneWidth + zoneMargin + Math.random() * (zoneWidth - zoneMargin * 2);
      let y = edgeMargin + zone.row * zoneHeight + zoneMargin + Math.random() * (zoneHeight - zoneMargin * 2);
      
      // Garantir que não está na zona de exclusão (empurrar pra fora se necessário)
      if (isInExclusionZone(x, y)) {
        if (x < centerX) {
          x = centerX - centerExclusionWidth / 2 - 50;
        } else {
          x = centerX + centerExclusionWidth / 2 + 50;
        }
      }
      
      // Tentar encontrar posição sem colisão (máximo 10 tentativas)
      let attempts = 0;
      const maxAttempts = 10;
      
      while (collidesWithExisting(x, y, size) && attempts < maxAttempts) {
        // Tentar nova posição dentro da mesma zona
        x = edgeMargin + zone.col * zoneWidth + zoneMargin + Math.random() * (zoneWidth - zoneMargin * 2);
        y = edgeMargin + zone.row * zoneHeight + zoneMargin + Math.random() * (zoneHeight - zoneMargin * 2);
        
        // Verificar zona de exclusão novamente
        if (isInExclusionZone(x, y)) {
          if (x < centerX) {
            x = centerX - centerExclusionWidth / 2 - 50;
          } else {
            x = centerX + centerExclusionWidth / 2 + 50;
          }
        }
        
        attempts++;
      }
      
      // Só adicionar se não houver colisão (ou após máximo de tentativas, pular esta forma)
      if (!collidesWithExisting(x, y, size)) {
        shapes.push({
          x,
          y,
          size,
          rotation: (Math.random() - 0.5) * 0.1,
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: Math.random() * 0.006 + 0.003,
          opacity: Math.random() * 0.2 + 0.45,
          type: shapeTypes[i % shapeTypes.length],
          drawProgress: 0,
          drawSpeed: Math.random() * 0.004 + 0.003,
          isDrawn: false,
          delay: shapes.length * 30, // Usar shapes.length para delay correto
        });
      }
    }

    // Funções para desenhar cada forma arquitetônica
    const drawHouse = (x: number, y: number, size: number, progress: number) => {
      const s = size;
      // Base da casa
      if (progress > 0) {
        const p = Math.min(progress * 5, 1);
        ctx.beginPath();
        ctx.moveTo(x - s / 2, y + s / 2);
        ctx.lineTo(x - s / 2 + s * p, y + s / 2);
        ctx.stroke();
      }
      if (progress > 0.2) {
        const p = Math.min((progress - 0.2) * 5, 1);
        ctx.beginPath();
        ctx.moveTo(x + s / 2, y + s / 2);
        ctx.lineTo(x + s / 2, y + s / 2 - s * 0.6 * p);
        ctx.stroke();
      }
      if (progress > 0.4) {
        const p = Math.min((progress - 0.4) * 5, 1);
        ctx.beginPath();
        ctx.moveTo(x + s / 2, y - s * 0.1);
        ctx.lineTo(x + s / 2 - s * p, y - s * 0.1);
        ctx.stroke();
      }
      if (progress > 0.6) {
        const p = Math.min((progress - 0.6) * 5, 1);
        ctx.beginPath();
        ctx.moveTo(x - s / 2, y - s * 0.1);
        ctx.lineTo(x - s / 2, y - s * 0.1 + s * 0.6 * p);
        ctx.stroke();
      }
      // Telhado
      if (progress > 0.8) {
        const p = Math.min((progress - 0.8) * 5, 1);
        ctx.beginPath();
        ctx.moveTo(x - s / 2 - s * 0.1, y - s * 0.1);
        ctx.lineTo(x, y - s * 0.1 - s * 0.45 * p);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y - s * 0.55);
        ctx.lineTo(x + (s / 2 + s * 0.1) * p, y - s * 0.1);
        ctx.stroke();
      }
    };

    const drawWindow = (x: number, y: number, size: number, progress: number) => {
      const s = size * 0.7;
      // Moldura
      if (progress > 0) {
        const p = Math.min(progress * 2, 1);
        ctx.beginPath();
        ctx.rect(x - s / 2, y - s / 2, s * p, s * p);
        ctx.stroke();
      }
      // Cruz
      if (progress > 0.5) {
        const p = Math.min((progress - 0.5) * 2, 1);
        ctx.beginPath();
        ctx.moveTo(x, y - s / 2);
        ctx.lineTo(x, y + s / 2 * p);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - s / 2, y);
        ctx.lineTo(x + s / 2 * p, y);
        ctx.stroke();
      }
    };

    const drawDoor = (x: number, y: number, size: number, progress: number) => {
      const s = size;
      const w = s * 0.5;
      const h = s * 0.85;
      // Retângulo
      if (progress > 0) {
        const p = Math.min(progress * 1.3, 1);
        ctx.beginPath();
        ctx.moveTo(x - w / 2, y + h / 2);
        ctx.lineTo(x - w / 2, y - h / 2 * p);
        ctx.stroke();
      }
      if (progress > 0.25) {
        const p = Math.min((progress - 0.25) * 2, 1);
        ctx.beginPath();
        ctx.moveTo(x - w / 2, y - h / 2);
        ctx.lineTo(x - w / 2 + w * p, y - h / 2);
        ctx.stroke();
      }
      if (progress > 0.5) {
        const p = Math.min((progress - 0.5) * 2, 1);
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y - h / 2);
        ctx.lineTo(x + w / 2, y - h / 2 + h * p);
        ctx.stroke();
      }
      // Maçaneta
      if (progress > 0.85) {
        ctx.beginPath();
        ctx.arc(x + w / 4, y + h * 0.1, s * 0.05, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const drawBed = (x: number, y: number, size: number, progress: number) => {
        const h = size * 1.0;
        const w = size * 0.8;

        // Colchão
        if (progress > 0) {
            const p = Math.min(progress * 1.5, 1);

            ctx.beginPath();
            ctx.roundRect(
            x - w / 2,
            y - h / 2,
            w * p,
            h * p,
            size * 0.05
            );
            ctx.stroke();
        }

        // Travesseiros
        if (progress > 0.6) {
            const p = Math.min((progress - 0.6) * 2.5, 1);

            const pillowW = w * 0.4;
            const pillowH = h * 0.18;

            // esquerdo
            ctx.beginPath();
            ctx.roundRect(
            x - w * 0.45,
            y - h * 0.42,
            pillowW * p,
            pillowH * p,
            size * 0.04
            );
            ctx.stroke();

            // direito
            ctx.beginPath();
            ctx.roundRect(
            x + w * 0.05,
            y - h * 0.42,
            pillowW * p,
            pillowH * p,
            size * 0.04
            );
            ctx.stroke();
        }

        // Edredom
        if (progress > 0.4) {
            const p = Math.min((progress - 0.4) * 2.0, 1);

            const blanketX = x - w * 0.46;
            const blanketY = y - h * 0.15;
            const blanketW = w * 0.92 * p;
            const blanketH = h * 0.65 * p;

            // Forma principal do edredom
            ctx.beginPath();
            ctx.roundRect(
            blanketX,
            blanketY,
            blanketW,
            blanketH,
            size * 0.05
            );
            ctx.stroke();

            // Ondas (textura edredom)
            const lines = 3;
            for (let i = 1; i <= lines; i++) {
            const ly = blanketY + (blanketH / (lines + 1)) * i;

            ctx.beginPath();
            ctx.moveTo(blanketX + blanketW * 0.05, ly);

            ctx.quadraticCurveTo(
                x,
                ly + size * 0.05,
                blanketX + blanketW * 0.95,
                ly
            );

            ctx.stroke();
            }
        }
    };



    const drawCouch = (x: number, y: number, size: number, progress: number) => {
      const s = size;
      // Assento do sofá (base larga)
      if (progress > 0) {
        const p = Math.min(progress * 1.8, 1);
        ctx.beginPath();
        ctx.roundRect(x - s * 0.5, y, s * p, s * 0.22 * p, s * 0.03);
        ctx.stroke();
      }
      // Encosto (retângulo atrás, mais alto)
      if (progress > 0.4) {
        const p = Math.min((progress - 0.4) * 2.5, 1);
        ctx.beginPath();
        ctx.roundRect(x - s * 0.5, y - s * 0.35 * p, s, s * 0.35 * p, s * 0.03);
        ctx.stroke();
      }
      // Braço esquerdo
      if (progress > 0.7) {
        const p = Math.min((progress - 0.7) * 3.33, 1);
        ctx.beginPath();
        ctx.roundRect(x - s * 0.6, y - s * 0.2, s * 0.12 * p, s * 0.42, s * 0.02);
        ctx.stroke();
      }
      // Braço direito
      if (progress > 0.8) {
        const p = Math.min((progress - 0.8) * 5, 1);
        ctx.beginPath();
        ctx.roundRect(x + s * 0.48, y - s * 0.2, s * 0.12 * p, s * 0.42, s * 0.02);
        ctx.stroke();
      }
      // Almofadas (2 quadradinhos no assento)
      if (progress > 0.9) {
        ctx.beginPath();
        ctx.moveTo(x - s * 0.15, y + s * 0.05);
        ctx.lineTo(x - s * 0.15, y + s * 0.18);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + s * 0.15, y + s * 0.05);
        ctx.lineTo(x + s * 0.15, y + s * 0.18);
        ctx.stroke();
      }
    };

    const drawTable = (x: number, y: number, size: number, progress: number) => {
      const s = size;
      // Tampo da mesa (retângulo horizontal)
      if (progress > 0) {
        const p = Math.min(progress * 2, 1);
        ctx.beginPath();
        ctx.rect(x - s * 0.5, y - s * 0.2, s * p, s * 0.12 * p);
        ctx.stroke();
      }
      // 4 Pernas
      if (progress > 0.5) {
        const p = Math.min((progress - 0.5) * 2, 1);
        // Perna frontal esquerda
        ctx.beginPath();
        ctx.moveTo(x - s * 0.45, y - s * 0.08);
        ctx.lineTo(x - s * 0.45, y - s * 0.08 + s * 0.5 * p);
        ctx.stroke();
        // Perna frontal direita
        ctx.beginPath();
        ctx.moveTo(x + s * 0.45, y - s * 0.08);
        ctx.lineTo(x + s * 0.45, y - s * 0.08 + s * 0.5 * p);
        ctx.stroke();
        // Perna traseira esquerda (mais curta pra dar perspectiva)
        ctx.beginPath();
        ctx.moveTo(x - s * 0.35, y - s * 0.2);
        ctx.lineTo(x - s * 0.35, y - s * 0.2 + s * 0.35 * p);
        ctx.stroke();
        // Perna traseira direita
        ctx.beginPath();
        ctx.moveTo(x + s * 0.35, y - s * 0.2);
        ctx.lineTo(x + s * 0.35, y - s * 0.2 + s * 0.35 * p);
        ctx.stroke();
      }
    };

    const drawLamp = (x: number, y: number, size: number, progress: number) => {
      const s = size;
      // Base
      if (progress > 0) {
        const p = Math.min(progress * 3.5, 1);
        ctx.beginPath();
        ctx.moveTo(x - s * 0.12, y + s * 0.38);
        ctx.lineTo(x + s * 0.12 * p, y + s * 0.38);
        ctx.stroke();
      }
      // Haste
      if (progress > 0.28) {
        const p = Math.min((progress - 0.28) * 2.8, 1);
        ctx.beginPath();
        ctx.moveTo(x, y + s * 0.38);
        ctx.lineTo(x, y + s * 0.38 - s * 0.55 * p);
        ctx.stroke();
      }
      // Cúpula
      if (progress > 0.65) {
        const p = Math.min((progress - 0.65) * 2.85, 1);
        ctx.beginPath();
        ctx.moveTo(x - s * 0.08, y - s * 0.17);
        ctx.lineTo(x - s * 0.22 * p, y - s * 0.17 - s * 0.25 * p);
        ctx.lineTo(x + s * 0.22 * p, y - s * 0.42);
        ctx.lineTo(x + s * 0.08, y - s * 0.17);
        ctx.stroke();
      }
    };

    const drawPlant = (x: number, y: number, size: number, progress: number) => {
      const s = size;
      // Vaso
      if (progress > 0) {
        const p = Math.min(progress * 2.2, 1);
        ctx.beginPath();
        ctx.moveTo(x - s * 0.18, y + s * 0.25);
        ctx.lineTo(x - s * 0.12, y + s * 0.25 + s * 0.18 * p);
        ctx.lineTo(x + s * 0.12, y + s * 0.43);
        ctx.lineTo(x + s * 0.18, y + s * 0.25);
        ctx.closePath();
        ctx.stroke();
      }
      // Folhas
      if (progress > 0.45) {
        const p = Math.min((progress - 0.45) * 1.82, 1);
        // Central
        ctx.beginPath();
        ctx.moveTo(x, y + s * 0.25);
        ctx.quadraticCurveTo(x + s * 0.05, y, x, y - s * 0.25 * p);
        ctx.stroke();
        // Esquerda
        ctx.beginPath();
        ctx.moveTo(x - s * 0.03, y + s * 0.08);
        ctx.quadraticCurveTo(x - s * 0.28 * p, y - s * 0.05, x - s * 0.22 * p, y - s * 0.12 * p);
        ctx.stroke();
        // Direita
        ctx.beginPath();
        ctx.moveTo(x + s * 0.03, y + s * 0.08);
        ctx.quadraticCurveTo(x + s * 0.28 * p, y - s * 0.05, x + s * 0.22 * p, y - s * 0.12 * p);
        ctx.stroke();
      }
    };

    const drawFrame = (x: number, y: number, size: number, progress: number) => {
      const s = size;
      // Moldura externa (retângulo)
      if (progress > 0) {
        const p = Math.min(progress * 1.4, 1);
        ctx.beginPath();
        ctx.rect(x - s * 0.45, y - s * 0.35, s * 0.9 * p, s * 0.7 * p);
        ctx.stroke();
      }
      // Gancho pra pendurar (no topo)
      if (progress > 0.5) {
        const p = Math.min((progress - 0.5) * 4, 1);
        ctx.beginPath();
        ctx.moveTo(x - s * 0.08, y - s * 0.35);
        ctx.lineTo(x, y - s * 0.35 - s * 0.12 * p);
        ctx.lineTo(x + s * 0.08, y - s * 0.35);
        ctx.stroke();
      }
      // Paisagem dentro (montanhas)
      if (progress > 0.7) {
        const p = Math.min((progress - 0.7) * 3.33, 1);
        // Montanha 1
        ctx.beginPath();
        ctx.moveTo(x - s * 0.35, y + s * 0.25);
        ctx.lineTo(x - s * 0.15, y - s * 0.05 * p);
        ctx.lineTo(x + s * 0.05, y + s * 0.25);
        ctx.stroke();
        // Montanha 2 (maior)
        ctx.beginPath();
        ctx.moveTo(x - s * 0.05, y + s * 0.25);
        ctx.lineTo(x + s * 0.15, y - s * 0.15 * p);
        ctx.lineTo(x + s * 0.35, y + s * 0.25);
        ctx.stroke();
        // Sol
        if (progress > 0.9) {
          ctx.beginPath();
          ctx.arc(x + s * 0.25, y - s * 0.15, s * 0.08, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    const drawFunctions: Record<ShapeType, (x: number, y: number, size: number, progress: number) => void> = {
      house: drawHouse,
      window: drawWindow,
      door: drawDoor,
      bed: drawBed,
      couch: drawCouch,
      table: drawTable,
      lamp: drawLamp,
      plant: drawPlant,
      frame: drawFrame,
    };

    // Grid de perspectiva sutil
    const drawPerspectiveGrid = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.4;

      ctx.strokeStyle = "rgba(212, 175, 55, 0.06)";
      ctx.lineWidth = 1;

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI + time * 0.00003;
        const length = Math.max(canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * length,
          centerY + Math.sin(angle) * length
        );
        ctx.stroke();
      }
    };

    // Desenhar formas
    const drawShapes = () => {
      shapes.forEach((shape) => {
        // Só começa a desenhar após o delay
        if (time < shape.delay) return;

        // Atualizar progresso
        if (!shape.isDrawn && shape.drawProgress < 1) {
          shape.drawProgress += shape.drawSpeed;
          if (shape.drawProgress >= 1) {
            shape.drawProgress = 1;
            shape.isDrawn = true;
          }
        }

        // Flutuação suave
        const floatY = Math.sin(time * shape.floatSpeed + shape.floatOffset) * 6;
        const floatX = Math.cos(time * shape.floatSpeed * 0.8 + shape.floatOffset) * 3;

        ctx.save();
        ctx.translate(shape.x + floatX, shape.y + floatY);
        ctx.rotate(shape.rotation + Math.sin(time * 0.008 + shape.floatOffset) * 0.015);

        // Estilo
        ctx.strokeStyle = `rgba(212, 175, 55, ${shape.opacity * (shape.isDrawn ? 1 : 0.7 + shape.drawProgress * 0.3)})`;
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        
        // Glow mais intenso durante o desenho
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = shape.isDrawn ? 5 : 12;

        drawFunctions[shape.type](0, 0, shape.size, shape.drawProgress);

        ctx.shadowBlur = 0;
        ctx.restore();
      });
    };

    // Cantos decorativos
    const drawCornerDecorations = () => {
      const cornerSize = 90;
      const offset = 35;

      ctx.shadowColor = "#D4AF37";
      ctx.shadowBlur = 8;
      ctx.strokeStyle = "rgba(212, 175, 55, 0.45)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";

      // Top left
      ctx.beginPath();
      ctx.moveTo(offset, offset + cornerSize);
      ctx.lineTo(offset, offset);
      ctx.lineTo(offset + cornerSize, offset);
      ctx.stroke();

      // Top right
      ctx.beginPath();
      ctx.moveTo(canvas.width - offset - cornerSize, offset);
      ctx.lineTo(canvas.width - offset, offset);
      ctx.lineTo(canvas.width - offset, offset + cornerSize);
      ctx.stroke();

      // Bottom left
      ctx.beginPath();
      ctx.moveTo(offset, canvas.height - offset - cornerSize);
      ctx.lineTo(offset, canvas.height - offset);
      ctx.lineTo(offset + cornerSize, canvas.height - offset);
      ctx.stroke();

      // Bottom right
      ctx.beginPath();
      ctx.moveTo(canvas.width - offset - cornerSize, canvas.height - offset);
      ctx.lineTo(canvas.width - offset, canvas.height - offset);
      ctx.lineTo(canvas.width - offset, canvas.height - offset - cornerSize);
      ctx.stroke();

      ctx.shadowBlur = 0;
    };

    // Loop de animação
    const animate = () => {
      time++;

      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawPerspectiveGrid();
      drawShapes();
      drawCornerDecorations();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: "#0A0A0A" }}
    />
  );
}

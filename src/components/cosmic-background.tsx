"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

const DARK_COLORS = [
    "255, 150, 50",   // orange
    "168, 85, 247",   // purple
    "6, 182, 212",    // cyan
    "251, 191, 36",   // amber
    "139, 92, 246",   // violet
];

const LIGHT_COLORS = [
    "234, 88, 12",    // orange darker
    "126, 34, 206",   // purple deeper
    "8, 145, 178",    // cyan deeper
    "217, 119, 6",    // amber deeper
    "109, 40, 217",   // violet deeper
];

function isDarkMode(): boolean {
    return document.documentElement.classList.contains("dark");
}

export function CosmicBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        function resize() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        function initParticles() {
            if (!canvas) return;
            const count = Math.floor((canvas.width * canvas.height) / 8000);
            particlesRef.current = Array.from({ length: Math.min(count, 150) }, () => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                return {
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    size: Math.random() * 2.5 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.6 + 0.2,
                    hue: Math.floor(Math.random() * 5),
                    pulse: Math.random() * Math.PI * 2,
                    pulseSpeed: Math.random() * 0.02 + 0.01,
                };
            });
        }

        function animate() {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const particles = particlesRef.current;
            const dark = isDarkMode();
            const colors = dark ? DARK_COLORS : LIGHT_COLORS;
            const lineColor = dark ? "255, 255, 255" : "0, 0, 0";
            const lineBaseOpacity = dark ? 0.06 : 0.04;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const color = colors[p.hue];

                // Drift
                p.baseX += p.speedX;
                p.baseY += p.speedY;

                // Wrap around
                if (p.baseX < 0) p.baseX = canvas.width;
                if (p.baseX > canvas.width) p.baseX = 0;
                if (p.baseY < 0) p.baseY = canvas.height;
                if (p.baseY > canvas.height) p.baseY = 0;

                // Mouse interaction — parallax push
                const dx = mx - p.baseX;
                const dy = my - p.baseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 200;

                if (dist < maxDist) {
                    const force = (1 - dist / maxDist) * 40;
                    p.x = p.baseX - (dx / dist) * force;
                    p.y = p.baseY - (dy / dist) * force;
                } else {
                    p.x += (p.baseX - p.x) * 0.05;
                    p.y += (p.baseY - p.y) * 0.05;
                }

                // Pulse glow
                p.pulse += p.pulseSpeed;
                const glowOpacity = p.opacity + Math.sin(p.pulse) * 0.15;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${glowOpacity})`;
                ctx.fill();

                // Glow effect for larger particles
                if (p.size > 1.5) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                    const grad = ctx.createRadialGradient(
                        p.x, p.y, 0,
                        p.x, p.y, p.size * 3
                    );
                    grad.addColorStop(0, `rgba(${color}, ${glowOpacity * 0.3})`);
                    grad.addColorStop(1, `rgba(${color}, 0)`);
                    ctx.fillStyle = grad;
                    ctx.fill();
                }

                // Draw connections between close particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (d2 < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${lineColor}, ${lineBaseOpacity * (1 - d2 / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        }

        function handleMouseMove(e: MouseEvent) {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        }

        function handleMouseLeave() {
            mouseRef.current = { x: -1000, y: -1000 };
        }

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0"
            aria-hidden="true"
        />
    );
}

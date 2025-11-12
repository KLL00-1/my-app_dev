// components/BackgroundWaves.jsx
'use client'

import { useEffect, useRef } from "react";

export default function BackgroundWaves({
  background = "#0b0014",
  lineColor = "rgba(124,58,237,0.35)", // #7c3aed with transparency
  speed = 0.03, // увеличение = быстрее
  amplitude = 340,
  frequency = 0.0008,
}) {
  const ref = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let t = 0;

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    function draw() {
      t += 0.016 * speed; // time step
      // background
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      // draw multiple sine lines for layered waves
      const layers = 3;
      for (let i = 0; i < layers; i++) {
        const layerOffset = i * 30;
        const alpha = 0.15 + (i / layers) * 0.35; // different opacities
        ctx.beginPath();
        ctx.lineWidth = 2 + i; // thicker lower layers
        ctx.strokeStyle = rgbaFrom(lineColor, alpha);
        for (let x = 0; x <= width; x += 2) {
          const px = x;
          // combined sine + small noise-like modulation
          const y =
            height * 0.5 +
            Math.sin(x * frequency * (1 + i * 0.15) + t * (1 + i * 0.2)) *
              (amplitude - i * 8) +
            Math.sin(x * (frequency * 0.3) + t * 2 * (i + 1)) * (6 - i * 2);
          if (x === 0) ctx.moveTo(px, y + layerOffset - layers * 8);
          else ctx.lineTo(px, y + layerOffset - layers * 8);
        }
        ctx.stroke();
        ctx.closePath();
      }

      // soft pulsing glow: radial gradient that subtly changes with time
      const g = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        10,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * (0.6 + 0.02 * Math.sin(t * 1.2))
      );
      g.addColorStop(0, "rgba(124,58,237,0.03)");
      g.addColorStop(1, "rgba(11,0,20,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [background, lineColor, speed, amplitude, frequency]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background,
      }}
    >
      <canvas
        ref={ref}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}

// helper to take rgba-ish string or hex and return rgba with alpha
function rgbaFrom(input, alpha = 1) {
  // if already rgba(...) just replace alpha
  if (input.startsWith("rgba")) {
    return input.replace(/rgba\(([^)]+)\)/, (m) => {
      const parts = m.slice(5, -1).split(",");
      parts[3] = ` ${alpha}`;
      return `rgba(${parts.join(",")})`;
    });
  }
  // if rgb(...) or hex
  // simple hex support: #rrggbb
  if (input.startsWith("#")) {
    const hex = input.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  // fallback: try to parse rgb(...)
  if (input.startsWith("rgb(")) {
    return input.replace("rgb(", "rgba(").replace(")", `,${alpha})`);
  }
  // fallback string
  return input;
}

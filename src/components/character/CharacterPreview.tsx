"use client";

import { useRef, useEffect } from "react";
import { CharacterConfig } from "@/types/character";
import { renderCharacter, CHAR_WIDTH, CHAR_HEIGHT } from "@/lib/pixelRenderer";

const SCALE = 5;
const PAD = 2; // padding pixels around character for accessories that extend beyond
const CANVAS_W = (CHAR_WIDTH + PAD * 2) * SCALE;
const CANVAS_H = (CHAR_HEIGHT + PAD * 2) * SCALE;

export default function CharacterPreview({
  config,
}: {
  config: CharacterConfig;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    renderCharacter(ctx, config, SCALE, PAD * SCALE, PAD * SCALE);
  }, [config]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative p-6 flex items-center justify-center"
        style={{
          background: "var(--bg-panel)",
          border: "3px solid var(--pixel-border)",
          boxShadow:
            "4px 4px 0 var(--accent-soft), inset 0 0 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Corner decorations */}
        <div
          className="absolute top-0 left-0 w-2 h-2"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute top-0 right-0 w-2 h-2"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-2 h-2"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-2 h-2"
          style={{ background: "var(--accent)" }}
        />

        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ width: CANVAS_W, height: CANVAS_H }}
        />
      </div>

      {config.name && (
        <p
          className="text-center text-sm"
          style={{ color: "var(--accent)", letterSpacing: "2px" }}
        >
          {config.name}
        </p>
      )}
    </div>
  );
}

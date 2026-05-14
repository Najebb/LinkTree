'use client';

// ============================================================
// STARS LAYER — Multi-depth twinkling stars
// 3 depth layers: far (kecil, lambat), mid, near (besar, cepat)
// Client-only untuk menghindari hydration mismatch
// ============================================================

import { useState, useEffect } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

interface StarLayer {
  stars: Star[];
  label: 'far' | 'mid' | 'near';
}

function generateStarLayer(
  count: number,
  sizeRange: [number, number],
  opacityRange: [number, number],
  durationRange: [number, number],
  idOffset: number,
): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: idOffset + i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
    opacity: Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0],
    delay: Math.random() * 8,
    duration: Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0],
  }));
}

interface StarsLayerProps {
  /** Total star count (dibagi 3 layer) */
  count?: number;
}

export function StarsLayer({ count = 90 }: StarsLayerProps) {
  const [layers, setLayers] = useState<StarLayer[]>([]);

  useEffect(() => {
    const perLayer = Math.floor(count / 3);
    setLayers([
      {
        label: 'far',
        stars: generateStarLayer(perLayer + 10, [0.4, 1.2], [0.15, 0.35], [4, 6], 0),
      },
      {
        label: 'mid',
        stars: generateStarLayer(perLayer, [1.0, 2.0], [0.25, 0.50], [2.5, 4.5], 200),
      },
      {
        label: 'near',
        stars: generateStarLayer(perLayer - 10, [1.8, 3.0], [0.35, 0.70], [1.5, 3.0], 400),
      },
    ]);
  }, [count]);

  if (layers.length === 0) return null;

  return (
    <>
      {layers.map((layer) => (
        <div
          key={layer.label}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          data-depth={layer.label}
        >
          {layer.stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: 'var(--color-star)',
                opacity: star.opacity,
                animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Image, AdaptiveDpr } from "@react-three/drei";
import { Suspense } from "react";

// Real fruit cut-outs floating as tilting planes in 3D — recognizable fruit
// WITH depth, parallax and drift. Positioned to frame the centred hero copy.
const FRUITS = [
  { url: "/fruit/orange.webp", position: [-5.6, 2.1, -1], scale: [3.0, 3.0], speed: 1.5 }, // top-left
  { url: "/fruit/kiwi.webp", position: [5.7, 2.2, -1.5], scale: [3.0, 3.0], speed: 1.3 }, // top-right
  { url: "/fruit/pomegranate.webp", position: [-4.6, 4.9, -7], scale: [1.7, 1.7], speed: 1.2 }, // far upper-left
  { url: "/fruit/lemon.webp", position: [-5.2, -2.6, -1], scale: [2.6, 2.6], speed: 1.9 }, // bottom-left
  { url: "/fruit/watermelon.webp", position: [5.0, -2.7, -0.8], scale: [3.0, 2.0], speed: 1.7 }, // bottom-right
  { url: "/fruit/mint-sprig.webp", position: [4.2, 4.7, -6], scale: [1.9, 1.9], speed: 2.0 }, // far upper-right
];

function Fruit({ url, position, scale, speed }: (typeof FRUITS)[number]) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={2.4}>
      <Image
        url={url}
        position={position as [number, number, number]}
        scale={scale as [number, number]}
        transparent
        toneMapped={false}
      />
    </Float>
  );
}

export default function JuiceScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 11], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        {FRUITS.map((f, i) => (
          <Fruit key={i} {...f} />
        ))}
      </Suspense>
      <AdaptiveDpr pixelated={false} />
    </Canvas>
  );
}

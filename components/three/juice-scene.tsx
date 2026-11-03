"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, AdaptiveDpr } from "@react-three/drei";

// Abstract "juice drops": fruit-coloured liquid spheres that wobble + drift.
// No models, no photos — pure procedural geometry + materials.
// Positioned to FRAME the centred hero copy (corners + sides, centre kept clear).
const BLOBS = [
  { color: "#fb923c", position: [-5.4, 2.0, -1], scale: 1.2, distort: 0.38, speed: 1.6 }, // orange — top-left
  { color: "#22c55e", position: [5.6, 2.1, -1.5], scale: 1.35, distort: 0.32, speed: 1.3 }, // leaf — top-right
  { color: "#a855f7", position: [-2.4, 4.6, -6], scale: 0.7, distort: 0.3, speed: 1.2 }, // grape — far upper-left
  { color: "#facc15", position: [-5.0, -2.4, -1], scale: 0.95, distort: 0.36, speed: 2.0 }, // lemon — bottom-left
  { color: "#fb6f92", position: [5.4, -2.2, -0.5], scale: 1.1, distort: 0.42, speed: 1.8 }, // melon — bottom-right
  { color: "#ef4444", position: [2.6, -4.8, -4.5], scale: 0.75, distort: 0.45, speed: 2.1 }, // watermelon — far lower-right
];

function Blob({ color, position, scale, distort, speed }: (typeof BLOBS)[number]) {
  return (
    <Float speed={speed} rotationIntensity={0.7} floatIntensity={1.5}>
      <mesh position={position as [number, number, number]} scale={scale}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={1.4}
          roughness={0.12}
          metalness={0.25}
          envMapIntensity={0.6}
        />
      </mesh>
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
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 6, 5]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-6, -2, 2]} intensity={0.8} color="#bbf7d0" />
      <pointLight position={[0, 0, 6]} intensity={1.1} color="#fde68a" />
      {BLOBS.map((b, i) => (
        <Blob key={i} {...b} />
      ))}
      <AdaptiveDpr pixelated={false} />
    </Canvas>
  );
}

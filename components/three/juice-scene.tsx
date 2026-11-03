"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, AdaptiveDpr } from "@react-three/drei";

// Abstract "juice drops": fruit-coloured liquid spheres that wobble + drift.
// No models, no photos — pure procedural geometry + materials.
const BLOBS = [
  { color: "#fb923c", position: [-3.3, 1.3, -1], scale: 1.2, distort: 0.38, speed: 1.6 }, // orange
  { color: "#22c55e", position: [3.2, 1.9, -2.5], scale: 1.5, distort: 0.32, speed: 1.3 }, // leaf
  { color: "#fb6f92", position: [2.7, -1.7, 0], scale: 1.0, distort: 0.42, speed: 1.8 }, // melon
  { color: "#facc15", position: [-2.9, -1.9, -1], scale: 0.8, distort: 0.36, speed: 2.0 }, // lemon
  { color: "#a855f7", position: [0.4, 2.7, -3.5], scale: 0.95, distort: 0.3, speed: 1.2 }, // grape
  { color: "#ef4444", position: [-0.7, -2.8, -2], scale: 0.7, distort: 0.45, speed: 2.1 }, // watermelon
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
      camera={{ position: [0, 0, 8], fov: 42 }}
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

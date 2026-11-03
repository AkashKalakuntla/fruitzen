"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Image, AdaptiveDpr } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import type { Group, Mesh, MeshBasicMaterial } from "three";

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
  const [hovered, setHovered] = useState(false);
  const group = useRef<Group>(null);
  const ring = useRef<Mesh>(null);
  const splash = useRef(999); // seconds since last splash started
  const radius = Math.max(scale[0], scale[1]) * 0.55;

  useFrame((_, dt) => {
    // springy scale toward hover target
    if (group.current) {
      const cur = group.current.scale.x;
      const target = hovered ? 1.16 : 1;
      const next = cur + (target - cur) * Math.min(1, dt * 9);
      group.current.scale.setScalar(next);
    }
    // expanding splash ring on hover-enter (~0.7s)
    if (ring.current) {
      splash.current += dt;
      const p = Math.min(1, splash.current / 0.7);
      ring.current.visible = p < 1;
      ring.current.scale.setScalar(radius * (0.85 + p * 2.0));
      (ring.current.material as MeshBasicMaterial).opacity = (1 - p) * 0.65;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={2.4}>
      <group ref={group} position={position as [number, number, number]}>
        <mesh ref={ring} position={[0, 0, -0.1]} visible={false}>
          <ringGeometry args={[0.6, 0.95, 56]} />
          <meshBasicMaterial color="#fb923c" transparent opacity={0} toneMapped={false} side={2} />
        </mesh>
        <Image
          url={url}
          scale={scale as [number, number]}
          transparent
          toneMapped={false}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            splash.current = 0;
          }}
          onPointerOut={() => setHovered(false)}
        />
      </group>
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

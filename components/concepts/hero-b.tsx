"use client";

import { Canvas } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  ContactShadows,
} from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

// CONCEPT B — Cinematic 3D Juice Experience
// A real 3D glass of juice: transmission (refractive) glass + coloured liquid,
// studio Lightformer environment, contact shadow, gentle float. No photo.
function Glass() {
  return (
    <group position={[1.6, -0.2, 0]}>
      {/* liquid */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[1.12, 0.92, 2.1, 64]} />
        <meshPhysicalMaterial
          color="#f97316"
          roughness={0.12}
          transmission={0.35}
          thickness={1.2}
          ior={1.34}
          emissive="#ea580c"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* glass wall */}
      <mesh>
        <cylinderGeometry args={[1.32, 1.02, 3.0, 64, 1, true]} />
        <MeshTransmissionMaterial
          thickness={0.3}
          roughness={0.03}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.05}
          backside
          anisotropy={0.3}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
        />
      </mesh>
      {/* base */}
      <mesh position={[0, -1.52, 0]}>
        <cylinderGeometry args={[1.02, 1.02, 0.12, 64]} />
        <MeshTransmissionMaterial thickness={0.5} roughness={0.05} transmission={1} ior={1.5} />
      </mesh>
    </group>
  );
}

export function HeroB() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-cream">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 7.5], fov: 40 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 7, 4]} intensity={2.2} />
            <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.5}>
              <Glass />
            </Float>
            <ContactShadows position={[1.6, -1.75, 0]} opacity={0.28} scale={9} blur={2.6} far={3.5} />
            <Environment resolution={256}>
              <Lightformer form="rect" intensity={3} position={[4, 4, 4]} scale={7} />
              <Lightformer form="rect" intensity={1.4} position={[-5, 2, -2]} scale={6} color="#bbf7d0" />
              <Lightformer form="rect" intensity={1.2} position={[0, -3, 3]} scale={5} color="#fed7aa" />
            </Environment>
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-6 sm:px-10">
        <div className="max-w-lg">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Image src="/fruitzen-logo.webp" alt="FruitZen" width={1600} height={264} priority className="h-auto w-40" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl"
          >
            Pure juice,
            <br />
            <span className="text-gradient">poured fresh.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-sm text-lg leading-8 text-ink/65"
          >
            Cold-pressed juices &amp; shakes, crafted to order in Kukatpally,
            Hyderabad.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Button href="/menu" size="lg">
              View Menu
            </Button>
            <Button href={site.contact.mapsHref} variant="outline" size="lg">
              Directions
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

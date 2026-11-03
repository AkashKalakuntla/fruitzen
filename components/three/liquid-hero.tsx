"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// Full-screen fluid shader: domain-warped FBM forms slow, flowing liquid
// fields in the brand palette (cream / green / orange) that transform over
// time and bend gently toward the cursor. The centre is kept lighter so the
// wordmark and copy stay legible.
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse; // 0..1

  vec2 hash(vec2 p){
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(hash(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
                   dot(hash(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
               mix(dot(hash(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
                   dot(hash(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main(){
    float aspect = uRes.x / uRes.y;
    vec2 p = vUv; p.x *= aspect;
    float t = uTime * 0.045;

    // cursor bulge
    vec2 mp = uMouse; mp.x *= aspect;
    float md = distance(p, mp);
    float bulge = 0.2 * exp(-md * 2.4);

    // domain warp (flowing liquid)
    vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p * 1.6 + 1.7 * q + vec2(1.7, 9.2) + t * 1.3 + bulge),
                  fbm(p * 1.6 + 1.7 * q + vec2(8.3, 2.8) - t * 1.1));
    float f = fbm(p * 1.6 + 2.0 * r);

    // brand palette
    vec3 cream  = vec3(1.000, 0.992, 0.976);
    vec3 green  = vec3(0.133, 0.772, 0.369);
    vec3 lime   = vec3(0.541, 0.831, 0.247);
    vec3 orange = vec3(0.976, 0.451, 0.086);
    vec3 deep   = vec3(0.078, 0.40, 0.203);

    float F  = clamp(f  * 0.75 + 0.5, 0.0, 1.0);
    float Rx = clamp(r.x * 0.75 + 0.5, 0.0, 1.0);
    float Ry = clamp(r.y * 0.75 + 0.5, 0.0, 1.0);

    vec3 col = cream;
    col = mix(col, green,  smoothstep(0.34, 0.74, F) * 0.90);
    col = mix(col, lime,   smoothstep(0.60, 0.92, Rx) * 0.5);
    // warm orange swirls, tied to their own flow region so they read as
    // distinct ribbons (never muddy green)
    float warm = smoothstep(0.52, 0.9, Ry) * smoothstep(0.35, 0.7, Rx);
    col = mix(col, orange, warm * 0.85);
    col = mix(col, deep,   smoothstep(0.82, 1.0, F) * 0.4);

    // liquid sheen
    float sheen = smoothstep(0.64, 1.0, fbm(p * 3.2 - t * 2.0));
    col += sheen * 0.045;

    // soft global wash toward cream for a calmer, premium feel
    col = mix(col, cream, 0.12);

    // subtle depth vignette in the far corners
    col *= 1.0 - 0.07 * smoothstep(0.45, 1.0, distance(vUv, vec2(0.5)));

    // keep a clean cream pool under the centred copy; liquid frames the edges
    vec2 c = (vUv - vec2(0.5, 0.5)); c.y *= 1.35; // slightly taller safe zone
    float center = smoothstep(0.16, 0.6, length(c));
    col = mix(mix(col, cream, 0.72), col, center);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Liquid() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5)); // target, 0..1
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [],
  );

  // Track the cursor globally so the liquid reacts everywhere, without the
  // canvas ever intercepting clicks (it stays pointer-events: none).
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const u = ref.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uRes.value.set(state.size.width, state.size.height);
    (u.uMouse.value as THREE.Vector2).lerp(mouse.current, 0.04);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function LiquidHero() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Liquid />
    </Canvas>
  );
}

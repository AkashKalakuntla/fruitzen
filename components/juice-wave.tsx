// Flowing juice band at the base of the hero: two layered waves that loop
// seamlessly + rising bubbles. Pure CSS motion (reduced-motion safe via the
// global rule). Decorative, so aria-hidden.

const WAVE = "M0,36 C300,4 600,68 900,36 C1050,20 1150,52 1200,36 L1200,120 L0,120 Z";

const BUBBLES = [
  { left: "8%", size: 10, delay: "0s", dur: "6s" },
  { left: "20%", size: 7, delay: "1.6s", dur: "7s" },
  { left: "34%", size: 12, delay: "0.8s", dur: "5.4s" },
  { left: "48%", size: 8, delay: "2.4s", dur: "6.6s" },
  { left: "62%", size: 11, delay: "1.1s", dur: "5.8s" },
  { left: "76%", size: 6, delay: "3s", dur: "7.4s" },
  { left: "90%", size: 9, delay: "0.4s", dur: "6.2s" },
];

function Wave({
  fill,
  opacity,
  duration,
  heightClass,
}: {
  fill: string;
  opacity: number;
  duration: string;
  heightClass: string;
}) {
  return (
    <div
      className={`absolute bottom-0 left-0 flex w-[200%] ${heightClass}`}
      style={{ animation: `wave-x ${duration} linear infinite`, opacity }}
    >
      {[0, 1].map((i) => (
        <svg
          key={i}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-full w-1/2"
        >
          <path d={WAVE} fill={fill} />
        </svg>
      ))}
    </div>
  );
}

export function JuiceWave() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 overflow-hidden"
    >
      {/* rising bubbles */}
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-6 rounded-full bg-white/60"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animation: `bubble-rise ${b.dur} ease-in ${b.delay} infinite`,
          }}
        />
      ))}
      {/* back wave (slower, lighter) */}
      <Wave fill="var(--color-leaf-300)" opacity={0.55} duration="15s" heightClass="h-28" />
      {/* mid wave */}
      <Wave fill="var(--color-leaf-500)" opacity={0.8} duration="11s" heightClass="h-24" />
      {/* front wave (faster, richer) */}
      <Wave fill="var(--color-leaf-600)" opacity={0.95} duration="8s" heightClass="h-20" />
    </div>
  );
}

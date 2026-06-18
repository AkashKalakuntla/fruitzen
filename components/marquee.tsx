const WORDS = [
  "Fresh",
  "Healthy",
  "You",
  "Cold Pressed",
  "Real Fruits",
  "No Added Sugar",
  "Made Fresh Daily",
  "No Preservatives",
];

/** Infinite scrolling brand ticker. Two identical halves loop seamlessly. */
export function Marquee() {
  const track = [...WORDS, ...WORDS];
  return (
    <div className="overflow-hidden border-y border-leaf-800 bg-leaf-700 py-3 text-white">
      <div className="flex w-max animate-marquee items-center">
        {track.map((word, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-6 text-sm font-extrabold uppercase tracking-widest">
              {word}
            </span>
            <span className="text-orange-400">🍃</span>
          </span>
        ))}
      </div>
    </div>
  );
}

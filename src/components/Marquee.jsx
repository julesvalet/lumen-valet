const words = [
  "Branding",
  "Direction Artistique",
  "Identité Visuelle",
  "Design Graphique",
  "Photographie",
  "Campagnes",
];

export default function Marquee() {
  const track = [...words, ...words, ...words, ...words];

  return (
    <div className="relative flex overflow-hidden border-y border-white/10 bg-noir py-6">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap pr-10">
        {track.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-2xl uppercase tracking-wide text-paper md:text-4xl"
          >
            {word}
            <span className="text-acid">✺</span>
          </span>
        ))}
      </div>
    </div>
  );
}

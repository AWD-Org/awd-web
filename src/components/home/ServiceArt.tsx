const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export default function ServiceArt({ name }: { name: string }) {
  const common = { viewBox: "0 0 240 150", className: "h-full w-full", "aria-hidden": true as const };
  switch (name) {
    case "software":
      return (
        <svg {...common}>
          <rect x="14" y="14" width="212" height="122" rx="14" {...stroke} />
          <path d="M14 40h212" {...stroke} />
          <circle cx="32" cy="27" r="3.5" fill="rgb(var(--color-primary))" />
          <circle cx="46" cy="27" r="3.5" fill="currentColor" opacity=".35" />
          <path d="m64 66-16 14 16 14M176 66l16 14-16 14" {...stroke} stroke="rgb(var(--color-primary))" />
          <path d="m118 62-10 36" {...stroke} />
          <path d="M80 112h60M80 122h36" {...stroke} opacity=".4" />
        </svg>
      );
    case "web":
      return (
        <svg {...common}>
          <rect x="14" y="14" width="212" height="122" rx="14" {...stroke} />
          <path d="M14 38h212" {...stroke} />
          <rect x="28" y="52" width="96" height="40" rx="8" fill="rgb(var(--color-primary))" />
          <rect x="136" y="52" width="76" height="12" rx="6" fill="currentColor" opacity=".25" />
          <rect x="136" y="72" width="56" height="12" rx="6" fill="currentColor" opacity=".25" />
          <rect x="28" y="102" width="52" height="22" rx="8" {...stroke} />
          <rect x="88" y="102" width="52" height="22" rx="8" {...stroke} />
          <rect x="148" y="102" width="52" height="22" rx="8" {...stroke} />
        </svg>
      );
    case "brand":
      return (
        <svg {...common}>
          <circle cx="82" cy="66" r="36" fill="rgb(var(--color-primary))" />
          <circle cx="128" cy="66" r="36" fill="rgb(var(--color-secondary))" opacity=".9" style={{ mixBlendMode: "multiply" }} />
          <circle cx="105" cy="98" r="36" fill="currentColor" opacity=".85" style={{ mixBlendMode: "multiply" }} />
          <text x="176" y="118" fontSize="40" fontWeight="600" fill="currentColor" fontFamily="inherit">Aa</text>
        </svg>
      );
    case "marketing":
      return (
        <svg {...common}>
          <path d="M20 128h200" {...stroke} />
          <rect x="34" y="92" width="26" height="36" rx="6" fill="currentColor" opacity=".25" />
          <rect x="72" y="76" width="26" height="52" rx="6" fill="currentColor" opacity=".4" />
          <rect x="110" y="56" width="26" height="72" rx="6" fill="currentColor" opacity=".6" />
          <rect x="148" y="32" width="26" height="96" rx="6" fill="rgb(var(--color-primary))" />
          <path d="m40 70 40-18 36-4 62-24" {...stroke} stroke="rgb(var(--color-primary))" />
          <circle cx="198" cy="26" r="9" {...stroke} />
          <path d="m205 33 10 10" {...stroke} />
        </svg>
      );
    case "consulting":
      return (
        <svg {...common}>
          <rect x="14" y="52" width="58" height="46" rx="12" {...stroke} />
          <rect x="91" y="52" width="58" height="46" rx="12" {...stroke} />
          <rect x="168" y="52" width="58" height="46" rx="12" fill="rgb(var(--color-primary))" />
          <path d="M76 75h11M153 75h11" {...stroke} />
          <path d="m83 70 5 5-5 5M160 70l5 5-5 5" {...stroke} />
          <path d="M30 110h26M107 110h26M184 110h26" {...stroke} opacity=".4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <g {...stroke} opacity=".45">
            <path d="M52 40 120 75 190 36M52 110l68-35 70 38M120 22v53M120 75v56" />
          </g>
          <circle cx="120" cy="75" r="20" fill="rgb(var(--color-primary))" />
          {[[52, 40], [190, 36], [52, 110], [190, 113], [120, 22], [120, 131]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="9" fill="rgb(var(--color-paper))" stroke="currentColor" strokeWidth="2" />
          ))}
          <path d="m120 66 3.5 6.5 6.5 3.5-6.5 3.5-3.5 6.5-3.5-6.5L110 76l6.5-3.5Z" fill="rgb(var(--color-ink))" />
        </svg>
      );
  }
}

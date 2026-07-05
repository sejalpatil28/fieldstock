const GLYPHS = {
  cutting: (
    <>
      <path d="M20 70 L72 22" strokeLinecap="round" />
      <path d="M20 70 L34 76 L28 62 Z" fill="currentColor" stroke="none" />
      <path d="M60 30 L78 18" strokeLinecap="round" strokeWidth="3" />
    </>
  ),
  carry: (
    <>
      <rect x="20" y="34" width="52" height="46" rx="6" />
      <path d="M32 34 V24 a14 14 0 0 1 28 0 v10" />
      <path d="M20 52 h52" opacity="0.5" />
    </>
  ),
  shelter: (
    <>
      <path d="M14 74 L46 24 L78 74 Z" />
      <path d="M46 24 V74" opacity="0.5" />
      <path d="M30 74 L46 46 L62 74" opacity="0.5" />
    </>
  ),
  fire: (
    <>
      <path d="M46 18 C34 34 30 44 34 56 C24 50 22 40 24 32 C16 46 16 66 32 76 C50 88 68 74 66 56 C64 44 56 38 52 28 C52 40 46 44 42 40 C38 34 42 26 46 18 Z" />
    </>
  ),
  hardware: (
    <>
      <circle cx="46" cy="46" r="14" />
      <circle cx="46" cy="46" r="4" fill="currentColor" stroke="none" />
      <path d="M46 14 v10 M46 68 v10 M14 46 h10 M68 46 h10 M23 23 l7 7 M62 62 l7 7 M23 69 l7 -7 M62 30 l7 -7" strokeLinecap="round" />
    </>
  ),
};

export default function ProductGlyph({ category, className = "" }) {
  return (
    <svg
      className={`product-glyph ${className}`}
      viewBox="0 0 92 92"
      role="img"
      aria-label={`${category} category illustration`}
      stroke="currentColor"
      strokeWidth="2.5"
      fill="none"
    >
      {GLYPHS[category] ?? GLYPHS.hardware}
    </svg>
  );
}
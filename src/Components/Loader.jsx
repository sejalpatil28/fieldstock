export default function Loader({ label = "Loading" }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__spinner" aria-hidden="true" />
      <span>{label}…</span>
    </div>
  );
}

export function CardSkeletonGrid({ count = 6 }) {
  return (
    <div className="product-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div className="product-card product-card--skeleton" key={i}>
          <div className="skeleton skeleton--media" />
          <div className="skeleton skeleton--line" style={{ width: "40%" }} />
          <div className="skeleton skeleton--line" style={{ width: "80%" }} />
          <div className="skeleton skeleton--line" style={{ width: "30%" }} />
        </div>
      ))}
    </div>
  );
}
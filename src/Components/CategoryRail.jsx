import { CATEGORIES } from "../data/products";

export default function CategoryRail({ active, onSelect, counts }) {
  return (
    <nav className="category-rail" aria-label="Filter by category">
      <p className="category-rail__title">Section</p>
      <button
        className={active === "all" ? "is-active" : ""}
        onClick={() => onSelect("all")}
      >
        <span className="category-rail__code">00</span>
        All items
        <span className="category-rail__count">{counts.all ?? 0}</span>
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.slug}
          className={active === c.slug ? "is-active" : ""}
          onClick={() => onSelect(c.slug)}
        >
          <span className="category-rail__code">{c.code}</span>
          {c.label}
          <span className="category-rail__count">{counts[c.slug] ?? 0}</span>
        </button>
      ))}
    </nav>
  );
}
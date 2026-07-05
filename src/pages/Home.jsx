import { Link } from "react-router-dom";
import { CATEGORIES, PRODUCTS } from "../data/products";
import ProductGlyph from "../Components/ProductGlyph";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__text">
          <p className="eyebrow">Catalog No. 04 — {PRODUCTS.length} items in print</p>
          <h1>Goods built to last</h1>
          <Link to="/catalog" className="btn btn--primary">
            Open the catalog
          </Link>
        </div>
      </section>

      <section className="section-block">
        <h2>Sections</h2>
        <div className="category-grid">
          {CATEGORIES.map((c) => (
            <Link to={`/catalog?category=${c.slug}`} className="category-tile" key={c.slug}>
              <ProductGlyph category={c.slug} />
              <div>
                <p className="category-tile__code">{c.code}</p>
                <p className="category-tile__label">{c.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
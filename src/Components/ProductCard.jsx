import { Link } from "react-router-dom";
import ProductGlyph from "./ProductGlyph";

const formatPrice = (n) => `$${n.toFixed(2)}`;

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/catalog/${product.sku}`} className="product-card__media">
        <ProductGlyph category={product.category} />
        {product.badge && <span className="badge badge--warn">{product.badge}</span>}
      </Link>

      <div className="product-card__body">
        <p className="product-card__sku">{product.sku}</p>
        <h3>
          <Link to={`/catalog/${product.sku}`}>{product.name}</Link>
        </h3>
        <p className="product-card__price">{formatPrice(product.price)}</p>

        <dl className="spec-strip">
          <div>
            <dt>Material</dt>
            <dd>{product.material}</dd>
          </div>
          <div>
            <dt>Dims</dt>
            <dd>{product.dims}</dd>
          </div>
          <div>
            <dt>In stock</dt>
            <dd>{product.stock}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
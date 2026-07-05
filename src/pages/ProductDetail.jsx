import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductBySku } from "../services/Api";
import { CATEGORIES } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductGlyph from "../Components/ProductGlyph";
import Loader from "../Components/Loader";

const formatPrice = (n) => `$${n.toFixed(2)}`;

export default function ProductDetail() {
  const { sku } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(undefined); // undefined = loading, null = not found
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setProduct(undefined);
    setQty(1);
    fetchProductBySku(sku).then((result) => {
      if (!cancelled) setProduct(result);
    });
    return () => {
      cancelled = true;
    };
  }, [sku]);

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1800);
    return () => clearTimeout(t);
  }, [justAdded]);

  if (product === undefined) {
    return (
      <div className="detail-loading">
        <Loader label="Loading item" />
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="empty-state">
        <p>SKU “{sku}” isn't in this printing of the catalog.</p>
        <Link to="/catalog" className="btn btn--ghost">
          Back to catalog
        </Link>
      </div>
    );
  }

  const categoryLabel = CATEGORIES.find((c) => c.slug === product.category)?.label ?? product.category;

  return (
    <div className="detail-layout">
      <div className="detail-media">
        <ProductGlyph category={product.category} />
        {product.badge && <span className="badge badge--warn">{product.badge}</span>}
      </div>

      <div className="detail-body">
        <p className="breadcrumb">
          <Link to="/catalog">Catalog</Link> / <Link to={`/catalog?category=${product.category}`}>{categoryLabel}</Link>
        </p>
        <p className="product-card__sku">{product.sku}</p>
        <h1>{product.name}</h1>
        <p className="detail-price">{formatPrice(product.price)}</p>
        <p className="detail-blurb">{product.blurb}</p>

        <dl className="spec-table">
          <div>
            <dt>Material</dt>
            <dd>{product.material}</dd>
          </div>
          <div>
            <dt>Dimensions</dt>
            <dd>{product.dims}</dd>
          </div>
          <div>
            <dt>Weight</dt>
            <dd>{product.weightG} g</dd>
          </div>
          <div>
            <dt>Care</dt>
            <dd>{product.care}</dd>
          </div>
          <div>
            <dt>In stock</dt>
            <dd>{product.stock}</dd>
          </div>
        </dl>

        <form
          className="detail-actions"
          onSubmit={(e) => {
            e.preventDefault();
            addItem(product, qty);
            setJustAdded(true);
          }}
        >
          <label className="qty-field">
            <span>Qty</span>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Math.min(product.stock, Number(e.target.value) || 1)))}
            />
          </label>
          <button type="submit" className="btn btn--primary" disabled={product.stock === 0}>
            {product.stock === 0 ? "Out of stock" : "Add to cart"}
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => navigate("/cart")}>
            View cart
          </button>
        </form>
        <p className="detail-confirm" role="status" aria-live="polite">
          {justAdded ? `Added ${qty} to cart.` : ""}
        </p>
      </div>
    </div>
  );
}
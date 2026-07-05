import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../services/Api";
import { CATEGORIES, PRODUCTS } from "../data/products";
import ProductCard from "../Components/ProductCard";
import CategoryRail from "../Components/CategoryRail";
import { CardSkeletonGrid } from "../Components/Loader";

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const query = searchParams.get("q") ?? "";
  const [products, setProducts] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setProducts(null);
    fetchProducts({ category, query }).then((results) => {
      if (!cancelled) setProducts(results);
    });
    return () => { cancelled = true; };
  }, [category, query]);

  const counts = useMemo(() => {
    const c = { all: PRODUCTS.length };
    for (const cat of CATEGORIES) {
      c[cat.slug] = PRODUCTS.filter((p) => p.category === cat.slug).length;
    }
    return c;
  }, []);

  const handleCategory = (slug) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (slug === "all") next.delete("category");
      else next.set("category", slug);
      return next;
    });
  };

  return (
    <div className="catalog-layout">
      <CategoryRail active={category} onSelect={handleCategory} counts={counts} />
      <div className="catalog-main">
        {products === null ? (
          <CardSkeletonGrid count={6} />
        ) : products.length === 0 ? (
          <p>No items match “{query || "this section"}.”</p>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard product={p} key={p.sku} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
import { PRODUCTS, getProductBySku } from "../data/products";

const LATENCY_MS = 220;
function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS));
}

export async function fetchProducts({ category, query } = {}) {
  let results = PRODUCTS;
  if (category && category !== "all") {
    results = results.filter((p) => p.category === category);
  }
  if (query) {
    const q = query.trim().toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    );
  }
  return delay(results);
}

export async function fetchProductBySku(sku) {
  return delay(getProductBySku(sku));
}
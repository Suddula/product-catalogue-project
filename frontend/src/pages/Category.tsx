import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productApi } from "../services/api";
import type { Product } from "../types";
import { ProductGrid } from "../components/ProductGrid";
import { ErrorMessage, Loading } from "../components/Status";

export function Category() {
  const { category = "" } = useParams();
  const decoded = decodeURIComponent(category);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    setLoading(true); setError("");
    productApi.category(decoded).then(setProducts).catch(() => setError("Unable to load this category."))
      .finally(() => setLoading(false));
  }, [decoded]);
  const featured = products.slice().sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)).slice(0, 2);
  const featuredIds = new Set(featured.map(p => p.id));
  return <main className="container page-content">
    <p className="eyebrow">BROWSE CATEGORY</p><h1 className="page-title">{decoded}</h1>
    {loading ? <Loading /> : error ? <ErrorMessage message={error} /> : <>
      <h2 className="subheading">Top rated</h2><ProductGrid products={featured} />
      <h2 className="subheading">More in {decoded}</h2><ProductGrid products={products.filter(p => !featuredIds.has(p.id))} />
    </>}
  </main>;
}

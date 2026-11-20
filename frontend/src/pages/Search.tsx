import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productApi } from "../services/api";
import type { Product } from "../types";
import { ProductGrid } from "../components/ProductGrid";
import { ErrorMessage, Loading } from "../components/Status";

export function Search() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!query.trim()) { setProducts([]); setLoading(false); return; }
    setLoading(true); setError("");
    productApi.search(query).then(setProducts).catch(() => setError("Search is temporarily unavailable."))
      .finally(() => setLoading(false));
  }, [query]);
  return <main className="container page-content">
    <p className="eyebrow">CATALOGUE SEARCH</p><h1 className="page-title">Results for “{query}”</h1>
    {!loading && !error && <p className="muted">{products.length} matching products</p>}
    {loading ? <Loading /> : error ? <ErrorMessage message={error} /> : <ProductGrid products={products} />}
  </main>;
}

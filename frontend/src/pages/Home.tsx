import { useEffect, useState } from "react";
import { productApi } from "../services/api";
import type { Product } from "../types";
import { ProductGrid } from "../components/ProductGrid";
import { ErrorMessage, Loading } from "../components/Status";

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    productApi.featured().then(setProducts).catch(() => setError("Unable to load featured products. Please try again."))
      .finally(() => setLoading(false));
  }, []);
  return <main className="container">
    <section className="hero">
      <p className="eyebrow light">THE NORTHSTAR COLLECTION</p>
      <h1>Find something<br />worth keeping.</h1>
      <p>Thoughtfully selected essentials for everyday living.</p>
    </section>
    <div className="section-heading"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Featured products</h2></div><span>Our top five</span></div>
    {loading ? <Loading /> : error ? <ErrorMessage message={error} /> : <ProductGrid products={products} />}
  </main>;
}

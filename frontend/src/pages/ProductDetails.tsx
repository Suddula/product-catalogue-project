import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productApi } from "../services/api";
import type { Product } from "../types";
import { ErrorMessage, Loading } from "../components/Status";

export function ProductDetails() {
  const { id = "" } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    productApi.byId(Number(id)).then(setProduct).catch(() => setError("Product not found or unavailable."))
      .finally(() => setLoading(false));
  }, [id]);
  if (loading) return <main className="container page-content"><Loading /></main>;
  if (error || !product) return <main className="container page-content"><ErrorMessage message={error || "Product not found."} /><Link to="/">Back to catalogue</Link></main>;
  return <main className="container page-content">
    <Link to="/" className="back-link">← Back to catalogue</Link>
    <section className="detail-layout">
      <div className="detail-image"><img src={product.image} alt={product.title} /></div>
      <div className="detail-copy">
        <p className="eyebrow">{product.category}</p><h1>{product.title}</h1>
        <p className="detail-price">${product.price.toFixed(2)}</p>
        {product.rating && <p className="rating">★ {product.rating.rate} · {product.rating.count} reviews</p>}
        <p className="description">{product.description}</p>
        <Link className="primary-link" to={`/products/${product.id}/enquire`}>Enquire about this product</Link>
      </div>
    </section>
  </main>;
}

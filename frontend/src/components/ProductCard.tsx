import { Link } from "react-router-dom";
import type { Product } from "../types";

export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card">
    <Link to={`/products/${product.id}`} className="product-image">
      <img src={product.image} alt={product.title} loading="lazy" />
    </Link>
    <div className="product-info">
      <p className="eyebrow">{product.category}</p>
      <Link to={`/products/${product.id}`} className="product-title">{product.title}</Link>
      <div className="product-meta">
        <strong>${product.price.toFixed(2)}</strong>
        {product.rating && <span>★ {product.rating.rate} ({product.rating.count})</span>}
      </div>
    </div>
  </article>;
}

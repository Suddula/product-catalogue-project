import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productApi } from "../services/api";
import type { Product } from "../types";
import { ErrorMessage, Loading } from "../components/Status";

export function Enquiry() {
  const { id = "" } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("I am interested in this product. Please contact me with more information.");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    productApi.byId(Number(id)).then(setProduct).catch(() => setError("Unable to find this product."))
      .finally(() => setLoading(false));
  }, [id]);

  async function submit(event: FormEvent) {
    event.preventDefault(); setError(""); setSuccess("");
    if (!product) return;
    try {
      const result = await productApi.enquire({ name, email, message, productId: product.id, productTitle: product.title });
      setSuccess(result.message);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Unable to submit your enquiry. Please try again.");
    }
  }

  if (loading) return <main className="container page-content"><Loading /></main>;
  if (!product) return <main className="container page-content"><ErrorMessage message={error || "Product not found."} /></main>;
  if (success) return <main className="container page-content success-panel"><div className="success-icon">✓</div><p className="eyebrow">MESSAGE RECEIVED</p><h1>Thank you.</h1><p>{success}</p><Link className="primary-link" to="/">Return to catalogue</Link></main>;

  return <main className="container page-content narrow">
    <Link to={`/products/${product.id}`} className="back-link">← Back to product</Link>
    <p className="eyebrow">PRODUCT ENQUIRY</p><h1 className="page-title">Let's talk about it.</h1>
    <p className="muted">Enquiring about <strong>{product.title}</strong></p>
    {error && <ErrorMessage message={error} />}
    <form className="enquiry-form" onSubmit={submit}>
      <label>Your name<input required minLength={2} maxLength={100} value={name} onChange={e => setName(e.target.value)} /></label>
      <label>Email address<input required type="email" maxLength={254} value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>How can we help?<textarea required minLength={5} maxLength={2000} rows={5} value={message} onChange={e => setMessage(e.target.value)} /></label>
      <button className="submit-button" type="submit">Submit enquiry</button>
    </form>
  </main>;
}

import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productApi } from "../services/api";

export function Header() {
  const [categories, setCategories] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => { productApi.categories().then(setCategories).catch(() => setCategories([])); }, []);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return <header className="site-header">
    <div className="header-inner">
      <Link to="/" className="brand"><span className="brand-mark">N</span> NORTHSTAR</Link>
      <form className="search-form" onSubmit={submit}>
        <input aria-label="Search products" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search the catalogue..." />
        <button type="submit">Search</button>
      </form>
      <nav className="category-nav" aria-label="Product categories">
        <Link to="/">All</Link>
        {categories.map(category => <Link key={category} to={`/category/${encodeURIComponent(category)}`}>{category}</Link>)}
      </nav>
    </div>
  </header>;
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Category } from "./pages/Category";
import { Search } from "./pages/Search";
import { ProductDetails } from "./pages/ProductDetails";
import { Enquiry } from "./pages/Enquiry";
import "./styles.css";

export default function App() {
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:category" element={<Category />} />
      <Route path="/search" element={<Search />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/products/:id/enquire" element={<Enquiry />} />
      <Route path="*" element={<main className="container page-content"><h1>Page not found</h1></main>} />
    </Routes>
    <footer className="site-footer"><div className="container">NORTHSTAR <span>Thoughtfully selected, simply found.</span></div></footer>
  </BrowserRouter>;
}

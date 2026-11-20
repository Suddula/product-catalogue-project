import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { FakeStoreProductProvider } from "./providers/fakeStoreProductProvider";
import { createEmailProvider } from "./providers/emailProvider";
import { ProductController } from "./controllers/productController";
import { EnquiryController } from "./controllers/enquiryController";
import { errorHandler, notFound } from "./middleware/errorHandler";

dotenv.config();

export function createApp() {
  const app = express();
  app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
  app.use(express.json({ limit: "20kb" }));

  const products = new ProductController(new FakeStoreProductProvider());
  const enquiries = new EnquiryController(createEmailProvider());

  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/api/products/featured", products.featured);
  app.get("/api/products/search", products.search);
  app.get("/api/products/categories", products.categories);
  app.get("/api/products/category/:category", products.byCategory);
  app.get("/api/products/:id", products.byId);
  app.get("/api/products", products.all);
  app.post("/api/enquiries", enquiries.submit);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}

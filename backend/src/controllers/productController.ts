import type { Request, Response, NextFunction } from "express";
import type { ProductProvider } from "../types/product";

export class ProductController {
  constructor(private readonly provider: ProductProvider) {}

  featured = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.provider.getAll();
      res.json(products.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)).slice(0, 5));
    } catch (error) { next(error); }
  };

  all = async (_req: Request, res: Response, next: NextFunction) => {
    try { res.json(await this.provider.getAll()); }
    catch (error) { next(error); }
  };

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = String(req.query.q || "").trim().toLowerCase();
      if (!query) return res.status(400).json({ message: "Search query 'q' is required." });
      const products = await this.provider.getAll();
      res.json(products.filter(p =>
        [p.title, p.description, p.category].some(value => value.toLowerCase().includes(query))
      ));
    } catch (error) { next(error); }
  };

  categories = async (_req: Request, res: Response, next: NextFunction) => {
    try { res.json(await this.provider.getCategories()); }
    catch (error) { next(error); }
  };

  byCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = decodeURIComponent(req.params.category).toLowerCase();
      const products = (await this.provider.getAll()).filter(p => p.category.toLowerCase() === category);
      res.json(products);
    } catch (error) { next(error); }
  };

  byId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: "Product ID must be a positive integer." });
      const product = await this.provider.getById(id);
      if (!product) return res.status(404).json({ message: "Product not found." });
      res.json(product);
    } catch (error) { next(error); }
  };
}

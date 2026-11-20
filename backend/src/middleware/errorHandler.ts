import type { Request, Response, NextFunction } from "express";

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: "Route not found." });
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error("Request failed:", error);
  res.status(502).json({ message: "The request could not be completed. Please try again." });
}

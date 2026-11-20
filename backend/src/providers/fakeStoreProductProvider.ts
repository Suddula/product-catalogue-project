import axios from "axios";
import type { Product, ProductProvider } from "../types/product";

export class FakeStoreProductProvider implements ProductProvider {
  private readonly baseUrl = process.env.FAKE_STORE_BASE_URL || "https://fakestoreapi.com";

  async getAll(): Promise<Product[]> {
    const response = await axios.get<Product[]>(`${this.baseUrl}/products`, { timeout: 8000 });
    return response.data;
  }

  async getById(id: number): Promise<Product | null> {
    try {
      const response = await axios.get<Product>(`${this.baseUrl}/products/${id}`, { timeout: 8000 });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) return null;
      throw error;
    }
  }

  async getCategories(): Promise<string[]> {
    const response = await axios.get<string[]>(`${this.baseUrl}/products/categories`, { timeout: 8000 });
    return response.data;
  }
}

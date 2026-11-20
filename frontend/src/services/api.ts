import axios from "axios";
import type { EnquiryPayload, Product } from "../types";

const api = axios.create({ baseURL: "/api", timeout: 10000 });

export const productApi = {
  featured: async () => (await api.get<Product[]>("/products/featured")).data,
  all: async () => (await api.get<Product[]>("/products")).data,
  categories: async () => (await api.get<string[]>("/products/categories")).data,
  category: async (category: string) =>
    (await api.get<Product[]>(`/products/category/${encodeURIComponent(category)}`)).data,
  search: async (query: string) =>
    (await api.get<Product[]>("/products/search", { params: { q: query } })).data,
  byId: async (id: number) => (await api.get<Product>(`/products/${id}`)).data,
  enquire: async (payload: EnquiryPayload) =>
    (await api.post<{ message: string }>("/enquiries", payload)).data
};

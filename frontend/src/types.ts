export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
}
export interface EnquiryPayload {
  name: string;
  email: string;
  message: string;
  productId: number;
  productTitle: string;
}

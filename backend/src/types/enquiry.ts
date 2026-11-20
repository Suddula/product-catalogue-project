export interface Enquiry {
  name: string;
  email: string;
  message: string;
  productId: number;
  productTitle: string;
}

export interface EmailProvider {
  sendEnquiry(enquiry: Enquiry): Promise<void>;
}

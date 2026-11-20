import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import type { EmailProvider } from "../types/enquiry";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(5).max(2000),
  productId: z.number().int().positive(),
  productTitle: z.string().trim().min(1).max(200)
});

export class EnquiryController {
  constructor(private readonly emailProvider: EmailProvider) {}

  submit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = enquirySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: "Please check the enquiry details.",
          errors: parsed.error.flatten().fieldErrors
        });
      }
      await this.emailProvider.sendEnquiry(parsed.data);
      return res.status(201).json({ message: "Thank you. Your enquiry has been submitted." });
    } catch (error) { next(error); }
  };
}

import nodemailer from "nodemailer";
import type { EmailProvider, Enquiry } from "../types/enquiry";

export class ConsoleEmailProvider implements EmailProvider {
  async sendEnquiry(enquiry: Enquiry): Promise<void> {
    console.info("[DEMO EMAIL] Sales enquiry received", {
      to: process.env.SALES_EMAIL || "sales@example.com",
      subject: `Product enquiry: ${enquiry.productTitle}`,
      ...enquiry
    });
  }
}

export class SmtpEmailProvider implements EmailProvider {
  async sendEnquiry(enquiry: Enquiry): Promise<void> {
    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      } : undefined
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SALES_EMAIL || "sales@example.com",
      replyTo: enquiry.email,
      subject: `Product enquiry: ${enquiry.productTitle}`,
      text: `Name: ${enquiry.name}\nEmail: ${enquiry.email}\nProduct: ${enquiry.productTitle} (#${enquiry.productId})\n\n${enquiry.message}`
    });
  }
}

export function createEmailProvider(): EmailProvider {
  return process.env.SMTP_HOST ? new SmtpEmailProvider() : new ConsoleEmailProvider();
}

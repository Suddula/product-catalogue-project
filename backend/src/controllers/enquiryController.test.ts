import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import express from "express";
import { EnquiryController } from "./enquiryController";
import type { EmailProvider } from "../types/enquiry";

describe("POST /enquiries", () => {
  it("validates and sends a valid enquiry", async () => {
    const sendEnquiry = vi.fn().mockResolvedValue(undefined);
    const provider: EmailProvider = { sendEnquiry };
    const app = express();
    app.use(express.json());
    app.post("/enquiries", new EnquiryController(provider).submit);
    const response = await request(app).post("/enquiries").send({
      name: "Alex Smith", email: "alex@example.com", message: "Please contact me.",
      productId: 1, productTitle: "Test product"
    });
    expect(response.status).toBe(201);
    expect(sendEnquiry).toHaveBeenCalledOnce();
  });

  it("rejects invalid email", async () => {
    const provider: EmailProvider = { sendEnquiry: vi.fn() };
    const app = express();
    app.use(express.json());
    app.post("/enquiries", new EnquiryController(provider).submit);
    const response = await request(app).post("/enquiries").send({
      name: "Alex", email: "not-an-email", message: "Hello there",
      productId: 1, productTitle: "Test"
    });
    expect(response.status).toBe(400);
  });
});

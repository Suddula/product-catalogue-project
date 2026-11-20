# Product Catalogue – React + Node.js

A small, extensible product catalogue implementing the supplied AI-Native Engineer challenge.

## Features

- Home page with five featured products (the first five products from the provider are featured by default).
- Category navigation with featured and additional products.
- Search by product title, description or category.
- Product details page.
- Enquiry form with server-side validation, a thank-you state and an email-provider abstraction.
- All product-provider calls happen in the Node.js API; the browser never calls Fake Store API directly.

## Stack

- React, TypeScript, Vite, React Router
- Node.js, Express, TypeScript
- Zod validation, Axios
- Vitest, Supertest, React Testing Library
- Docker support

## Run locally (Node.js 20+)

1. Copy `.env.example` to `backend/.env` (optional; defaults work).
2. Install and start:

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend health: http://localhost:4000/api/health

The frontend dev server proxies `/api` to the backend. Fake Store API must be reachable from the backend.

## Run with Docker

```bash
docker compose up --build
```

Open http://localhost:5173. Docker Compose uses the default console email provider.

## Enquiry email behaviour

The challenge requires a sales inbox notification. To keep the project runnable without a paid account, the default provider logs the email content to the backend console. For real delivery, configure SMTP variables in `backend/.env`; the same `EmailProvider` interface can be implemented with SES or another provider. Do not commit credentials.

## API

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/products/featured` | Five featured products |
| GET | `/api/products` | All products |
| GET | `/api/products/search?q=phone` | Search products |
| GET | `/api/products/categories` | Categories |
| GET | `/api/products/category/:category` | Products in a category |
| GET | `/api/products/:id` | Product details |
| POST | `/api/enquiries` | Submit an enquiry |

## Tests and build

```bash
npm test
npm run build
```

## Design notes

See [DECISIONS.md](./DECISIONS.md) and [AI_USAGE.md](./AI_USAGE.md). Product data and email delivery are behind provider interfaces so they can be replaced without changing UI components or route contracts.

# Decisions and assumptions

## Assumptions

- Fake Store API is the temporary product source, as explicitly allowed by the challenge.
- The five products with the highest provider rating score are featured because no admin curation interface or manually selected product IDs were supplied. A future curation store can replace this rule.
- “Top rated” is interpreted as the highest provider rating score (`rating.rate`); products without a rating are treated as score zero.
- Search matches title, description and category, case-insensitively.
- Enquiry fields are name, email and message. Product ID and title are attached by the UI.
- SMTP is optional. Without SMTP configuration, the application logs a clearly labelled email payload for local demonstration; real inbox delivery requires configuring an SMTP or cloud email provider.

## Simplifications

- No authentication, admin catalogue management, inventory, checkout or payment flow because they are outside the acceptance criteria.
- No database: product metadata is external and enquiry delivery is provider-based. A persistent enquiry repository can be added when required.
- Styling is intentionally neutral until final brand assets are supplied.

## Growth path

- Replace `FakeStoreProductProvider` with a database-backed provider without changing controllers or frontend API contracts.
- Replace `ConsoleEmailProvider` with AWS SES or another implementation of `EmailProvider`.
- Add persistent featured-product curation and enquiry storage.
- Add structured logging, rate limiting, observability, authentication for admin workflows and deployment infrastructure.

## Next day of work

- Add PostgreSQL persistence for enquiries and curated featured product IDs.
- Add end-to-end browser tests and accessibility review.
- Add CI pipeline, deployment manifests and AWS SES integration.

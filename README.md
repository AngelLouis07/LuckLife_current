# Luck Life International

A wellness storefront with product browsing, multi-currency price displays, and local order checkout for Nigeria and the UK.

## What it is

Luck Life International showcases health supplements, personal-care products, skincare, teas, and beverages. It is for shoppers exploring everyday wellness products, with checkout currently limited to delivery addresses in Nigeria and the UK. Orders are saved in the shopper's browser; online payments and automatic order delivery are not connected yet.

## Features

- Product catalog with category filters, search, sorting, product details, and a cart with quantity controls.
- Searchable, display-only currency switcher: converts `price_usd` using live exchange rates, with a timestamped local cache. Supports ISO 4217 currencies reported by the browser that have an available rate; currencies without rates are omitted.
- Location-based default currency: Nigeria → NGN, United Kingdom → GBP, elsewhere → USD. Failed IP detection silently falls back to USD; a manually selected currency is saved and takes precedence.
- Nigeria and UK checkout with an editable delivery country. Nigeria uses stored `price_ngn`; the UK uses stored `price_gbp`. The cart and order summary show the exact regional currency and total, independent of browsing currency.
- Other delivery countries cannot check out and see: “We currently only ship to Nigeria and the UK.”
- Orders saved locally with status `awaiting_payment_instructions` and a confirmation screen. No money is collected; Paystack and Stripe are not yet integrated, and payment instructions are not automatically sent.

## System design

```text
React UI: home / products / checkout
  |
  +-- Product data: price_usd / price_ngn / price_gbp
  |     +-- USD x exchange rate --> Price --> browsing display
  |     +-- NGN or GBP price ----> Cart --> exact order total
  |
  +-- CurrencyContext
  |     +-- Frankfurter API --> rates + timestamp --> localStorage
  |     +-- ipapi.co -------> initial currency + delivery country
  |     +-- manual choice --> saved browsing currency
  |
  +-- startPayment({ amount, currency, country, order })
        +-- localStorage order stub --> confirmation (unpaid)
        +-- TODO: Paystack (NGN) / Stripe (GBP)
```

**Frontend:** React 19, React Router 7, Create React App (`react-scripts`), and plain CSS. React Context shares currency and cart state. Routes include `/`, `/products`, and `/checkout`; the app has no order-processing backend.

**Price data:** `src/data/products.js` stores three prices per product. The NGN and GBP prices were seeded once from USD rates on 28 October 2026 and remain fixed until edited. The shared `Price` component formats browsing conversions and exact checkout amounts separately with `Intl.NumberFormat`. Checkout totals use integer minor units, never live exchange rates.

**Exchange rates:** `src/services/currency.js` fetches USD-based rates from Frankfurter once per page load, deduplicating concurrent requests. Valid rates and a timestamp are saved under `lucklife.rates` in localStorage. Failed refreshes use the last valid cache; without an available rate, the display falls back to USD. Currency options use `Intl.supportedValuesOf('currency')`, with a USD/NGN/GBP fallback for browsers without that API.

**Geolocation:** One IP lookup per page load through `ipapi.co` supplies initial defaults only. Both browsing currency and delivery country remain editable, and a delayed lookup cannot overwrite a manual choice. The saved browsing currency uses `lucklife.currency`; if detection fails, the delivery country remains unselected.

**Payments:** `src/services/payment.js` exposes a single `startPayment()` function. Its stub validates order totals and saves orders under `lucklife.orders` before showing confirmation. Orders remain in that browser and are not sent to a merchant. The Paystack and Stripe SDKs are installed but unused; a TODO block marks their future integration point. Public keys come from environment variables, and supplying keys alone does not enable real charges.

## Running locally

Install dependencies:

```sh
npm install
```

Optionally copy the environment template:

```sh
cp .env.example .env.local
```

These public keys are optional; leave them blank to use the stub:

```dotenv
PAYSTACK_PUBLIC_KEY=
STRIPE_PUBLIC_KEY=
```

The start/build wrapper maps these names to Create React App's `REACT_APP_*` variables. Only public keys belong here; never put provider secret keys in the frontend.

Start the development server:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000), or visit `/products` for the catalog. Add a product and select Nigeria or the United Kingdom in the cart to proceed to checkout.

Run tests or create a production build:

```sh
npm test -- --watchAll=false
npm run build
```

Production output is written to `build/`. Configure hosting to serve `index.html` for client-side routes such as `/products` and `/checkout`.

## Roadmap / not-yet-built

- Real Paystack NGN and Stripe GBP payments, backed by server-side price validation and webhook verification.
- Server-side order storage, merchant notifications, and delivery of payment instructions.
- Shipping charges, tax calculation, and fulfillment workflows.
- Checkout support for additional countries and authoritative regional prices.

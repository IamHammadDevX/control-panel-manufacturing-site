# Orbit Controls

Premium control panel manufacturing and industrial automation website for OEMs, system integrators, machine builders, and industrial automation teams across North America.

## Overview

Orbit Controls communicates a precision-first manufacturing capability through a cinematic engineering interface. The site is designed to build trust quickly with clear messaging around UL 508A, build-to-print production, rigorous testing, and dependable delivery.

## Features

- Responsive industrial website with desktop and mobile navigation
- Home, About, Control Panel, and Contact pages
- Animated blueprint-inspired hero visual
- Scroll reveals, staggered entrances, hover interactions, counters, and process timeline motion
- Control panel manufacturing capability and industry sections
- Frontend-only request-a-quote form with success state
- SEO title, description, and Open Graph metadata for each route
- Accessible buttons, form labels, navigation, and image alt text
- No external stock-image dependency

## Pages

- `/` — Overview, manufacturing strengths, process, industries, quality, and final CTA
- `/about` — Company story, manufacturing experience, quality assurance, footprint, and mission
- `/control-panel` — Control panel capabilities, documentation, quality process, and production support
- `/contact` — Contact information, quote request form, quote preparation guidance, and FAQs

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Wouter
- Lucide React
- pnpm workspaces

## Local Development

From the repository root:

```bash
pnpm install
PORT=4173 BASE_PATH=/ pnpm --filter @workspace/orbit-controls run dev
```

The site will be available at `http://localhost:4173`.

When running through the Replit workflow, `PORT` and `BASE_PATH` are supplied automatically.

## Validation

Run the frontend typecheck:

```bash
pnpm --filter @workspace/orbit-controls run typecheck
```

Create a production build:

```bash
PORT=4173 BASE_PATH=/ pnpm --filter @workspace/orbit-controls run build
```

## Project Structure

```text
artifacts/orbit-controls/
├── src/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Content and Branding

The site uses Orbit Controls as the working company identity. Logo, contact details, project photography, and production-specific claims can be replaced with final brand assets and verified company information when available.
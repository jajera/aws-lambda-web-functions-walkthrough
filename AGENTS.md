# Agent guide — aws-lambda-web-functions-walkthrough

Read this and `.kiro/steering/` before changing docs or demo code.
Cursor rules under `.cursor/rules/` mirror the same constraints.
Full plan: `.kiro/specs/aws-lambda-web-functions-walkthrough/`.

## What this repo is

Console-first Starlight walkthrough for **AWS Lambda Web Functions**: local
listen → console create (`wf-hello` / endpoint `dev`) → prove with curl →
optional CLI → teardown. Astro + Patina. No Terraform. No CI that mutates AWS.

## Before you edit

| Topic | File |
| --- | --- |
| Product / non-goals | `.kiro/steering/product.md` |
| Stack and layout | `.kiro/steering/tech.md` |
| Authoring order | `.kiro/steering/structure.md` |
| Mutation guard | `.kiro/steering/lab-safety.md` |
| AWS claims | `.kiro/steering/aws-source-lock.md` |
| Docs voice + screenshots | `.kiro/steering/docs-pattern.md` |
| Glossary terms | `.kiro/steering/glossary.md` → `src/data/glossary.ts` |

## Screenshots

- Use `![PLACEHOLDER: …](/images/placeholder.svg)` until real console shots exist.
- **Never invent or AI-generate** console UI images.
- At capture pass: **ask the user** for each shot (Region, Web Functions nav,
  create form, Revisions, Endpoints, delete). Wire into `public/images/` and
  replace placeholders. Re-ask if any are still missing.
- Do not block other authoring on screenshots — placeholders are fine until then.

## Docs glossary

- Import `Tooltip` from `@/components/Tooltip.astro` on pages that use terms.
- Prefer first useful occurrence per page; always pass a `label`.
- With `Tooltip` imported, use HTML `<table>` (see `.kiro/steering/markdown-tables.md`).

## Mutation guard

```bash
export LAMBDA_WEB_ALLOW_AWS=1   # operator only, deliberate lab
```

## Docs site

```bash
npm ci
npm run dev
```

Sidebar: **Before you begin** → **Walkthrough** (Teardown last) → **Reference**.

## Hygiene

- Keep markdown-lint + commitmsg-conform workflows.
- Commit subjects: conform types, US spelling, body required.
- Lab names: function `wf-hello`, endpoint `dev`.

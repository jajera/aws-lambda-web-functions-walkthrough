---
inclusion: always
---

# Docs pattern

## Generator

Astro Starlight under `src/content/docs/`. Sidebar order matches the walkthrough.

## Voice

- Prefer **ASCII / Markdown diagrams** over prose; keep steps short.
- Mark drafts with `{/* KIRO: replace ASCII with official AWS icon diagrams */}`
  so Kiro can swap in Architecture Icons later.
- Cost and teardown get their own callouts / pages — not a footnote.
- Import `Tooltip` for glossary terms on first useful occurrence.
- With `Tooltip` in tables, use HTML `<table>` (see `markdown-tables.md`).

## Screenshots

- Until real shots exist: `![PLACEHOLDER: description](/images/placeholder.svg)`
- **Never invent or AI-generate** console UI.
- Capture pass: **ask the user** for each shot (Region, Web Functions nav,
  create form, Revisions, Endpoints, delete). Continue other work with
  placeholders; do not block the whole build waiting.
- Save user files under `public/images/` and replace placeholders.

## CLI presentation

- Command, then result in the next ` ```text ` block.
- Never publish real account IDs or live secrets. Placeholders: account
  `123456789012`; domain shape `….lambda-web.<region>.on.aws`.
- CLI gate (on Prerequisites, optional path): `aws lambda-web help` —
  document `aws update` on failure. Tooling stays Node/curl only.

## Page order

1. Home
2. Tooling
3. Prerequisites
4. Concepts
5. Local listen
6. Console create
7. Revisions and endpoints
8. Prove
9. Logs peek
10. Optional Express / CLI
11. Go deeper (stretch links)
12. Teardown
13. Troubleshooting
14. AWS docs / references

## Claims

Every AWS behavioural claim → `aws-source-lock.md` or docs.aws.amazon.com.

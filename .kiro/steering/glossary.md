---
inclusion: fileMatch
fileMatchPattern: "src/data/glossary*"
---

# Glossary conventions

- Glossary lives in `src/data/glossary.ts`
- Keys: lowercase kebab-case, alphabetical
- One or two sentences; walkthrough-specific context OK
- Import `Tooltip`; pass `label`; HTML `<table>` when Tooltip is inside tables
  (see `markdown-tables.md`)

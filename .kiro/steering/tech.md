---
inclusion: always
---

# Tech

## Cloud

- Prefer a Web Functions launch Region: `us-east-1`, `us-east-2`, `us-west-2`,
  `ap-northeast-1`, `eu-west-1`.
- Runtime: Node.js 24 (`nodejs24.x`), Arm64, 2 vCPU / 2 GB per environment.
- Primary path: AWS Management Console + `curl`.
- Optional: AWS CLI v2 with `aws lambda-web` (`aws lambda-web help` must succeed).
- No Terraform / CDK / SAM in the happy path.

## Local

- Node.js 24+ for local listen / Express demo under `demo/`.
- Env: `AWS_LAMBDA_HTTP_ENDPOINT=127.0.0.1:3000`

## Docs site

- Astro + Starlight + Patina.
- Live: `https://aws-lambda-web-functions-walkthrough.johna.kiwi/`

## Repo layout

| Path | Purpose |
| --- | --- |
| `src/content/docs/` | Starlight walkthrough pages |
| `src/data/glossary.ts` | Tooltip glossary |
| `demo/` | Optional Express stub |
| `public/images/` | User-provided console screenshots |
| `.kiro/specs/.../` | Plan (requirements / design / tasks) |

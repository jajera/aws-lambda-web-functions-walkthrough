# Requirements — aws-lambda-web-functions-walkthrough

## Goal

Console-first Starlight walkthrough for **AWS Lambda Web Functions**. Teach the
three resources (Web Function, revision, endpoint) in the Lambda UI, prove with
curl, optional CLI iterate, full teardown. Astro + Patina. No Terraform.

Reference shell: `jajera/aws-iot-greengrass-v2-edge-walkthrough`.
Do **not** clone AWS docs Hello World or the Compute Blog / Serverless Land SSE
dashboard — differentiate on console UX + mental model.

## Research (2026-10)

| Source | What it already covers | Our gap to fill |
| --- | --- | --- |
| [Create Web Function](https://docs.aws.amazon.com/lambda/latest/dg/web-functions-create.html) | Console + `aws lambda-web deploy --hello-world` | Step screenshots, Endpoints/Revisions tabs, Pending→Active |
| [News Blog](https://aws.amazon.com/blogs/aws/announcing-aws-lambda-web-functions-for-fast-consistent-web-app-performance-anywhere/) | CLI-first Express deploy, MultiRegion one-liner | Console path; region-missing nav gotcha |
| [Compute Blog + Serverless Land SSE](https://serverlessland.com/patterns/lambda-web-sse-dashboard-nodejs-sam) | Concurrency + active-CPU via dashboard | Link out; do not rebuild |
| [Serverless Land MCP](https://serverlessland.com/patterns/lambda-web-mcp-server-nodejs-awscli) | IamAuth + Streamable HTTP | Link out only |
| [Samples](https://docs.aws.amazon.com/lambda/latest/dg/web-functions-samples.html) | Express, Hono, SSE route, `/region` | Use Express (+ tiny SSE optional); link Hono/MultiRegion |
| [Best practices](https://docs.aws.amazon.com/lambda/latest/dg/web-functions-best-practices.html) | Public endpoints, Arm64, concurrency, rollback | Bake critical warnings into lab steps |
| [Create / Clean up](https://docs.aws.amazon.com/lambda/latest/dg/web-functions-create.html) | `aws lambda-web` prereq; delete leaves IAM/S3/logs | Tooling page + full teardown checklist |
| [Troubleshooting](https://docs.aws.amazon.com/lambda/latest/dg/web-functions-troubleshooting.html) | `invalid choice: lambda-web` → update CLI | Document check + `aws update` |

**Local evidence (this workspace):** `aws-cli/2.37.4` →
`Found invalid choice 'lambda-web'`. Readers on older CLI v2 **must** upgrade
before any `aws lambda-web` step. Gate with `aws lambda-web help`, not a guessed
version number alone (docs: CLI v2 that includes `lambda-web`; `aws update` for
official installers).

## Lab constants

| Resource | Fixed name (copy-paste) |
| --- | --- |
| Web Function | `wf-hello` |
| Endpoint (console) | `dev` |
| CLI deploy name | `wf-hello` (same) |

Use these everywhere (create, prove, teardown) so commands and screenshots match.

## Must

1. Astro + Starlight + Patina; `astro-pages-deploy`.
2. Region gate (5 launch Regions); explain missing **Web Functions** nav.
3. Concepts: Web vs Event vs MicroVMs; function / revision / endpoint;
   `AWS_LAMBDA_HTTP_ENDPOINT`; Node.js 24 Arm64 2 GB; multi-concurrency;
   **when not to use** Web Functions (Event / MicroVMs card).
4. **Home:** time estimate + expected spend / idle-memory note (scale-to-zero,
   cold start, delete when done).
5. **Prerequisites / tooling** (required pages):
   - Always: AWS account, supported Region, browser, `curl`.
   - **IAM lists** split by path:
     - Console create: manage Web Functions, PassRole, console-created role/S3.
     - CLI `deploy`: `sts:GetCallerIdentity`, S3 list/put/get/version, and if
       defaults are created: IAM get/create role + put role policy, S3 create
       bucket + policy + versioning (per AWS create docs).
   - Local demo: Node.js 24+.
   - **CLI split:** console-only primary path does **not** require `lambda-web`.
     Optional CLI path **and** CLI leftover cleanup **do**.
   - Gate: `aws --version` → `aws lambda-web help` → if invalid choice,
     `aws update` → re-check. Link CLI install/update + troubleshooting docs.
   - Console vs curl vs `aws lambda-web` matrix.
6. **Local first:** Hello/Express with
   `AWS_LAMBDA_HTTP_ENDPOINT=127.0.0.1:3000` before cloud.
7. **Console path:** Create `wf-hello` (Hello World) → Pending→Active →
   Endpoints tab → prove.
8. **Prove:**
   - `curl -i` show body + `lambda-web-request-id` (and log-stream header if
     present) for Logs correlation.
   - **Active ≠ healthy:** revision/endpoint can be Active while the app never
     listened; fail path + causes (wrong host/port, wrong entrypoint,
     package layout).
9. **Security:** ApplicationManaged = public; delete when done;
   CloudFront/IamAuth mentioned, not labbed.
10. **Cost / billing (short):** requests + active CPU + memory while env exists;
    idle wait on I/O is not active CPU; warm memory still accrues; scale-to-zero
    cold start trade-off.
11. Optional: Express zip in console **or** `aws lambda-web deploy` (after CLI
    gate) → new revision under LatestRevision; Arm64 note if native deps.
12. **Logs peek (required short step):** after one successful curl, open
    CloudWatch Logs for the Web Function / confirm request id in app or system
    logs (exact log group name locked in evidence pass).
13. Stretch: tiny SSE `/events` **or** link Serverless Land SSE — not a fork.
14. **Teardown last (required):**
    - Console delete `wf-hello` **or**
      `aws lambda-web delete-web-function --function-name wf-hello`.
    - Leftovers if CLI `deploy` used: role `awscli-lambdaweb-wf-hello`, S3
      prefix `lambda-web/wf-hello/` (shared bucket — do not delete bucket
      blindly), CloudWatch log group(s).
    - Verify: list empty for name; curl fails.
15. **Screenshots from the user (required process):**
    - Pages use `![PLACEHOLDER: …](placeholder)` until real shots exist.
    - Agents must **not** invent or AI-generate console UI images.
    - At capture pass, agent **must explicitly ask the user** for each shot
      (checklist in design.md): Region, Web Functions nav, create form,
      Revisions, Endpoints, delete confirm.
    - User provides screenshots (chat / files / `public/images/`); agent wires
      them in and re-asks for any still missing.
16. Agent configs + `LAMBDA_WEB_ALLOW_AWS=1`.
17. GHA: deploy, markdown-lint, commitmsg-conform, auto-merge, Dependabot.
18. No CI that mutates AWS Web Functions.
19. **Publish:** README; Guides hub (`serverless`); custom domain
    `aws-lambda-web-functions-walkthrough.johna.kiwi`; catalogue / pages-index
    if needed.

## Must not (v1)

- Rebuild SSE metrics dashboard or MCP pattern.
- MultiRegion / VPC / CloudFront+WAF / IamAuth signing as required deep labs.
- Terraform / CDK / SAM happy path.
- Non-Node runtimes; MicroVMs tutorial.
- Native deps without Arm64 packaging note.
- Teardown that only deletes the function and ignores CLI-created leftovers when
  the reader used `aws lambda-web deploy`.
- Fake or AI-generated console screenshots; finalizing UI pages without asking
  the user for real shots.

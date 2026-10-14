# Design — aws-lambda-web-functions-walkthrough

## Why this shape (research)

Official getting-started is **CLI-first** (`--hello-world`, Express +
`aws lambda-web deploy`). Compute Blog / Serverless Land already own the **SSE
dashboard** (concurrency + active-CPU story). Console create exists in docs but
has little screenshot / navigation teaching.

**Differentiation:** console UI walkthrough that makes the three resources and
lifecycle obvious, with local-run parity, optional CLI, prove/logs/cost honesty,
and full teardown — not another clone of AWS samples.

## Product

|  |
| --- |
| Audience \| Node web-framework builders new to Web Functions |
| Primary path \| Local listen → console create `wf-hello` → Active → curl -i → Logs peek → teardown |
| Optional \| Express zip or `aws lambda-web deploy` + new revision |
| Stretch \| Tiny SSE route **or** outbound link to Serverless Land SSE |
| Site \| `https://aws-lambda-web-functions-walkthrough.johna.kiwi` |
| Lab names \| Function `wf-hello`, endpoint `dev` |

## Outcomes

1. Find **Web Functions** (not Event Functions / MicroVMs); fix wrong Region.
2. Name the three resources and Pending→Active independently.
3. Bind on `AWS_LAMBDA_HTTP_ENDPOINT` locally and in cloud.
4. Know which steps need console vs curl vs a **new** AWS CLI (`lambda-web`).
5. Prove with headers; know Active ≠ healthy.
6. Treat ApplicationManaged endpoints as public; understand cost/idle briefly.
7. Complete teardown (function + CLI leftovers).
8. Know when **not** to use Web Functions (Event / MicroVMs / Serverless Land).

## Lab naming

Everywhere: function `wf-hello`, endpoint `dev`. Teardown and CLI examples use
these names only. Screenshot captions match.

## Console vs CLI (tooling page)

| Step | Console | curl / browser | `aws lambda-web` |
| --- | --- | --- | --- |
| Create Hello World + endpoint | Primary | — | Optional (`deploy --hello-world`) |
| Wait Active / copy domain | Primary (UI tabs) | — | Optional (`wait` / `get-web-function-endpoint`) |
| Prove | — | Primary (`curl -i`) | — |
| Logs peek | CloudWatch console | — | Optional `logs` filter by request id |
| Upload Express zip | Optional | — | Optional (`deploy --code`) |
| Delete function + endpoints + revisions | Primary | — | Primary alternative (`delete-web-function`) |
| Delete CLI leftovers (role / S3 / log groups) | IAM / S3 / Logs consoles | — | CLI for scripted leftover cleanup |

**Prove does not require CLI.** Optional CLI path requires `aws lambda-web help`
success. Older v2 (e.g. 2.37.4) → `invalid choice: lambda-web` → `aws update`.

Prefer help probe over a hard-coded minimum version; lock verified CLI version
in `aws-source-lock.md` at evidence pass.

## IAM (prerequisites page)

Two short tables (not a full policy JSON lab):

**Console path:** permissions to create/manage Web Functions, pass execution
role (`iam:PassRole`), use console-created role and code bucket.

**CLI `deploy` path (additive):** `sts:GetCallerIdentity`; S3
`ListBucket` / `PutObject` / `GetObject` / `GetObjectVersion` on the deploy
bucket; if defaults created: `iam:GetRole` / `CreateRole` / `PutRolePolicy`,
`s3:CreateBucket` / `PutBucketPolicy` / `PutBucketVersioning` (per AWS docs).

## Cost / billing (home + short callout)

One paragraph + bullets: pay for requests, **active CPU**, memory for the life
of each execution environment, data transfer. Waiting on DB/API uses little
active CPU; memory still accrues while the env exists. Scale-to-zero can add
cold-start latency. Lab: delete when finished; expected spend is pennies if
torn down promptly.

## Prove + Active ≠ healthy

1. Copy domain from Endpoints tab.
2. `curl -i https://…/` — expect 200; note `lambda-web-request-id` (and
   log-stream header if present).
3. If Active but curl fails: check listen address (`AWS_LAMBDA_HTTP_ENDPOINT`),
   entrypoint (`index.js` / `AWS_LAMBDA_NODEJS_ENTRYPOINT`), package root,
   startup within ~10s; open Logs.
4. Logs peek: find the request id from step 2.

## Stack (Greengrass reference)

Copy from `aws-iot-greengrass-v2-edge-walkthrough`: Astro/Starlight/Patina,
ThemeSelect/Head/Tooltip, AGENTS + `.kiro/steering` + `.cursor/rules`, mutation
hook, markdown-lint / commitmsg-conform / astro-pages-deploy / auto-merge /
Dependabot. Strip IoT/firmware/`artifacts/`.

Mutation flag: `LAMBDA_WEB_ALLOW_AWS=1`.

Optional `demo/` Express stub for local + zip/CLI path.

## Sidebar

1. **Home** — pitch, time estimate, cost note, region table, does / does not,
   links to AWS + Serverless Land.
2. **Before you begin**
   - Tooling (Node, curl, AWS CLI gate / `aws update`)
   - Prerequisites (account, Region, IAM tables, console vs CLI matrix)
   - Concepts (Web vs Event vs MicroVMs + when not to use)
3. **Walkthrough**
   - Local listen
   - Console create `wf-hello` (screenshots)
   - Revisions + Endpoints tabs
   - Prove (`curl -i` + headers; Active ≠ healthy)
   - Logs peek
   - Optional: Express + CLI (after `lambda-web` gate)
   - Stretch: SSE one-route **or** go-deeper links
   - **Teardown** (last)
4. **Reference** — troubleshooting, AWS docs, Serverless Land, limits,
   screenshot checklist (authoring note or appendix).

## Teardown design

1. Stop relying on the public URL.
2. Delete `wf-hello` (console or
   `aws lambda-web delete-web-function --function-name wf-hello`).
3. If CLI `deploy` was used: leftover checklist — role
   `awscli-lambdaweb-wf-hello`, S3 prefix `lambda-web/wf-hello/` (shared bucket
   warning), CloudWatch log group(s) (exact name from evidence pass).
4. Verify list empty; curl fails.

## Teaching beats

- Wrong Region → no Web Functions nav.
- Function / revision / endpoint progress independently.
- ApplicationManaged = anyone with URL.
- Local env var fallback `localhost:3000`.
- LatestRevision vs manual weights (dev vs prod note).
- Arm64 if packaging native modules.
- Link SSE dashboard for concurrency/billing aha — do not rebuild.
- Fixed names `wf-hello` / `dev`.

## Screenshots (user-provided — do not invent)

**Hard rule:** Agents must **not** invent, AI-generate, or substitute fake console
UI. Until real shots exist, pages use visible placeholders only:

```md
![PLACEHOLDER: short description of needed console shot](placeholder)
```

**Capture pass (later, with the user):** When walkthrough content is otherwise
ready, the agent **must stop and ask the user** to capture and provide each
screenshot (paste into chat, drop into `public/images/`, or attach files). Do
not proceed to “final” docs polish that depends on real UI without that ask.

| Shot | Ask user for |
| --- | --- |
| 1 | Region switcher → supported Region |
| 2 | Left nav: Web Functions (New) vs Event Functions |
| 3 | Create Web Function form (`wf-hello`, Hello World, Home-Region, ApplicationManaged, Latest revision) |
| 4 | Revisions tab Pending → Active |
| 5 | Endpoints tab + domain (redact account-specific noise if any) |
| 6 | Delete confirm |

After each batch arrives: save under `public/images/`, replace placeholders,
update captions. Re-ask for any missing or outdated shot if the console UI
changed.

## GHA

```text
.github/workflows/
  deploy.yml               # astro-pages-deploy @main
  markdown-lint.yml        # required
  commitmsg-conform.yml    # required
  auto-merge.yml
.github/dependabot.yml     # npm + github-actions
```

No AWS credentials / apply in CI.

## Publish

- README: local `npm ci` / `npm run dev`, site URL, lab names, CLI gate one-liner.
- Guides hub Markdown (`type: walkthrough`, `category: serverless`).
- Custom domain `aws-lambda-web-functions-walkthrough.johna.kiwi` + Pages Actions.
- Catalogue / pages-index hook if pipeline expects it.

## Explicit non-goals

SSE dashboard fork, MCP/IamAuth deep lab, MultiRegion lab, CloudFront lab, VPC
lab, Next.js standalone deep dive.

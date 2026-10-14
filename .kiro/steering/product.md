---
inclusion: always
---

# Product

Walkthrough: **AWS Lambda Web Functions** — console-first lab. Create a Web
Function in the Lambda console (not Event Functions), prove the HTTPS endpoint
with curl, optional Express / `aws lambda-web`, then teardown. Starlight docs.
No Terraform.

## Audience

Engineers who know Node HTTP frameworks and classic Lambda, new to Web Functions.

## Outcomes

1. Find Web Functions nav; fix wrong Region (five launch Regions).
2. Name function / revision / endpoint; Pending → Active.
3. Listen on `AWS_LAMBDA_HTTP_ENDPOINT` locally and in cloud.
4. Know console vs curl vs CLI (`lambda-web` gate / `aws update`).
5. Prove with `curl -i` + request id; Active ≠ healthy; Logs peek.
6. Treat ApplicationManaged as public; cost/idle note; full teardown.

## Lab names

- Web Function: `wf-hello`
- Endpoint: `dev`

## Non-goals (v1)

- SSE metrics dashboard fork / MCP / IamAuth deep lab
- MultiRegion / VPC / CloudFront+WAF required labs
- Terraform / CDK / SAM
- Non-Node runtimes; MicroVMs tutorial
- Fake console screenshots

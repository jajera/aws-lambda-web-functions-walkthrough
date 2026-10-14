---
inclusion: always
---

# Lab safety

Agents authoring this walkthrough must **not** create, update, or delete AWS
Web Functions (or supporting IAM/S3) unless the operator has opted in.

```bash
export LAMBDA_WEB_ALLOW_AWS=1
```

The Kiro PreToolUse hook `.kiro/hooks/guard-aws-mutations.py` blocks mutating
`aws` / `aws lambda-web` / Terraform / CDK / SAM unless that env is `1`.

Read-only calls (`describe`, `list`, `get`, `help`, `wait`, `s3 ls`, …) are
allowed so agents can verify CLI presence.

ApplicationManaged endpoints are **public**. Lab resources must be torn down
(see Teardown page). Do not leave `wf-hello` running after a capture session.

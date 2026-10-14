---
inclusion: always
---

# AWS source lock

Lock behavioural claims here after the evidence pass. Until then, treat UI
labels and log group names as **unverified** against a live account.

## Launch Regions (announcement / what's new, Oct 2026)

- Initial: `us-east-1`, `us-east-2`, `us-west-2`, `ap-northeast-1`, `eu-west-1`
- Current list: [AWS Capabilities by Region](https://builder.aws.com/build/capabilities)
  (What’s New points here — do not treat the initial five as exhaustive)

## Runtime

- `nodejs24.x`, Arm64, 2 vCPU / 2 GB per environment (Compute Blog / docs)

## Resources / scaling (web-functions.html, web-functions-scaling.html)

- A Web Function contains revisions and endpoints
- Revision = immutable snapshot of code + config
- Endpoint routes HTTP to one or two revisions; built-in HTTPS + TLS per endpoint
- Each execution environment serves multiple concurrent requests; Lambda scales
  environments with traffic and scales to zero when idle
- `maxConcurrencyPerEnvironment` (revision setting): range 1–128, default 64
- `maxEnvironments` (endpoint, optional): 2–10,000; `rateLimit` (endpoint, optional): 0–10,000 rps

## Env / entry

- `AWS_LAMBDA_HTTP_ENDPOINT` = `host:port`
- Default entry `index.js`; override `AWS_LAMBDA_NODEJS_ENTRYPOINT`
- Listen within ~10 seconds of startup (runtimes docs)

## HTTP headers (web-functions-http.html)

- Response header `lambda-web-request-id` — correlate response with app/system logs
- Response header `lambda-web-logstream` — identifies the CloudWatch log stream
- `lambda-web-request-id` also added as a request header to the forwarded request

## CloudWatch Logs (web-functions-logging.html) — lab evidence us-east-1

- Default log group: `/aws/lambda/web/{functionName}` → `/aws/lambda/web/wf-hello`
- Companion `.local` group: `/aws/lambda/web/wf-hello.local` (in-Region before
  centralization; Home-Region lab can use the centralized group)
- Groups appear after the first request
- Filter centralized streams with `--log-stream-name-prefix` = header value;
  `.local` stream name matches the header exactly; centralized may append
  `-<accountId>-<region>`
- `requestId` / `endpointName` / `region` fields are added to app `console`
  events; Hello World template does not log per request by default
- `platform.requestComplete` (per HTTP request) is `DEBUG` system log level

## Auth / cleanup

- ApplicationManaged: public; app must auth
- `aws lambda-web delete-web-function` removes function, endpoints, revisions
- Does **not** remove CLI-created role, S3 objects, or log groups (create docs)

## CLI

- Gate: `aws lambda-web help`
- Failure: `invalid choice: lambda-web` → update CLI (`aws update`)
- Local evidence (authoring host): aws-cli **2.37.4** lacked `lambda-web`
  (`ParamValidation` / Found invalid choice `'lambda-web'`)
- CLI reference for `lambda-web` commands documents **2.38.0**
  (https://docs.aws.amazon.com/cli/latest/reference/lambda-web/)
- Working CLI version after `aws update` on authoring host: still unverified

## Console delete (lab evidence)

- Web Functions → `wf-hello` → **Delete** opens **Delete function wf-hello**
- Type `confirm` then **Delete** (permanent; can't be undone)

## Teardown leftovers (lab evidence us-east-1)

- After delete, curl to old domain returns `404` + `Platform.InvalidEndpoint`
- CLI bucket pattern `awscli-lambdaweb-<account>-<region>-<suffix>`; objects under
  `lambda-web/wf-hello/`
- Default inline policy on deploy role: `awscli-lambdaweb-logs`
- Role name: `awscli-lambdaweb-wf-hello`

## Primary doc links

- https://docs.aws.amazon.com/lambda/latest/dg/web-functions.html
- https://docs.aws.amazon.com/lambda/latest/dg/web-functions-scaling.html
- https://docs.aws.amazon.com/lambda/latest/dg/web-functions-http.html
- https://docs.aws.amazon.com/lambda/latest/dg/web-functions-logging.html
- https://docs.aws.amazon.com/lambda/latest/dg/web-functions-create.html
- https://docs.aws.amazon.com/lambda/latest/dg/web-functions-troubleshooting.html
- https://docs.aws.amazon.com/lambda/latest/dg/web-functions-best-practices.html
- https://docs.aws.amazon.com/lambda/latest/dg/web-functions-samples.html

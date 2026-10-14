# aws-lambda-web-functions-walkthrough

Hands on console walkthrough for AWS Lambda Web Functions with optional CLI.

**Site:** https://aws-lambda-web-functions-walkthrough.johna.kiwi/

Lab names: Web Function `wf-hello`, endpoint `dev`.

## Local docs

```bash
npm ci
npm run dev
```

Build:

```bash
npm run test
```

## Lab demo (optional)

```bash
cd demo
npm install
AWS_LAMBDA_HTTP_ENDPOINT=127.0.0.1:3000 npm start
```

## CLI gate (optional path)

```bash
aws lambda-web help
```

If you see `invalid choice: lambda-web`, run `aws update` and retry.

## Agents

See `AGENTS.md` and `.kiro/steering/`. Mutation opt-in: `LAMBDA_WEB_ALLOW_AWS=1`.
Console screenshots are placeholders until the capture pass (ask the user; never invent UI).

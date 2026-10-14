/**
 * Tooltip glossary for Starlight MDX pages.
 * Keep in lockstep with .kiro/steering/glossary.md.
 * Keys: lowercase kebab-case, alphabetical.
 */
export const glossary: Record<string, string> = {
  "active-cpu":
    "Billable CPU time while the runtime and your code actively use the CPU — waiting on I/O is not billed as active CPU, but memory still accrues while the environment exists.",
  "application-managed":
    "Endpoint auth type where Lambda forwards requests without authenticating the caller. The endpoint is reachable on the public internet; your app must implement auth.",
  "aws-cli":
    "AWS Command Line Interface v2. Optional path needs a build that includes aws lambda-web (check with aws lambda-web help).",
  "aws-lambda-http-endpoint":
    "Environment variable host:port that your HTTP server must listen on. Lambda sets it in the cloud; set it yourself for local runs (for example 127.0.0.1:3000).",
  endpoint:
    "HTTPS entry point for a Web Function. Has a domain, auth type, and routes traffic to one or two revisions. Types include HomeRegion, MultiRegion, and PerRegion.",
  "event-function":
    "Classic Lambda programming model — one event invokes a handler. Renamed from Lambda functions when Web Functions launched; existing functions need no code change.",
  "iam-auth":
    "Endpoint auth type where callers must sign requests (SigV4 or SigV4a). Suited to service-to-service access, not anonymous browser demos.",
  "latest-revision":
    "Auto-deployment mode that routes all traffic to each new Active revision. Useful for labs; production often uses manual revision weights instead.",
  microvms:
    "Lambda MicroVMs — isolated sandboxes with a customer-managed lifecycle for untrusted or AI-generated code. Not the same product as Web Functions.",
  revision:
    "Immutable snapshot of Web Function code and configuration. Progresses Pending → Active independently of the endpoint.",
  "web-function":
    "Lambda compute type that runs a standard Node.js HTTP server listening on a port, with a built-in HTTPS endpoint and multi-concurrency per environment.",
};

---
inclusion: always
---

# Structure

## Authoring order

1. Steering + AGENTS.md + Cursor rules + GHA.
2. Starlight scaffold + page stubs (screenshot placeholders OK).
3. Tooling / prerequisites / concepts content.
4. Walkthrough pages (local → create → prove → logs → optional CLI → teardown).
5. **Ask the user** for console screenshots; wire into `public/images/`.
6. Evidence pass: lock facts in `aws-source-lock.md`.

## Naming

- Repo: `aws-lambda-web-functions-walkthrough`
- Mutation opt-in: `LAMBDA_WEB_ALLOW_AWS=1`
- Lab: function `wf-hello`, endpoint `dev`
- Prefer US spelling in commit subjects (conform + spellcheck).

## What not to commit

- Live account IDs, IAM keys, real endpoint URLs that embed secrets
- AI-generated fake console screenshots

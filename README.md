# ask_hn_how_do_you_manage_your_ai_agents

Hypothesis-testing landing page: per-client context isolation for freelance developers running Claude Code and Codex across two or more client repos.

## Run

```
npm install
npm run dev
```

## Test signal

The CTA has two steps, logged separately by `POST /api/subscribe` as JSON lines in the server log (Vercel keeps them under the deployment's Logs tab):

- `event: "clients_named"`: the visitor named two clients (the names themselves are not sent).
- `event: "signup"`: the visitor submitted an email.

Set `SIGNUP_WEBHOOK_URL` to also forward each event as JSON to a webhook.

## Demo video

The hero demo is a Remotion composition in `remotion/Demo.tsx`, embedded with `@remotion/player`. Preview it standalone with:

```
npx remotion studio remotion/index.ts
```

"use client";

import { useState, type FormEvent } from "react";
import type { DemoProps } from "@/remotion/Demo";

const card =
  "rounded-2xl border border-white/40 bg-white/60 p-4 shadow-[0_8px_32px_rgba(30,41,59,0.08)] backdrop-blur-xl sm:p-5";
const input =
  "h-12 min-w-0 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-500 sm:flex-1";
const cta =
  "h-12 cursor-pointer rounded-xl bg-accent px-6 text-base font-semibold text-slate-900 transition-colors duration-200 hover:bg-orange-400 disabled:cursor-wait disabled:opacity-70";

function slug(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function post(body: { event: "clients_named" } | { event: "signup"; email: string }) {
  return fetch("/api/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function Store({ name }: { name: string }) {
  return (
    <ul className="min-w-0 flex-1 text-base text-slate-600">
      <li className="truncate font-semibold text-slate-900">clients/{name}/</li>
      <li>rules.md</li>
      <li>decisions.md</li>
      <li>inbox/ chat, email, tickets</li>
    </ul>
  );
}

export function SignupForm({ onNamed }: { onNamed: (clients: DemoProps) => void }) {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [clients, setClients] = useState<DemoProps | null>(null);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  function onName(e: FormEvent) {
    e.preventDefault();
    const named = { clientA: slug(first), clientB: slug(second) };
    if (!named.clientA || !named.clientB || named.clientA === named.clientB) return;
    setClients(named);
    onNamed(named);
    localStorage.setItem("client_context_clients", JSON.stringify(named));
    void post({ event: "clients_named" });
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setState("sending");
    const res = await post({ event: "signup", email });
    if (!res.ok) {
      setState("error");
      return;
    }
    localStorage.setItem("client_context_signup", email);
    setState("done");
  }

  if (!clients) {
    return (
      <form onSubmit={onName} className={card}>
        <fieldset>
          <legend className="mb-2 text-base text-slate-600">Name two of your clients</legend>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              aria-label="First client"
              required
              placeholder="acme"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              className={input}
            />
            <input
              aria-label="Second client"
              required
              placeholder="globex"
              value={second}
              onChange={(e) => setSecond(e.target.value)}
              className={input}
            />
            <button type="submit" className={cta}>
              Show my two clients walled off
            </button>
          </div>
        </fieldset>
        <p className="mt-3 text-base text-slate-500">The names stay in your browser. They are not sent anywhere.</p>
      </form>
    );
  }

  return (
    <div className={card}>
      <p className="text-base text-slate-600">Per-client context for Claude Code and Codex</p>
      <div className="mt-3 flex gap-4">
        <Store name={clients.clientA} />
        <div role="img" aria-label="Wall between the two clients" className="w-1.5 shrink-0 rounded-full bg-slate-900" />
        <Store name={clients.clientB} />
      </div>

      {state === "done" ? (
        <p role="status" className="mt-4 text-base text-slate-900">
          Saved. We will email {email} when isolation for {clients.clientA} and {clients.clientB} is ready to install.
        </p>
      ) : (
        <form onSubmit={onSave} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoFocus
            autoComplete="email"
            placeholder="you@yourdomain.dev"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input}
          />
          <button type="submit" disabled={state === "sending"} className={cta}>
            {state === "sending" ? "Saving" : "Email me when it's ready to install"}
          </button>
        </form>
      )}

      {state === "error" && (
        <p role="alert" className="mt-3 text-base text-red-700">
          That did not save. Check the email address and try again.
        </p>
      )}
    </div>
  );
}

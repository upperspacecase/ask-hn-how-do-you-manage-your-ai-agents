"use client";

import { useState } from "react";
import { DemoPlayer } from "@/components/DemoPlayer";
import { SignupForm } from "@/components/SignupForm";
import { DEFAULT_CLIENTS } from "@/remotion/Demo";

export function Landing() {
  const [clients, setClients] = useState(DEFAULT_CLIENTS);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 15% 10%, rgba(100,116,139,0.16) 0%, rgba(100,116,139,0) 70%), radial-gradient(50% 45% at 90% 80%, rgba(148,163,184,0.18) 0%, rgba(148,163,184,0) 70%)",
          }}
        />
        <div className="mx-auto w-full max-w-5xl px-6 pb-12 pt-20 sm:pt-28">
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
            Open Client B&apos;s repo and your agent knows Client B&apos;s rules, and nothing about Client A.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-slate-600">
            For freelance developers running Claude Code and Codex across two or more client repos. A CLAUDE.md per repo holds the rules you wrote down. This also files the decisions that arrive by Slack, Gmail and Linear into that client&apos;s decisions.md, so Acme&apos;s &quot;API stays snake_case&quot; never loads in Globex&apos;s session.
          </p>
          <div className="mt-8 max-w-2xl">
            <SignupForm onNamed={setClients} />
          </div>
          <p className="mt-4 max-w-2xl text-base text-slate-500">
            Asked on{" "}
            <a
              href="https://news.ycombinator.com/item?id=50403153"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer underline transition-colors duration-200 hover:text-slate-900"
            >
              Hacker News: &quot;How do you manage your AI agents&apos; context across clients and projects?&quot;
            </a>{" "}
            One reply, from nilleb: &quot;I use a certain agent for a certain customer.&quot;
          </p>
        </div>
      </section>

      <section aria-label="Product demo" className="mx-auto w-full max-w-5xl px-6 pb-6 pt-4">
        <div className="overflow-hidden rounded-2xl border border-white/40 bg-white/60 p-2 shadow-[0_8px_32px_rgba(30,41,59,0.10)] backdrop-blur-xl">
          <div className="overflow-hidden rounded-xl">
            <DemoPlayer {...clients} />
          </div>
        </div>
        <p className="mt-3 text-base text-slate-500">
          Simulation of the intended behaviour: a ticket is filed to the client it came from, then stays out of the other client&apos;s session.
        </p>
      </section>
    </>
  );
}

const LOGOS = [
  { name: "Claude Code", className: "font-bold tracking-tight" },
  { name: "Codex", className: "font-extrabold tracking-tighter" },
  { name: "CLAUDE.md", className: "font-semibold" },
  { name: "AGENTS.md", className: "font-medium tracking-wide" },
  { name: "Slack", className: "font-black" },
  { name: "Gmail", className: "font-semibold tracking-tight" },
  { name: "Linear", className: "font-bold uppercase tracking-widest" },
];

export function LogoStrip() {
  return (
    <section aria-label="Where client context lives today" className="mx-auto w-full max-w-5xl px-6 py-14 sm:py-16">
      <p className="text-base text-slate-500">Where your client context is scattered today, before it is filed per client.</p>
      <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 text-base text-slate-400">
        {LOGOS.map((logo) => (
          <li key={logo.name} className={logo.className}>
            {logo.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

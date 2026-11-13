import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const DEMO_FPS = 30;
export const DEMO_DURATION = 210;
export const DEMO_WIDTH = 1000;
export const DEMO_HEIGHT = 750;

export type DemoProps = { clientA: string; clientB: string };
export const DEFAULT_CLIENTS: DemoProps = { clientA: "acme", clientB: "globex" };

const BODY = 28;
const INK = "#1e293b";
const MUTED = "#64748b";
const DECISION = "API stays snake_case";
const SWITCH = 100;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function Store({ name, loaded, decision }: { name: string; loaded: boolean; decision: number }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        padding: 24,
        borderRadius: 20,
        border: `2px solid ${loaded ? INK : "rgba(255,255,255,0.6)"}`,
        background: "rgba(255,255,255,0.7)",
        boxShadow: "0 8px 32px rgba(30,41,59,0.10)",
        opacity: loaded ? 1 : 0.4,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        clients/{name}/
      </div>
      <div>rules.md</div>
      <div>decisions.md</div>
      <div style={{ opacity: decision, visibility: decision ? "visible" : "hidden", fontWeight: 600, paddingLeft: 20, borderLeft: `4px solid ${INK}` }}>{DECISION}</div>
      <div>inbox/ chat, email, tickets</div>
      <div style={{ marginTop: "auto", color: loaded ? INK : MUTED, fontWeight: 600 }}>
        {loaded ? "Loaded in this session" : "Not loaded"}
      </div>
    </div>
  );
}

export const Demo: React.FC<DemoProps> = ({ clientA, clientB }) => {
  const frame = useCurrentFrame();
  const second = frame >= SWITCH;
  const local = second ? frame - SWITCH : frame;
  const command = `cd ${second ? clientB : clientA} && claude`;
  const typed = command.slice(0, Math.round(interpolate(local, [4, 26], [0, command.length], clamp)));
  const loaded = local >= 30;

  const ticketIn = interpolate(frame, [38, 50], [0, 1], clamp);
  const ticketOut = interpolate(frame, [60, 68], [1, 0], clamp);
  const ticketY = interpolate(frame, [50, 64], [0, 140], clamp);
  const decision = interpolate(frame, [68, 78], [0, 1], clamp);
  const status = interpolate(local, [second ? 36 : 78, second ? 46 : 88], [0, 1], clamp);
  const loop = Math.min(
    interpolate(frame, [0, 8], [0, 1], clamp),
    interpolate(frame, [DEMO_DURATION - 10, DEMO_DURATION - 1], [1, 0], clamp),
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #e2e8f0 0%, #f8fafc 45%, #cbd5e1 100%)",
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
        fontSize: BODY,
        color: INK,
        padding: 40,
      }}
    >
      <div style={{ opacity: loop, display: "flex", flexDirection: "column", gap: 28, height: "100%" }}>
        <div
          style={{
            height: 76,
            padding: "0 24px",
            borderRadius: 20,
            background: INK,
            color: "#f8fafc",
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <span style={{ opacity: 0.6, marginRight: 14 }}>$</span>
          {typed}
          <span style={{ width: 3, height: 32, marginLeft: 4, background: "#f8fafc", opacity: local % 20 < 10 ? 1 : 0 }} />
        </div>

        <div style={{ flex: 1, display: "flex", gap: 20, minHeight: 0 }}>
          <Store name={clientA} loaded={loaded && !second} decision={decision} />
          <div style={{ width: 12, borderRadius: 6, background: INK }} />
          <Store name={clientB} loaded={loaded && second} decision={0} />
        </div>

        <div style={{ height: 40, opacity: status, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {second
            ? `Agent context: ${clientB} only. The ${clientA} snake_case rule stays out.`
            : `Filed to ${clientA}, the client the ticket came from.`}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 64,
          top: 150 + ticketY,
          width: 392,
          padding: "14px 20px",
          borderRadius: 16,
          background: "#ffffff",
          border: `2px solid ${INK}`,
          boxShadow: "0 12px 32px rgba(30,41,59,0.25)",
          opacity: Math.min(ticketIn, ticketOut),
        }}
      >
        <div style={{ color: MUTED }}>New ticket</div>
        <div style={{ fontWeight: 600 }}>{DECISION}</div>
      </div>
    </AbsoluteFill>
  );
};

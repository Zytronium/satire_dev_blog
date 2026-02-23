"use client";

import { useState, useEffect, useRef } from "react";
import Container from "@/components/Container";
import Flexbox from "@/components/Flexbox";

const BOOT_LINES = [
  "> Initializing OMNI-ADMIN Enterprise Suite v9.4.2...",
  "> Loading synergy modules... [██████████] 100%",
  "> Calibrating stakeholder alignment protocols...",
  "> Verifying your disruptive potential... ADEQUATE",
  "> Cross-referencing KPI matrices with OKR scaffolding...",
  "> Warming up the blockchain (just in case)...",
  "> Scanning for unauthorized non-agile behavior...",
  "> Deploying thought leadership frameworks...",
  "> System ready. Welcome, Valued Human Resource.",
  "> This page totally wasn't vibe coded.",
];

const date = new Date();
date.setMonth(date.getMonth() + 1);
const year = date.getFullYear();

const ALERTS = [
  { level: "CRITICAL", msg: "Coffee machine on floor 3 is spewing coffee all over the place again." },
  { level: "WARN", msg: "Steve from accounting has opened Excel without proper clearance." },
  { level: "INFO", msg: `${year} is the year of Linux!` },
  { level: "INFO", msg: "The word 'pivot' has been used 47 times today. Quota: 50." },
  { level: "CRITICAL", msg: "Jannet is coding in Wingdings again. Deploying Microsoft Copilot to intervene." },
  { level: "WARN", msg: "Employee happiness index dipped to 7.4." },
  { level: "INFO", msg: "Synergy levels nominal. Paradigm shift scheduled for 3pm." },
  { level: "INFO", msg: "Someone said 'but we've always done it this way.' Incident report filed." },
  { level: "WARN", msg: "Lunch break extended by 4 minutes. Estimated ROI impact: catastrophic." },
];

const METRICS = [
  { label: "Synergy Index", value: "94.2%", status: "nominal" },
  { label: "Disruption Score", value: `${NaN}`, status: "critical" },
  { label: "Buzzword Density", value: "741 bpm", status: "warn" },
  { label: "Pivot Readiness", value: "ALWAYS", status: "nominal" },
  { label: "Human Morale", value: "ERROR", status: "critical" },
  { label: "Bugs Fixed With Duct Tape", value: "ERROR", status: "nominal" },
  { label: "Agile Velocity", value: "∞ pts/sprint", status: "nominal" },
  { label: "AI Involvement", value: "MANDATORY", status: "critical" },
];

const COMMANDS = [
  "sudo fire-junior-dev --reason='vibes'",
  "npm run fix-everything --force",
  "git blame --cc-ceo",
  "deploy --env=prod --fingers-crossed",
  "rm -rf /tech-debt --pretend-it-worked",
  "reorg --direction=circular --announce=friday-5pm",
  "pivot --again --third-time-this-quarter",
];

function AlertBadge({ level }) {
  const colors = {
    CRITICAL: "bg-red-500/20 text-red-400 border-red-500/40",
    WARN: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
    INFO: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
  };
  return (
    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${colors[level]}`}>
      {level}
    </span>
  );
}

export default function Page() {
  const [bootIndex, setBootIndex] = useState(0);
  const [booted, setBooted] = useState(false);
  const [commandInput, setCommandInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [alertIndex, setAlertIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const [classified, setClassified] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bootIndex < BOOT_LINES.length) {
      const t = setTimeout(() => setBootIndex((i) => i + 1), 280);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setBooted(true), 400);
      return () => clearTimeout(t);
    }
  }, [bootIndex]);

  useEffect(() => {
    const t = setInterval(() => {
      setAlertIndex((i) => (i + 1) % ALERTS.length);
      setTick((t) => t + 1);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  function handleCommand(e) {
    if (e.key === "Enter" && commandInput.trim()) {
      const responses = [
        `Error 418: I'm a teapot. Also your request has been escalated to leadership.`,
        `Permission denied. Have you tried aligning with the north star metric?`,
        `Success! (Results may vary. Past performance not indicative of future synergy.)`,
        `Command queued behind 47 higher-priority initiatives. ETA: Next fiscal year.`,
        `This action requires sign-off from a committee that was dissolved in the reorg.`,
        `Executed. Your manager's manager has been CC'd as a precaution.`,
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      setCommandHistory((h) => [...h.slice(-6), `$ ${commandInput}`, `  → ${response}`]);
      setCommandInput("");
    }
  }

  const currentAlert = ALERTS[alertIndex];
  const uptimeMins = 847 + tick * 3;

  return (
    <div className="max-w-[90vw]">
      <Flexbox col className="min-w-[60%] mx-auto rounded-xl p-2 md:p-6 lg:p-8 xl:p-10 m-5">
        <div className="m-2" />

        {/* Outer glow wrapper */}
        <div className="relative font-mono">
          {/* Blurred translucent terminal window */}
          <div
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{
              background: "rgba(10, 14, 20, 0.72)",
              backdropFilter: "blur(24px) saturate(1.4)",
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(34,197,94,0.04)",
            }}
          >
            {/* Scanline overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
              }}
            />

            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07] bg-white/[0.03]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-[11px] text-white/40 tracking-[0.2em] uppercase">
                  OMNI-ADMIN ENTERPRISE COMMAND CENTER — CLEARANCE: LEVEL PENDING
                </span>
              </div>
              <button
                onClick={() => setClassified(!classified)}
                className="text-[10px] text-red-400/70 border border-red-500/30 px-2 py-0.5 rounded hover:bg-red-500/10 transition-colors"
              >
                {classified ? "DECLASSIFY" : "CLASSIFY"}
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Boot sequence / classified overlay */}
              {!booted ? (
                <div className="text-green-400/90 text-xs space-y-1 min-h-[200px]">
                  <div className="text-green-300 text-sm mb-3 tracking-widest">SYSTEM BOOT</div>
                  {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
                    <div key={i} className="opacity-90">{line}</div>
                  ))}
                  <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1 translate-y-1" />
                </div>
              ) : classified ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
                  <div className="text-red-500 text-5xl font-black tracking-[0.3em]">CLASSIFIED</div>
                  <div className="text-red-400/60 text-xs tracking-widest">THIS CONTENT REQUIRES EXECUTIVE SPONSORSHIP</div>
                  <div className="text-white/20 text-[10px] mt-4 max-w-xs text-center">
                    Please submit form 27-B/6 in triplicate to your manager's manager's chief of staff to request temporary visibility access.
                  </div>
                  <div className="w-24 h-24 border-2 border-red-500/30 rounded-full flex items-center justify-center mt-4">
                    <div className="w-16 h-16 border-2 border-red-500/20 rounded-full flex items-center justify-center">
                      <div className="text-red-500/50 text-2xl">🔒</div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Live alert ticker */}
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.03] text-xs">
                    <span className="text-white/30 shrink-0 text-[10px] tracking-widest">LIVE</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse shrink-0" />
                    <AlertBadge level={currentAlert.level} />
                    <span className="text-white/60 truncate">{currentAlert.msg}</span>
                  </div>

                  {/* Metrics grid */}
                  <div>
                    <div className="text-[10px] text-white/30 tracking-[0.2em] uppercase mb-3">
                      Core Business Vitals™
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {METRICS.map((m) => (
                        <div
                          key={m.label}
                          className="px-3 py-2.5 rounded-lg border border-white/[0.07] bg-white/[0.02] space-y-1"
                        >
                          <div className="text-[10px] text-white/35 leading-tight">{m.label}</div>
                          <div
                            className={`text-sm font-bold ${
                              m.status === "critical"
                                ? "text-red-400"
                                : m.status === "warn"
                                  ? "text-yellow-400"
                                  : "text-green-400"
                            }`}
                          >
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Two-column: Command history + suggested commands */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Terminal */}
                    <div className="rounded-lg border border-white/[0.07] bg-black/30 overflow-hidden">
                      <div className="text-[10px] text-white/25 tracking-widest px-3 py-2 border-b border-white/[0.05] uppercase">
                        Terminal
                      </div>
                      <div
                        className="px-3 py-2 min-h-[140px] max-h-[140px] overflow-y-auto space-y-1 text-xs"
                        onClick={() => inputRef.current?.focus()}
                      >
                        {commandHistory.length === 0 && (
                          <div className="text-white/20">Type a command. It won't help, but it feels productive.</div>
                        )}
                        {commandHistory.map((line, i) => (
                          <div
                            key={i}
                            className={line.startsWith("$") ? "text-green-400/80" : "text-white/40 text-[11px]"}
                          >
                            {line}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 border-t border-white/[0.05]">
                        <span className="text-green-400/70 text-xs">$</span>
                        <input
                          ref={inputRef}
                          value={commandInput}
                          onChange={(e) => setCommandInput(e.target.value)}
                          onKeyDown={handleCommand}
                          className="flex-1 bg-transparent text-xs text-white/80 outline-none placeholder:text-white/20 caret-green-400"
                          placeholder="enter command..."
                          spellCheck={false}
                        />
                      </div>
                    </div>

                    {/* Suggested commands */}
                    <div className="rounded-lg border border-white/[0.07] bg-black/20 overflow-hidden">
                      <div className="text-[10px] text-white/25 tracking-widest px-3 py-2 border-b border-white/[0.05] uppercase">
                        Recommended Actions™
                      </div>
                      <div className="p-2 space-y-1">
                        {COMMANDS.map((cmd) => (
                          <button
                            key={cmd}
                            onClick={() => setCommandInput(cmd)}
                            className="w-full text-left text-[11px] text-cyan-400/60 hover:text-cyan-300 hover:bg-white/[0.04] px-2 py-1.5 rounded transition-colors font-mono truncate"
                          >
                            {cmd}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer bar */}
                  <div className="flex items-center justify-between text-[10px] text-white/20 pt-1 border-t border-white/[0.05]">
                    <span>UPTIME: {uptimeMins.toLocaleString()} min (record: 851 min)</span>
                    <span>INCIDENT COUNT: 0 (unverified)</span>
                    <span>
                      STATUS:{" "}
                      <span className="text-green-400/70">
                        {tick % 7 === 0 ? "ON FIRE 🔥" : "NOMINAL"}
                      </span>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Flexbox>
    </div>
  );
}

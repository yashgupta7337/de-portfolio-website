"use client";

import { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  Reorder,
  useDragControls,
} from "framer-motion";
import { tickers, barsFor } from "@/lib/stockData";
import { runPipeline, stageDefs, type Stage, type StageType } from "@/lib/pipeline";
import Chart from "./Chart";

let _id = 0;
const newId = () => `s${++_id}`;

function makeStage(type: StageType): Stage {
  return { id: newId(), type, cfg: stageDefs[type].make() };
}

function VConnector({ runKey, delay }: { runKey: number; delay: number }) {
  return (
    <div className="relative mx-auto h-5 w-0.5">
      <div className="flow-line-v absolute inset-0 opacity-60" />
      <motion.span
        key={runKey}
        className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]"
        initial={{ top: "-10%", opacity: 0 }}
        animate={{ top: "110%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, delay, ease: "easeInOut" }}
      />
    </div>
  );
}

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));

function StageItem({
  stage,
  index,
  runKey,
  warning,
  onRemove,
  onCfg,
}: {
  stage: Stage;
  index: number;
  runKey: number;
  warning?: string;
  onRemove: (id: string) => void;
  onCfg: (id: string, patch: Record<string, number | string>) => void;
}) {
  const controls = useDragControls();
  const def = stageDefs[stage.type];

  // Commit finite values only — a transient empty field (NaN) is ignored so
  // it can never reach state, the SQL view, or the engine.
  const setNum = (key: string, raw: number) => {
    if (Number.isFinite(raw)) onCfg(stage.id, { [key]: raw });
  };
  const inputCls =
    "rounded-lg border border-[var(--color-border)] bg-[var(--surface-1)] px-2 py-1 text-right font-mono text-xs";

  return (
    <Reorder.Item value={stage} dragListener={false} dragControls={controls}>
      <VConnector runKey={runKey} delay={0.1 + index * 0.12} />
      <div
        className={`glass flex items-center gap-3 rounded-2xl border p-3 transition-colors ${
          warning ? "border-amber-400/50" : "border-[var(--color-border)]"
        }`}
      >
        <button
          type="button"
          aria-label="Drag to reorder"
          onPointerDown={(e) => controls.start(e)}
          className="shrink-0 cursor-grab touch-none select-none px-1 text-[var(--fg-dim)] active:cursor-grabbing"
        >
          ⠿
        </button>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--surface-1)] font-mono text-sm">
          {def.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">{def.label}</div>
          <div className="truncate font-mono text-[0.68rem] text-[var(--color-muted)]">
            {def.summary(stage.cfg)}
          </div>
        </div>

        {/* inline config */}
        {stage.type === "filter" && (
          <input
            type="number"
            aria-label="Minimum volume"
            value={Number(stage.cfg.min)}
            step={100000}
            min={0}
            onChange={(e) => setNum("min", e.target.valueAsNumber)}
            onBlur={() =>
              onCfg(stage.id, { min: Math.max(0, Number(stage.cfg.min) || 0) })
            }
            className={`w-24 ${inputCls}`}
          />
        )}
        {stage.type === "ma" && (
          <input
            type="number"
            aria-label="Moving average window (days)"
            value={Number(stage.cfg.window)}
            min={2}
            max={60}
            onChange={(e) => setNum("window", e.target.valueAsNumber)}
            onBlur={() =>
              onCfg(stage.id, {
                window: clamp(Math.round(Number(stage.cfg.window)) || 20, 2, 60),
              })
            }
            className={`w-16 ${inputCls}`}
          />
        )}
        {stage.type === "topn" && (
          <input
            type="number"
            aria-label="Top N rows by volume"
            value={Number(stage.cfg.n)}
            min={1}
            max={60}
            onChange={(e) => setNum("n", e.target.valueAsNumber)}
            onBlur={() =>
              onCfg(stage.id, {
                n: clamp(Math.round(Number(stage.cfg.n)) || 10, 1, 60),
              })
            }
            className={`w-16 ${inputCls}`}
          />
        )}
        {stage.type === "resample" && (
          <select
            aria-label="Resample frequency"
            value={String(stage.cfg.freq)}
            onChange={(e) => onCfg(stage.id, { freq: e.target.value })}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--surface-1)] px-2 py-1 text-xs"
          >
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
          </select>
        )}

        <button
          type="button"
          aria-label={`Remove ${def.label}`}
          onClick={() => onRemove(stage.id)}
          className="shrink-0 rounded-lg border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-muted)] transition hover:border-rose-400/40 hover:text-rose-300"
        >
          ✕
        </button>
      </div>
      {warning && (
        <div className="mt-1.5 flex items-start gap-1.5 px-1 text-[0.68rem] text-amber-300/90">
          <span aria-hidden>⚠</span>
          <span>{warning}</span>
        </div>
      )}
    </Reorder.Item>
  );
}

const PALETTE: StageType[] = ["filter", "ma", "returns", "resample", "topn"];

export default function Playground() {
  const [symbol, setSymbol] = useState(tickers[0].symbol);
  const [stages, setStages] = useState<Stage[]>(() => [makeStage("ma")]);
  const [runKey, setRunKey] = useState(1);
  const [tab, setTab] = useState<"chart" | "table" | "sql">("chart");
  const [copied, setCopied] = useState(false);
  const dragType = useRef<StageType | null>(null);

  const ticker = tickers.find((t) => t.symbol === symbol) ?? tickers[0];
  const result = useMemo(
    () => runPipeline(barsFor(symbol), stages, symbol),
    [symbol, stages]
  );

  const bump = () => setRunKey((k) => k + 1);
  const addStage = (type: StageType) => {
    setStages((s) => [...s, makeStage(type)]);
    bump();
  };
  const removeStage = (id: string) => {
    setStages((s) => s.filter((x) => x.id !== id));
    bump();
  };
  const onCfg = (id: string, patch: Record<string, number | string>) => {
    setStages((s) => s.map((x) => (x.id === id ? { ...x, cfg: { ...x.cfg, ...patch } } : x)));
    bump();
  };
  const reorder = (s: Stage[]) => {
    setStages(s);
    bump();
  };

  const rows = result.rows;
  const hasRows = rows.length > 0;
  const first = rows[0];
  const last = rows[rows.length - 1];
  const changeNum =
    first && last ? (last.close / first.close - 1) * 100 : null;
  const avgVol = hasRows
    ? Math.round(rows.reduce((a, r) => a + r.volume, 0) / rows.length)
    : 0;

  // Stage-level warnings keyed by stage id, plus pipeline-level notices.
  const warnMap = new Map<string, string>();
  result.warnings.forEach((w) => {
    if (w.scope === "stage" && w.stageId && !warnMap.has(w.stageId))
      warnMap.set(w.stageId, w.message);
  });
  const pipelineWarnings = result.warnings.filter((w) => w.scope === "pipeline");

  // Plain-English summary of what the pipeline currently produces.
  const freq = String(stages.find((s) => s.type === "resample")?.cfg.freq || "daily");
  const unit =
    freq === "monthly" ? "monthly bars" : freq === "weekly" ? "weekly bars" : "daily bars";
  const readout = !hasRows
    ? "Your filters removed every row — loosen the Filter or raise Top-N to see data."
    : `Showing ${symbol}'s ${
        result.mode === "returns" ? "day-over-day % change" : "closing price"
      } across ${rows.length} ${unit}${
        result.overlay ? ` with a ${result.overlay.label} trend line` : ""
      }. The SQL tab is the exact query that produces it.`;

  // Empty result → neutral em-dashes rather than a misleading green $0 / 0%.
  const kpis = [
    { label: "rows", value: rows.length.toString() },
    {
      label: result.mode === "returns" ? "last return" : "last close",
      value: !hasRows
        ? "—"
        : result.mode === "returns"
          ? `${last?.ret ?? 0}%`
          : `$${last?.close ?? 0}`,
    },
    {
      label: "period change",
      value: changeNum === null ? "—" : `${changeNum.toFixed(2)}%`,
      pos: changeNum === null ? undefined : changeNum >= 0,
    },
    { label: "avg volume", value: hasRows ? `${(avgVol / 1e6).toFixed(2)}M` : "—" },
  ];

  const copySql = async () => {
    try {
      await navigator.clipboard.writeText(result.sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,360px)_1fr]">
      {/* ───── builder ───── */}
      <div className="flex flex-col gap-4">
        {/* ticker picker */}
        <div className="glass rounded-2xl p-3">
          <div className="mb-2 text-[0.7rem] uppercase tracking-wider text-[var(--color-muted)]">
            Source · ticker
          </div>
          <div className="grid grid-cols-2 gap-2">
            {tickers.map((t) => (
              <button
                key={t.symbol}
                onClick={() => {
                  setSymbol(t.symbol);
                  bump();
                }}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition ${
                  symbol === t.symbol
                    ? "border-[var(--border-strong)] bg-[var(--surface-1)]"
                    : "border-[var(--color-border)] hover:bg-[var(--surface-1)]"
                }`}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: t.accent }} />
                <span className="min-w-0">
                  <span className="block font-mono text-sm font-bold">{t.symbol}</span>
                  <span className="block truncate text-[0.65rem] text-[var(--color-muted)]">{t.name}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* palette */}
        <div className="glass rounded-2xl p-3">
          <div className="mb-2 text-[0.7rem] uppercase tracking-wider text-[var(--color-muted)]">
            Add a transform · tap or drag
          </div>
          <div className="flex flex-wrap gap-2">
            {PALETTE.map((type) => (
              <button
                key={type}
                draggable
                onDragStart={() => (dragType.current = type)}
                onClick={() => addStage(type)}
                title={stageDefs[type].blurb}
                className="inline-flex cursor-grab items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--surface-1)] px-3 py-1.5 text-sm transition hover:border-cyan-400/40 active:cursor-grabbing"
              >
                <span className="font-mono">{stageDefs[type].icon}</span>
                {stageDefs[type].label}
              </button>
            ))}
          </div>
        </div>

        {/* pipeline */}
        <div
          onDragOver={(e) => {
            if (dragType.current) e.preventDefault();
          }}
          onDrop={() => {
            if (dragType.current) {
              addStage(dragType.current);
              dragType.current = null;
            }
          }}
          className="glass rounded-2xl p-4"
        >
          {/* source node */}
          <div className="flex items-center gap-3 rounded-2xl border border-cyan-300/30 bg-cyan-400/5 p-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-300/30 bg-black/20 text-sm">🗄️</span>
            <div>
              <div className="text-sm font-semibold">{symbol} · prices</div>
              <div className="font-mono text-[0.68rem] text-[var(--color-muted)]">{barsFor(symbol).length} daily bars</div>
            </div>
          </div>

          <Reorder.Group axis="y" values={stages} onReorder={reorder} className="list-none">
            {stages.map((s, i) => (
              <StageItem
                key={s.id}
                stage={s}
                index={i}
                runKey={runKey}
                warning={warnMap.get(s.id)}
                onRemove={removeStage}
                onCfg={onCfg}
              />
            ))}
          </Reorder.Group>

          {stages.length === 0 && (
            <p className="py-4 text-center text-xs text-[var(--color-muted)]">
              Add transforms above to shape the data ↑
            </p>
          )}

          <VConnector runKey={runKey} delay={0.1 + stages.length * 0.12} />

          {/* sink node */}
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/5 p-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-emerald-400/30 bg-black/20 text-sm">📊</span>
            <div>
              <div className="text-sm font-semibold">Sink · visualize</div>
              <div className="font-mono text-[0.68rem] text-[var(--color-muted)]">chart · table · SQL</div>
            </div>
          </div>

          {pipelineWarnings.map((w, i) => (
            <div
              key={i}
              className={`mt-3 flex items-start gap-2 rounded-xl border px-3 py-2 text-xs ${
                w.level === "warn"
                  ? "border-amber-400/40 bg-amber-400/10 text-amber-200"
                  : "border-[var(--color-border)] bg-[var(--surface-1)] text-[var(--color-muted)]"
              }`}
            >
              <span aria-hidden>{w.level === "warn" ? "⚠" : "ℹ"}</span>
              <span>{w.message}</span>
            </div>
          ))}

          <button
            onClick={bump}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-[var(--on-accent)] shadow-[0_12px_36px_-12px_rgba(34,211,238,0.7)] transition hover:brightness-110"
          >
            ▶ Run pipeline
          </button>
        </div>
      </div>

      {/* ───── output ───── */}
      <div className="glass flex flex-col rounded-3xl p-4 sm:p-5">
        {/* plain-english readout */}
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-xs leading-relaxed text-[var(--color-muted)]">
          <span aria-hidden>👁️</span>
          <span>
            <span className="font-semibold text-[var(--color-fg)]">
              What you&apos;re seeing —{" "}
            </span>
            {readout}
          </span>
        </div>

        {/* kpis */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-[var(--color-border)] bg-[var(--surface-1)] p-3">
              <div className="text-[0.62rem] uppercase tracking-wider text-[var(--color-muted)]">{k.label}</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={k.value}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className={`mt-1 font-mono text-lg font-bold tabular-nums ${
                    k.pos === undefined ? "" : k.pos ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {k.value}
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* tabs */}
        <div className="mt-4 flex gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--surface-1)] p-1 text-sm">
          {(["chart", "table", "sql"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-lg px-3 py-1.5 font-medium capitalize transition ${
                tab === t ? "bg-[var(--color-surface)] text-[var(--color-fg)]" : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
              }`}
            >
              {t === "sql" ? "SQL" : t}
            </button>
          ))}
        </div>

        <div className="mt-4 flex-1">
          {tab === "chart" && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-black/10 p-3">
              <Chart x={result.x} primary={result.primary} overlay={result.overlay} mode={result.mode} accent={ticker.accent} runKey={runKey} />
            </div>
          )}

          {tab === "table" && (
            <div className="max-h-[300px] overflow-auto rounded-2xl border border-[var(--color-border)]">
              <table className="w-full border-collapse text-left font-mono text-xs">
                <thead className="sticky top-0 bg-[var(--color-ink-2)] text-[var(--color-muted)]">
                  <tr>
                    {["date", "open", "high", "low", "close", "volume", ...(result.overlay ? ["ma"] : []), ...(result.mode === "returns" ? ["ret%"] : [])].map((h) => (
                      <th key={h} className="px-3 py-2 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 60).map((r, i) => (
                    <tr key={i} className="border-t border-[var(--color-border)]">
                      <td className="px-3 py-1.5">{r.date}</td>
                      <td className="px-3 py-1.5">{r.open}</td>
                      <td className="px-3 py-1.5">{r.high}</td>
                      <td className="px-3 py-1.5">{r.low}</td>
                      <td className="px-3 py-1.5">{r.close}</td>
                      <td className="px-3 py-1.5">{r.volume.toLocaleString()}</td>
                      {result.overlay && <td className="px-3 py-1.5">{r.ma ?? "—"}</td>}
                      {result.mode === "returns" && <td className="px-3 py-1.5">{r.ret ?? "—"}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === "sql" && (
            <div className="relative">
              <button
                onClick={copySql}
                className="absolute right-3 top-3 rounded-lg border border-[var(--color-border)] bg-[var(--surface-1)] px-2.5 py-1 text-xs text-[var(--fg-soft)] transition hover:border-cyan-400/40"
              >
                {copied ? "copied ✓" : "copy"}
              </button>
              <pre className="overflow-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink-2)] p-4 font-mono text-xs leading-relaxed text-cyan-100">
                {result.sql}
              </pre>
              <p className="mt-2 text-[0.7rem] text-[var(--color-muted)]">
                Generated live from your pipeline — drop it into ClickHouse / DuckDB and it runs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import type { Bar } from "./stockData";

export type StageType = "filter" | "ma" | "returns" | "resample" | "topn";

export type Stage = {
  id: string;
  type: StageType;
  cfg: Record<string, number | string>;
};

export type Row = Bar & { ma?: number | null; ret?: number | null };

export type PipelineResult = {
  rows: Row[];
  x: string[];
  primary: number[];
  overlay: { label: string; values: (number | null)[] } | null;
  mode: "price" | "returns";
  sql: string;
};

export const stageDefs: Record<
  StageType,
  {
    label: string;
    icon: string;
    blurb: string;
    make: () => Record<string, number | string>;
    summary: (cfg: Record<string, number | string>) => string;
  }
> = {
  filter: {
    label: "Filter",
    icon: "⚡",
    blurb: "Keep rows above a volume threshold",
    make: () => ({ field: "volume", min: 1_000_000 }),
    summary: (c) => `${c.field} ≥ ${Number(c.min).toLocaleString()}`,
  },
  ma: {
    label: "Moving avg",
    icon: "📈",
    blurb: "Overlay an N-day moving average",
    make: () => ({ window: 20 }),
    summary: (c) => `${c.window}-day MA`,
  },
  returns: {
    label: "Daily returns",
    icon: "%",
    blurb: "Convert price into daily % change",
    make: () => ({}),
    summary: () => "close → % change",
  },
  resample: {
    label: "Resample",
    icon: "🗓️",
    blurb: "Roll daily bars up to weekly / monthly",
    make: () => ({ freq: "weekly" }),
    summary: (c) => `${c.freq}`,
  },
  topn: {
    label: "Top-N",
    icon: "🔝",
    blurb: "Take the N highest-volume days",
    make: () => ({ n: 20 }),
    summary: (c) => `top ${c.n} by volume`,
  },
};

const FREQ_SIZE: Record<string, number> = { weekly: 5, monthly: 21 };

function resample(rows: Row[], size: number): Row[] {
  const out: Row[] = [];
  for (let i = 0; i < rows.length; i += size) {
    const chunk = rows.slice(i, i + size);
    if (!chunk.length) continue;
    out.push({
      date: chunk[chunk.length - 1].date,
      open: chunk[0].open,
      high: Math.max(...chunk.map((c) => c.high)),
      low: Math.min(...chunk.map((c) => c.low)),
      close: chunk[chunk.length - 1].close,
      volume: chunk.reduce((s, c) => s + c.volume, 0),
    });
  }
  return out;
}

export function runPipeline(
  bars: Bar[],
  stages: Stage[],
  symbol: string
): PipelineResult {
  let rows: Row[] = bars.map((b) => ({ ...b }));
  let maWindow = 0;
  let returnsOn = false;

  for (const s of stages) {
    if (s.type === "filter") {
      const field = String(s.cfg.field || "volume") as keyof Bar;
      const min = Number(s.cfg.min) || 0;
      rows = rows.filter((r) => Number(r[field]) >= min);
    } else if (s.type === "resample") {
      rows = resample(rows, FREQ_SIZE[String(s.cfg.freq)] || 5);
    } else if (s.type === "topn") {
      const n = Math.max(1, Number(s.cfg.n) || 10);
      rows = [...rows]
        .sort((a, b) => b.volume - a.volume)
        .slice(0, n)
        .sort((a, b) => (a.date < b.date ? -1 : 1));
    } else if (s.type === "ma") {
      maWindow = Math.max(2, Number(s.cfg.window) || 20);
    } else if (s.type === "returns") {
      returnsOn = true;
    }
  }

  // derived columns computed on the final row set.
  // MA uses an expanding window for the first (window-1) points so the line
  // spans the whole chart instead of starting partway in.
  if (maWindow > 1) {
    rows = rows.map((r, i) => {
      const start = Math.max(0, i - maWindow + 1);
      let sum = 0;
      for (let k = start; k <= i; k++) sum += rows[k].close;
      return { ...r, ma: +(sum / (i - start + 1)).toFixed(2) };
    });
  }
  rows = rows.map((r, i) => ({
    ...r,
    ret: i === 0 ? null : +(((r.close / rows[i - 1].close) - 1) * 100).toFixed(2),
  }));

  const mode: "price" | "returns" = returnsOn ? "returns" : "price";
  const x = rows.map((r) => r.date);
  const primary = rows.map((r) =>
    mode === "returns" ? Number(r.ret ?? 0) : r.close
  );
  const overlay =
    mode === "price" && maWindow > 1
      ? { label: `MA${maWindow}`, values: rows.map((r) => r.ma ?? null) }
      : null;

  return { rows, x, primary, overlay, mode, sql: toSQL(stages, symbol) };
}

export function toSQL(stages: Stage[], symbol: string): string {
  const selects = ["date", "open", "high", "low", "close", "volume"];
  const where = [`symbol = '${symbol}'`];
  let from = "prices";
  let orderBy = "date";
  let limit = "";

  for (const s of stages) {
    if (s.type === "filter") {
      where.push(`${s.cfg.field} >= ${Number(s.cfg.min)}`);
    } else if (s.type === "ma") {
      selects.push(
        `avg(close) over (\n    order by date rows between ${
          Number(s.cfg.window) - 1
        } preceding and current row\n  ) as ma_${s.cfg.window}`
      );
    } else if (s.type === "returns") {
      selects.push(
        "100 * (close / lag(close) over (order by date) - 1) as daily_return"
      );
    } else if (s.type === "resample") {
      from = `(\n    select date_trunc('${
        s.cfg.freq === "monthly" ? "month" : "week"
      }', date) as date,\n           arg_min(open, date) as open, max(high) as high,\n           min(low) as low, arg_max(close, date) as close, sum(volume) as volume\n    from prices group by 1\n  ) prices`;
    } else if (s.type === "topn") {
      orderBy = "volume desc";
      limit = `\nlimit ${Number(s.cfg.n)}`;
    }
  }

  return `select ${selects.join(",\n       ")}\nfrom ${from}\nwhere ${where.join(
    "\n  and "
  )}\norder by ${orderBy}${limit};`;
}

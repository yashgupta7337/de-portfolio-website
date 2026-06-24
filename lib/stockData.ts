// Deterministic synthetic OHLCV sample data for the Pipeline Playground.
// Generated with a seeded PRNG so server-render and client-hydration match
// exactly (no Math.random / Date.now at module scope).

export type Bar = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAYS = 180;
const START = new Date(Date.UTC(2025, 0, 2));

function businessDays(n: number): string[] {
  const out: string[] = [];
  const d = new Date(START);
  while (out.length < n) {
    const day = d.getUTCDay();
    if (day !== 0 && day !== 6) out.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
}

const dates = businessDays(DAYS);

function genTicker(seed: number, start: number, drift: number, vol: number): Bar[] {
  const rnd = mulberry32(seed);
  const bars: Bar[] = [];
  let prevClose = start;
  for (let i = 0; i < DAYS; i++) {
    const shock = (rnd() - 0.5) * 2 * vol;
    const open = +(prevClose * (1 + (rnd() - 0.5) * vol * 0.4)).toFixed(2);
    const close = +(prevClose * (1 + drift + shock)).toFixed(2);
    const hi = Math.max(open, close) * (1 + rnd() * vol * 0.6);
    const lo = Math.min(open, close) * (1 - rnd() * vol * 0.6);
    const volume = Math.round(400_000 + rnd() * 4_600_000);
    bars.push({
      date: dates[i],
      open,
      high: +hi.toFixed(2),
      low: +lo.toFixed(2),
      close,
      volume,
    });
    prevClose = close;
  }
  return bars;
}

export type Ticker = {
  symbol: string;
  name: string;
  accent: string;
  bars: Bar[];
};

export const tickers: Ticker[] = [
  { symbol: "NOVA", name: "Nova Compute", accent: "#22d3ee", bars: genTicker(1, 142, 0.0007, 0.018) },
  { symbol: "ORBIT", name: "Orbit Logistics", accent: "#10b981", bars: genTicker(2, 88, 0.0002, 0.026) },
  { symbol: "FLUX", name: "Flux Energy", accent: "#8b5cf6", bars: genTicker(3, 213, -0.0003, 0.031) },
  { symbol: "ATLAS", name: "Atlas Foods", accent: "#3b82f6", bars: genTicker(4, 56, 0.0009, 0.02) },
];

export function barsFor(symbol: string): Bar[] {
  return (tickers.find((t) => t.symbol === symbol) ?? tickers[0]).bars;
}

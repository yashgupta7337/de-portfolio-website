# Yash Gupta — Data Engineer Portfolio

A dark, animated one-page portfolio built with **Next.js 15 + TypeScript + Tailwind CSS v4 + Framer Motion**.
The visual language fuses [explainx.ai](https://explainx.ai) (electric blue/cyan gradient mesh,
glassmorphism, bold Inter type) with [distiqoai.com](https://www.distiqoai.com) (emerald data
accents + a live "agent orchestrator" dashboard). All hero graphics are original CSS/SVG — no
third-party brand assets are used.

## Run locally

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

> Next.js apps run via a dev server — you can't open `index.html` directly.

## Build a static site (for deploy)

```bash
npm run build
```

This produces a fully static export in `out/`. Drop that folder on any static host
(GitHub Pages, Netlify, Vercel, S3, etc.) — no server required.

## Editing content

All résumé content lives in **`lib/content.ts`** — edit there and every section updates.
The downloadable résumé is **`public/YashGupta_Resume.pdf`**.

## Structure

```
app/            layout, page, global styles + theme tokens
components/     Nav, Hero, Orchestrator (hero dashboard), ImpactStats,
                About, Experience, Skills, Projects, Education, Contact, Footer
lib/content.ts  single source of truth for all content
public/         résumé PDF
app/icon.svg    favicon (custom shield)
```

## Credits

- **Favicon** — custom shield SVG (`app/icon.svg`), drawn to match the site's
  blue→cyan→emerald gradient. Inspired by
  [Shield icons created by Freepik — Flaticon](https://www.flaticon.com/free-icons/shield).

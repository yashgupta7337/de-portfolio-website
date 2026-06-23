import { profile } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] py-8">
      <div className="container-x flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--color-muted)]">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 font-mono text-sm font-extrabold text-white">
          Y
        </span>
        <p>
          © {year} {profile.name} · {profile.role} · Built with care.
        </p>
        <a href="#home" className="transition hover:text-cyan-300">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

import { profile } from "@/lib/content";
import LogoBadge from "./LogoBadge";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] py-8">
      <div className="container-x flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--color-muted)]">
        <LogoBadge className="h-8 w-8 rounded-lg text-sm" rx={10} />
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

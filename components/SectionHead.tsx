import Reveal from "./Reveal";

export default function SectionHead({
  kicker,
  title,
}: {
  kicker: string;
  title: React.ReactNode;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <span className="kicker">{kicker}</span>
      <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight">
        {title}
      </h2>
    </Reveal>
  );
}

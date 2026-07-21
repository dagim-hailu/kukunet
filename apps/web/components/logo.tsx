import Link from 'next/link';

interface LogoProps {
  href?: string;
  light?: boolean;
}

export function Logo({ href = '/', light = false }: LogoProps) {
  const content = (
    <span className="flex items-center gap-3 font-[family-name:var(--font-outfit)] text-sm font-semibold uppercase tracking-[0.28em]">
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
          light
            ? 'border-[var(--border-2)] bg-[var(--bg-3)] text-[var(--text)]'
            : 'border-[var(--green)]/40 bg-[var(--bg-2)] text-[var(--green)]'
        } shadow-[0_16px_40px_rgba(15,19,25,0.18)] transition-colors duration-300`}
      >
        KU
      </span>
      <span className={light ? 'text-[var(--text)]' : 'text-[var(--text)]'}>KUKUNET Digital</span>
    </span>
  );

  return <Link href={href}>{content}</Link>;
}

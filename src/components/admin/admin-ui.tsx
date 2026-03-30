"use client";

import Link from "next/link";

export function PanelCard({
  title,
  eyebrow,
  action,
  children,
  className = "",
}: {
  title?: string;
  eyebrow?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[24px] border border-[var(--admin-line)] bg-[var(--admin-panel)] p-5 shadow-[var(--admin-shadow)] ${className}`}>
      {(title || eyebrow || action) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {eyebrow ? (
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--admin-muted)]">
                {eyebrow}
              </p>
            ) : null}
            {title ? <h3 className="text-[20px] font-semibold text-[var(--admin-ink)]">{title}</h3> : null}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--admin-muted)]">
          Etico Admin
        </p>
        <h1 className="text-[34px] font-semibold tracking-[-0.03em] text-[var(--admin-ink)]">{title}</h1>
        <p className="mt-2 max-w-[720px] text-[15px] leading-7 text-[var(--admin-muted)]">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  trend,
  tone,
}: {
  label: string;
  value: string;
  trend: string;
  tone: "neutral" | "positive" | "warning";
}) {
  const trendColor =
    tone === "positive"
      ? "text-emerald-600"
      : tone === "warning"
        ? "text-amber-600"
        : "text-[var(--admin-muted)]";

  return (
    <div className="rounded-[22px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-5">
      <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--admin-muted)]">{label}</p>
      <p className="mt-4 text-[31px] font-semibold tracking-[-0.03em] text-[var(--admin-ink)]">{value}</p>
      <p className={`mt-2 text-[13px] font-medium ${trendColor}`}>{trend}</p>
    </div>
  );
}

export function StatusBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "positive" | "warning" | "danger";
}) {
  const palette =
    tone === "positive"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : tone === "warning"
        ? "bg-amber-50 text-amber-700 border-amber-100"
        : tone === "danger"
          ? "bg-rose-50 text-rose-700 border-rose-100"
          : "bg-slate-100 text-slate-700 border-slate-200";

  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[12px] font-semibold ${palette}`}>{label}</span>;
}

export function ActionButton({
  href,
  children,
  tone = "primary",
}: {
  href?: string;
  children: React.ReactNode;
  tone?: "primary" | "secondary" | "ghost";
}) {
  const base =
    tone === "primary"
      ? "bg-[var(--admin-accent)] text-white hover:brightness-95"
      : tone === "secondary"
        ? "bg-[var(--admin-panel-strong)] text-[var(--admin-ink)] border border-[var(--admin-line)] hover:border-[var(--admin-accent)]"
        : "bg-transparent text-[var(--admin-muted)] hover:text-[var(--admin-ink)]";

  if (href) {
    return (
      <Link href={href} className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-[14px] font-semibold transition ${base}`}>
        {children}
      </Link>
    );
  }

  return <span className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-[14px] font-semibold transition ${base}`}>{children}</span>;
}

export function MiniBarChart({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <div className="flex h-[220px] items-end gap-3">
      {data.map((item) => (
        <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
          <div
            className="w-full rounded-t-[14px] bg-[linear-gradient(180deg,var(--admin-accent-soft),var(--admin-accent))]"
            style={{ height: `${Math.max((item.value / max) * 180, 22)}px` }}
          />
          <div className="text-center">
            <p className="text-[12px] font-semibold text-[var(--admin-ink)]">{item.value}</p>
            <p className="mt-1 text-[11px] text-[var(--admin-muted)]">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DonutLegend({
  items,
}: {
  items: { label: string; value: number }[];
}) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const segments = items
    .map((item, index) => {
      const start = items.slice(0, index).reduce((sum, current) => sum + current.value, 0);
      const color = ["#3e5c76", "#6e8faa", "#9cb6c9", "#cbd8e2"][index % 4];
      return `${color} ${(start / total) * 100}% ${((start + item.value) / total) * 100}%`;
    })
    .join(", ");

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center">
      <div
        className="mx-auto h-40 w-40 rounded-full"
        style={{
          background: `conic-gradient(${segments})`,
          mask: "radial-gradient(circle at center, transparent 0 42px, black 43px)",
          WebkitMask: "radial-gradient(circle at center, transparent 0 42px, black 43px)",
        }}
      />
      <div className="flex-1 space-y-3">
        {items.map((item, index) => {
          const color = ["#3e5c76", "#6e8faa", "#9cb6c9", "#cbd8e2"][index % 4];
          return (
            <div key={item.label} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-[14px] text-[var(--admin-ink)]">{item.label}</span>
              </div>
              <span className="text-[13px] font-semibold text-[var(--admin-muted)]">%{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-[22px] border border-dashed border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-6 py-10 text-center">
      <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-[var(--admin-accent-soft)]/40" />
      <h3 className="text-[20px] font-semibold text-[var(--admin-ink)]">{title}</h3>
      <p className="mx-auto mt-2 max-w-[440px] text-[14px] leading-6 text-[var(--admin-muted)]">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function SkeletonPanel() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-[22px] border border-[var(--admin-line)] bg-[var(--admin-panel)] p-5">
          <div className="h-3 w-20 rounded-full bg-[var(--admin-line)]" />
          <div className="mt-4 h-8 w-28 rounded-full bg-[var(--admin-line)]" />
          <div className="mt-6 h-20 rounded-2xl bg-[var(--admin-line)]" />
        </div>
      ))}
    </div>
  );
}

export function Modal({
  open,
  title,
  description,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[28px] border border-[var(--admin-line)] bg-[var(--admin-panel)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[24px] font-semibold text-[var(--admin-ink)]">{title}</h3>
            {description ? <p className="mt-2 text-[14px] leading-6 text-[var(--admin-muted)]">{description}</p> : null}
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-[var(--admin-line)] px-3 py-1.5 text-[13px] text-[var(--admin-muted)]">
            Kapat
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SegmentedControl<T extends string>({
  value,
  onChange,
  items,
}: {
  value: T;
  onChange: (value: T) => void;
  items: { value: T; label: string }[];
}) {
  return (
    <div className="inline-flex rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-1">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={`rounded-[14px] px-3.5 py-2 text-[13px] font-semibold transition ${
            item.value === value
              ? "bg-[var(--admin-accent)] text-white"
              : "text-[var(--admin-muted)] hover:text-[var(--admin-ink)]"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}


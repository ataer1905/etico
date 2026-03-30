"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { roleLabels, type AdminRole } from "@/lib/admin-data";
import { useAdminContext } from "@/components/admin/admin-context";

const roles: AdminRole[] = ["super_admin", "manager", "editor", "order_manager"];

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAdminContext();
  const [selectedRole, setSelectedRole] = useState<AdminRole>("super_admin");
  const [email, setEmail] = useState("admin@etico.local");
  const [password, setPassword] = useState("demo123");

  return (
    <main className="admin-theme flex min-h-screen items-center justify-center bg-[var(--admin-bg)] px-4 py-10" data-theme="light">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-[var(--admin-line)] bg-[var(--admin-panel)] shadow-[0_26px_90px_rgba(18,24,32,0.14)] lg:grid-cols-[1.05fr_1fr]">
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#203648_0%,#2a4358_100%)] p-8 text-white md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%),linear-gradient(180deg,transparent,rgba(0,0,0,0.22))]" />
          <div className="relative">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white/65">Cagdas Isi</p>
            <h1 className="mt-6 max-w-md text-[42px] font-semibold tracking-[-0.04em]">Katalog, siparis ve icerik yonetimini tek yerde toplayin.</h1>
            <p className="mt-5 max-w-md text-[16px] leading-7 text-white/72">
              Admin Studio, storefront ile ayni marka hissini koruyan ama operasyonu hizlandiran premium bir yonetim deneyimi sunar.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[
                "Rol bazli menu kontrolu",
                "Siparis ve stok takibi",
                "Banner / blog / medya yonetimi",
                "Tema ve SEO ayarlari",
              ].map((item) => (
                <div key={item} className="rounded-[22px] border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                  <p className="text-[14px] font-medium text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="p-8 md:p-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--admin-muted)]">Guvenli Giris</p>
          <h2 className="mt-4 text-[36px] font-semibold tracking-[-0.04em] text-[var(--admin-ink)]">Admin paneline giris yap</h2>
          <p className="mt-3 text-[15px] leading-7 text-[var(--admin-muted)]">
            Demo girisi icin asagidaki rol secimini kullanabilir, ardindan dogrudan panele gecebilirsiniz.
          </p>

          <div className="mt-8 grid gap-4">
            <label className="grid gap-2">
              <span className="text-[13px] font-semibold text-[var(--admin-ink)]">E-posta</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[15px] outline-none"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-[13px] font-semibold text-[var(--admin-ink)]">Sifre</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[15px] outline-none"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`rounded-2xl px-4 py-2.5 text-[13px] font-semibold transition ${
                  selectedRole === role
                    ? "bg-[var(--admin-accent)] text-white"
                    : "border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] text-[var(--admin-muted)]"
                }`}
              >
                {roleLabels[role]}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              login(selectedRole);
              router.push(params.get("next") || "/admin");
            }}
            className="mt-8 w-full rounded-[22px] bg-[var(--admin-accent)] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_20px_40px_rgba(62,92,118,0.18)]"
          >
            Yonetim Paneline Gir
          </button>

          <div className="mt-5 flex items-center justify-between text-[14px]">
            <Link href="/admin/forgot-password" className="text-[var(--admin-muted)] hover:text-[var(--admin-ink)]">
              Sifremi unuttum
            </Link>
            <span className="text-[var(--admin-muted)]">Demo sifre: demo123</span>
          </div>
        </section>
      </div>
    </main>
  );
}


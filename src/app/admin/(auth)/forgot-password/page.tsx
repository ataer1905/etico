"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="admin-theme flex min-h-screen items-center justify-center bg-[var(--admin-bg)] px-4 py-10" data-theme="light">
      <div className="w-full max-w-xl rounded-[30px] border border-[var(--admin-line)] bg-[var(--admin-panel)] p-8 shadow-[0_24px_80px_rgba(18,24,32,0.12)] md:p-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--admin-muted)]">Sifre Kurtarma</p>
        <h1 className="mt-4 text-[34px] font-semibold tracking-[-0.04em] text-[var(--admin-ink)]">Yeni oturum baglantisi olustur</h1>
        <p className="mt-3 text-[15px] leading-7 text-[var(--admin-muted)]">
          Demo panelde bu akis ornek amaclidir. E-posta adresinizi girerek sifre sifirlama baglantisi gonderimi deneyimini gorebilirsiniz.
        </p>

        <label className="mt-8 grid gap-2">
          <span className="text-[13px] font-semibold text-[var(--admin-ink)]">Admin e-postasi</span>
          <input
            type="email"
            defaultValue="admin@etico.local"
            className="rounded-2xl border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] px-4 py-3 text-[15px] outline-none"
          />
        </label>

        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="mt-6 w-full rounded-[22px] bg-[var(--admin-accent)] px-5 py-4 text-[15px] font-semibold text-white"
        >
          Sifirlama Baglantisi Gonder
        </button>

        {submitted ? (
          <div className="mt-6 rounded-[20px] border border-emerald-100 bg-emerald-50 px-4 py-4 text-[14px] leading-6 text-emerald-700">
            Demo baglantisi olusturuldu. Gercek entegrasyonda burada e-posta gonderimi ve token dogrulama akisi calisacak.
          </div>
        ) : null}

        <div className="mt-6">
          <Link href="/admin/login" className="text-[14px] font-medium text-[var(--admin-muted)] hover:text-[var(--admin-ink)]">
            Giris ekranina don
          </Link>
        </div>
      </div>
    </main>
  );
}


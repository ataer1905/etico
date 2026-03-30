import { notFound } from "next/navigation";
import { adminOrders } from "@/lib/admin-data";
import { PageHeader, PanelCard, StatusBadge } from "@/components/admin/admin-ui";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = adminOrders.find((item) => item.id === id);

  if (!order) notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Siparis ${order.id}`}
        description="Siparis detaylari, musteri bilgileri, adres, notlar ve durum zaman akisi bu ekranda bir arada sunulur."
      />

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.85fr]">
        <PanelCard title="Siparis Ozet Bilgisi" eyebrow={order.customer}>
          <div className="grid gap-4 md:grid-cols-2">
            <Info title="Musteri" value={order.customer} />
            <Info title="E-posta" value={order.email} />
            <Info title="Toplam Tutar" value={`${order.total.toLocaleString("tr-TR")} TL`} />
            <Info title="Urun Adedi" value={`${order.itemCount} kalem`} />
            <Info title="Teslimat Adresi" value={order.address} />
            <div className="rounded-[18px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">Durumlar</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <StatusBadge label={order.status} tone={order.status === "delivered" ? "positive" : order.status === "cancelled" ? "danger" : "warning"} />
                <StatusBadge label={order.paymentStatus} tone={order.paymentStatus === "paid" ? "positive" : "warning"} />
              </div>
            </div>
          </div>

          {order.note ? (
            <div className="mt-5 rounded-[20px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">Siparis Notu</p>
              <p className="mt-3 text-[14px] leading-7 text-[var(--admin-ink)]">{order.note}</p>
            </div>
          ) : null}
        </PanelCard>

        <PanelCard title="Siparis Zaman Akisi" eyebrow="Order Timeline">
          <div className="space-y-4">
            {order.timeline.map((step, index) => (
              <div key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className={`grid h-9 w-9 place-items-center rounded-full border text-[12px] font-semibold ${step.done ? "border-[var(--admin-accent)] bg-[var(--admin-accent)] text-white" : "border-[var(--admin-line)] bg-[var(--admin-panel-strong)] text-[var(--admin-muted)]"}`}>
                    {index + 1}
                  </span>
                  {index !== order.timeline.length - 1 ? <span className="mt-2 h-full w-px bg-[var(--admin-line)]" /> : null}
                </div>
                <div className="pb-6">
                  <p className="text-[15px] font-semibold text-[var(--admin-ink)]">{step.label}</p>
                  <p className="mt-1 text-[13px] text-[var(--admin-muted)]">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">{title}</p>
      <p className="mt-3 text-[15px] leading-7 text-[var(--admin-ink)]">{value}</p>
    </div>
  );
}


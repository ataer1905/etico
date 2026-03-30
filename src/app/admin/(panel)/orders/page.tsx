import Link from "next/link";
import { adminOrders } from "@/lib/admin-data";
import { PageHeader, PanelCard, StatusBadge } from "@/components/admin/admin-ui";

function orderStatusTone(status: string) {
  if (status === "delivered") return "positive" as const;
  if (status === "new" || status === "preparing") return "warning" as const;
  if (status === "cancelled") return "danger" as const;
  return "neutral" as const;
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Siparis Yonetimi"
        description="Siparisleri durum, odeme ve teslimat akisina gore izleyin. Zaman cizelgesi ile detaylari acin."
      />

      <PanelCard title="Siparis Listesi" eyebrow={`${adminOrders.length} aktif kayit`}>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-[var(--admin-line)] text-[12px] uppercase tracking-[0.18em] text-[var(--admin-muted)]">
                <th className="pb-4 pr-4">Siparis No</th>
                <th className="pb-4 pr-4">Musteri</th>
                <th className="pb-4 pr-4">Toplam</th>
                <th className="pb-4 pr-4">Odeme</th>
                <th className="pb-4 pr-4">Durum</th>
                <th className="pb-4 pr-4">Tarih</th>
                <th className="pb-4">Detay</th>
              </tr>
            </thead>
            <tbody>
              {adminOrders.map((order) => (
                <tr key={order.id} className="border-b border-[var(--admin-line)] align-top">
                  <td className="py-4 pr-4">
                    <p className="text-[14px] font-semibold text-[var(--admin-ink)]">{order.id}</p>
                    <p className="mt-1 text-[12px] text-[var(--admin-muted)]">{order.itemCount} urun</p>
                  </td>
                  <td className="py-4 pr-4">
                    <p className="text-[14px] font-semibold text-[var(--admin-ink)]">{order.customer}</p>
                    <p className="mt-1 text-[12px] text-[var(--admin-muted)]">{order.email}</p>
                  </td>
                  <td className="py-4 pr-4 text-[14px] font-semibold text-[var(--admin-ink)]">{order.total.toLocaleString("tr-TR")} TL</td>
                  <td className="py-4 pr-4">
                    <StatusBadge label={order.paymentStatus === "paid" ? "Odendi" : order.paymentStatus === "pending" ? "Bekliyor" : "Iade"} tone={order.paymentStatus === "paid" ? "positive" : order.paymentStatus === "pending" ? "warning" : "danger"} />
                  </td>
                  <td className="py-4 pr-4">
                    <StatusBadge label={order.status} tone={orderStatusTone(order.status)} />
                  </td>
                  <td className="py-4 pr-4 text-[13px] text-[var(--admin-muted)]">{order.createdAt}</td>
                  <td className="py-4">
                    <Link href={`/admin/orders/${order.id}`} className="rounded-xl border border-[var(--admin-line)] px-3 py-2 text-[12px] font-semibold text-[var(--admin-ink)]">
                      Detayi Ac
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelCard>
    </div>
  );
}


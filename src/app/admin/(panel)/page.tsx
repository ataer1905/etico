import Link from "next/link";
import {
  dashboardMetrics,
  orderChart,
  recentActivities,
  salesChannels,
  quickActions,
} from "@/lib/admin-data";
import { ActionButton, DonutLegend, MiniBarChart, PageHeader, PanelCard, StatCard, StatusBadge } from "@/components/admin/admin-ui";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Satis, katalog ve operasyon performansini tek bakista izleyin. Bu demo panel storefront ile uyumlu gorsel dilde tasarlanmis premium bir yonetim alanidir."
        action={<ActionButton href="/admin/products">Yeni Urun Akisi</ActionButton>}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {dashboardMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <PanelCard
          eyebrow="Siparis Grafigi"
          title="Haftalik siparis hizi"
          action={<StatusBadge label="Canli Demo" tone="positive" />}
        >
          <MiniBarChart data={orderChart.map((item) => ({ label: item.label, value: item.orders }))} />
        </PanelCard>

        <PanelCard eyebrow="Kategori Dagilimi" title="Satis katkisi">
          <DonutLegend items={salesChannels} />
        </PanelCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.9fr_0.9fr]">
        <PanelCard eyebrow="Satis Ozeti" title="Gelir akisi ve operasyon notlari">
          <div className="grid gap-4 md:grid-cols-2">
            {orderChart.map((item) => (
              <div key={item.label} className="rounded-[18px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">{item.label}</p>
                <p className="mt-3 text-[24px] font-semibold tracking-[-0.03em] text-[var(--admin-ink)]">{item.revenue}K TL</p>
                <p className="mt-2 text-[13px] text-[var(--admin-muted)]">{item.orders} siparis islenmis</p>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard eyebrow="Son Aktiviteler" title="Bugun olanlar">
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={activity} className="flex gap-3 rounded-[18px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--admin-accent)]" />
                <div>
                  <p className="text-[14px] leading-6 text-[var(--admin-ink)]">{activity}</p>
                  <p className="mt-1 text-[12px] text-[var(--admin-muted)]">{index + 1}. aktivite kaydi</p>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard eyebrow="Hizli Islem" title="Yonetici kisayollari">
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="block rounded-[18px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4 transition hover:border-[var(--admin-accent)]"
              >
                <p className="text-[15px] font-semibold text-[var(--admin-ink)]">{action.title}</p>
                <p className="mt-2 text-[13px] leading-6 text-[var(--admin-muted)]">{action.detail}</p>
              </Link>
            ))}
          </div>
        </PanelCard>
      </div>
    </div>
  );
}


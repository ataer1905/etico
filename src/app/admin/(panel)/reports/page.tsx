import { orderChart, reportHighlights } from "@/lib/admin-data";
import { MiniBarChart, PageHeader, PanelCard } from "@/components/admin/admin-ui";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Raporlama"
        description="Satis raporlari, siparis performansi ve en cok goruntulenen / satilan urunler icin demo analiz ekrani."
      />

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
        <PanelCard title="Satis Raporu" eyebrow="Aylik performans">
          <MiniBarChart data={orderChart.map((item) => ({ label: item.label, value: item.revenue }))} />
        </PanelCard>

        <PanelCard title="One Cikan Sonuclar" eyebrow="KPI">
          <div className="space-y-4">
            {reportHighlights.map((item) => (
              <div key={item.label} className="rounded-[20px] border border-[var(--admin-line)] bg-[var(--admin-panel-strong)] p-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--admin-muted)]">{item.label}</p>
                <p className="mt-3 text-[18px] font-semibold text-[var(--admin-ink)]">{item.value}</p>
                <p className="mt-2 text-[13px] text-[var(--admin-muted)]">{item.meta}</p>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
    </div>
  );
}


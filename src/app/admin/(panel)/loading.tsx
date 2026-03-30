import { SkeletonPanel } from "@/components/admin/admin-ui";

export default function AdminLoading() {
  return (
    <div className="admin-theme min-h-screen bg-[var(--admin-bg)] p-8" data-theme="light">
      <SkeletonPanel />
    </div>
  );
}


import { AdminProvider } from "@/components/admin/admin-context";

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminProvider>{children}</AdminProvider>;
}


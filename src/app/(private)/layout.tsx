import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { SessionProvider } from "next-auth/react";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-[var(--color-background)]">
        <AdminSidebar />
        <main className="lg:ml-64 min-h-screen p-6 lg:p-8">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}

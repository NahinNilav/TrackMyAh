import { RouteGuard } from "@/components/route-guard"
import Header from "@/components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RouteGuard>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </RouteGuard>
  )
}


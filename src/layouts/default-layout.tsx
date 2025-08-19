import Footer from "@/components/layouts/footer"
import { Header } from "@/components/layouts/header"
import { routePath } from "@/routes/routes"
import { cn } from "@/utils/classnames"
import { FC } from "react"
import { Outlet, useLocation } from "react-router-dom"

interface DefaultLayoutProps {}

export const DefaultLayout: FC<DefaultLayoutProps> = () => {
  const location = useLocation()
  return (
    <div
      className={cn(
        "",
        location.pathname === routePath.home &&
          "min-h-svh bg-[linear-gradient(172deg,#456396_-27.86%,#000D1F_82.05%)] bg-fixed",
      )}
    >
      <Header />
      <main className="pb-16 pt-[76px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

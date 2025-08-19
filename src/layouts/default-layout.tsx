import Footer from "@/components/layouts/footer"
import { Header } from "@/components/layouts/header"
import { cn } from "@/utils/classnames"
import { FC } from "react"
import { Outlet } from "react-router-dom"

interface DefaultLayoutProps {}

export const DefaultLayout: FC<DefaultLayoutProps> = () => {
  // const location = useLocation()
  return (
    <div className={cn("relative", "min-h-svh bg-[#000D1F] bg-fixed")}>
      <Header />
      <main className="pb-16 pt-[76px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

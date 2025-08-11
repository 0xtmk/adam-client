import { Header } from "@/components/layouts/header"
import { FC } from "react"
import { Outlet } from "react-router-dom"

interface DefaultLayoutProps {}

export const DefaultLayout: FC<DefaultLayoutProps> = () => {
  return (
    <div >
      <Header />
      <main >
        <Outlet />
      </main>
    </div>
  )
}

import { FC } from "react"
import { Outlet } from "react-router-dom"

interface EmptyLayoutProps {}

export const EmptyLayout: FC<EmptyLayoutProps> = () => {
  return (
    <div>
      <main className="pt-10">
        <Outlet />
      </main>
    </div>
  )
}

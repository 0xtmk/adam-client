import { FC } from "react"
import { Outlet } from "react-router-dom"

interface EmptyLayoutProps {}

export const EmptyLayout: FC<EmptyLayoutProps> = () => {
  return (
    <div>
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  )
}

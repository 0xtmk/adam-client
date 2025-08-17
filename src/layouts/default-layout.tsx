import { Header } from "@/components/layouts/header"
import { socials } from "@/constants/app"
import { FC } from "react"
import { Outlet } from "react-router-dom"

interface DefaultLayoutProps {}

export const DefaultLayout: FC<DefaultLayoutProps> = () => {
  return (
    <div>
      <Header />
      <main className="pt-36 max-md:pt-48">
        <Outlet />
      </main>
      <footer className="bg-[#0B1F3A] p-2 text-center text-white flex items-center justify-between">
        <p className="text-xs">©2025 Adamgives. All rights reserved.</p>
        <div className="flex items-center gap-3">
          {socials?.map((social, index) => (
            <a className="hover:scale-105 active:scale-95" key={index} href={social.href} target="_blank" rel="noopener noreferrer">
              <img src={social.image} alt="" className="inline-block h-6 w-6" />
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

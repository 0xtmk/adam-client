import { RefLink } from "@/libs/ui/ref-link"
import { FC, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

import { useUserStore } from "@/hooks/stores/use-user-store"
import { ButtonConnect } from "@/libs/ui/button-connect"
import { Text } from "@/libs/ui/text"
import { useSolanaWallet } from "@/libs/web3/solana/hooks/use-solana-wallet"
import { routePath, routes } from "@/routes/routes"
import { Service } from "@/services/app.service"
import { cn } from "@/utils/classnames"
import { truncateString } from "@/utils/string"
import { toastContent } from "@/utils/toast"
import { Tooltip } from "antd"
import copy from "copy-to-clipboard"
import { useRef, useState } from "react"
import { Container } from "./container"

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { connecting, address, disconnectWallet, connectWallet } = useSolanaWallet()
  const { userInfo, token, refreshUserInfo } = useUserStore()
  // const { userBalance } = useUserInfo()

  const location = useLocation()

  const handleConnectX = async () => {
    if (userInfo?.twitter_id) {
      const response = await Service.common.logoutTwitter()
      response && refreshUserInfo()
      return
    }
    try {
      const res = await Service.common.getTwitterUrl()
      if (res) {
        window.open(res)
      }
    } catch (error) {
      console.error("Error connecting:", error)
    }
  }

  const renderTwitterBtn = () => {
    if (!userInfo?.twitter_id) {
      return (
        <button
          onClick={handleConnectX}
          className="twitter-connect-btn flex h-9 w-28 items-center justify-center gap-1 rounded-full bg-[rgba(16,38,68,0.2)] shadow-[0_4px_0_rgba(0,0,0,0.25),inset_0_4px_4px_rgba(163,163,163,0.25)] backdrop-blur-[10px] active:scale-95"
        >
          <Text variant="span" className="font-neueMachinaBold text-xs text-white">
            Connect
          </Text>
          <img src="/images/twitter.png" className="h-3 w-3" alt="" />
        </button>
      )
    }

    return (
      <Tooltip title="Logout" placement="bottom">
        <button
          onClick={handleConnectX}
          className="twitter-connect-btn flex h-9 items-center justify-center gap-1 rounded-full bg-[rgba(16,38,68,0.2)] px-5 shadow-[0_4px_0_rgba(0,0,0,0.25),inset_0_4px_4px_rgba(163,163,163,0.25)] backdrop-blur-[10px] active:scale-95"
        >
          <Text>{userInfo?.twitter_full_name}</Text>
          <img src={userInfo?.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" alt="" />
        </button>
      </Tooltip>
    )
  }

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  const renderButtonSolWallet = () => {
    if (!address) {
      return (
        <ButtonConnect
          onClick={() => {
            connectWallet()
          }}
        >
          <Text variant="span" className="text-xs text-white">
            CONNECT
          </Text>
        </ButtonConnect>
      )
    }
    return (
      <div className="relative" ref={dropdownRef}>
        <ButtonConnect onClick={() => setOpen((v) => !v)}>
          <Text variant="span" className="text-xs text-white">
            {truncateString(address)}
          </Text>
        </ButtonConnect>
        {open && (
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-[#0085FE] bg-[#1A2742] shadow-lg">
            <button
              className="flex w-full items-center gap-2 rounded-t-xl px-4 py-3 transition hover:bg-[#22345a]"
              onClick={() => {
                copy(address || "")
                toastContent({
                  type: "success",
                  message: "Copied to clipboard",
                })
                setOpen(false)
              }}
            >
              <img src="/icons/copy.png" className="h-5 w-5" alt="copy" />
              <span className="flex-1 text-left text-sm text-white">{truncateString(address)}</span>
              <span className="text-xs text-[#00FF88]">Copy</span>
            </button>
            <button
              className="flex w-full items-center gap-2 rounded-b-xl border-t border-[#15467D] px-4 py-3 transition hover:bg-[#22345a]"
              onClick={() => {
                setOpen(false)
                disconnectWallet()
              }}
            >
              <img src="/icons/logout.png" className="h-5 w-5" alt="disconnect" />
              <span className="flex-1 text-left text-sm text-white">Disconnect</span>
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <header className="header-bg-linear fixed top-0 z-20 h-32 w-full backdrop-blur-[10px]">
        <Container className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between pt-4">
            <Link to={routePath.home} className="flex items-center gap-1">
              <img src="/logo/logo.png" alt="" className="h-11 w-11 max-sm:h-6 max-sm:w-6" />
              <Text className="font-neueMachinaBold text-2xl max-sm:text-sm">$ADAM</Text>
            </Link>

            <div className="flex items-center gap-3 max-md:hidden">
              <img src="/icons/prayer.png" alt="" className="h-11 w-11" />
              <Text className="">The Wheel of Fortune</Text>
              <img src="/icons/prayer.png" alt="" className="h-11 w-11" />
            </div>

            <div className="flex items-center gap-3">
              {/* <div className="flex items-center gap-1">
                <img src="/images/adam-point.png" className="h-6 w-6" alt="" />
                <div className="flex flex-col">
                  <Text variant="span" className="text-[10px] text-xs text-white">
                    Total Reward
                  </Text>
                  <Text variant="span" className="font-neueMachinaBold text-[10px] text-xs text-white">
                    {userBalance?.point || 0} Points
                  </Text>
                </div>
              </div> */}

              {renderTwitterBtn()}

              <div className="flex items-center gap-3">{renderButtonSolWallet()}</div>
            </div>
          </div>

          <div className="md:hidden flex justify-center">
            <div className="flex items-center gap-3">
              <img src="/icons/prayer.png" alt="" className="h-11 w-11 max-sm:h-6 max-sm:w-6" />
              <Text className="max-sm:text-sm">The Wheel of Fortune</Text>
              <img src="/icons/prayer.png" alt="" className="h-11 w-11 max-sm:h-6 max-sm:w-6" />
            </div>
          </div>

          <div className="flex max-md:grid max-md:grid-cols-3 max-sm:-mx-4">
            {routes.map((route) => {
              if (route.isAuth && (!token || !userInfo?.twitter_id)) return null
              const currentPath = location.pathname.replace(/\/$/, "")
              const routePath = route.to.replace(/\/$/, "")
              const isActive = currentPath === routePath
              return (
                <RefLink key={route.to} to={route.to}>
                  <div className="h-12 w-[200px] max-md:h-10 max-md:w-auto">
                    <div className="relative h-full overflow-hidden rounded-t-3xl bg-[linear-gradient(180deg,#007AFF_0%,#060E18_100%)] p-[2px]">
                      <div
                        className={cn(
                          "bg-[linear-gradient(182deg,rgba(17,55,103,0.20)_-16.39%,rgba(0,102,255,0.20)_71.93%)] shadow-[0_0.842px_1.368px_0_rgba(0,0,0,0.25),0_0.842px_0.842px_0_rgba(163,163,163,0.25)_inset] backdrop-blur-[1px]",
                          "flex items-center justify-center",
                          "h-full rounded-t-3xl",
                          "hover:bg-[linear-gradient(172deg,#567FB3_-27.86%,#000D1F_82.05%)]",
                          isActive && "bg-[linear-gradient(172deg,#567FB3_-27.86%,#000D1F_82.05%)]",
                        )}
                      >
                        <Text className="font-neueMachinaBold text-lg max-sm:text-xs">{route.label}</Text>
                      </div>
                    </div>
                  </div>
                </RefLink>
              )
            })}
          </div>
        </Container>
      </header>
    </>
  )
}

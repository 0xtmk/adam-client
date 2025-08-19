import { FC, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

import useUserInfo from "@/hooks/use-user-balance"
import { Button } from "@/libs/ui/button"
import { ButtonConnect } from "@/libs/ui/button-connect"
import { RefLink } from "@/libs/ui/ref-link"
import { Text } from "@/libs/ui/text"
import { useSolanaWallet } from "@/libs/web3/solana/hooks/use-solana-wallet"
import { routePath, routes } from "@/routes/routes"
import { formatNumber } from "@/utils/number"
import { truncateString } from "@/utils/string"
import { toastContent } from "@/utils/toast"
import copy from "copy-to-clipboard"
import { useRef, useState } from "react"
import { Container } from "./container"

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { connecting, address, disconnectWallet, connectWallet } = useSolanaWallet()
  const { userBalance } = useUserInfo()

  const location = useLocation()

  const [openTwitterDropdown, setOpenTwitterDropdown] = useState(false)
  const twitterDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (twitterDropdownRef.current && !twitterDropdownRef.current.contains(event.target as Node)) {
        setOpenTwitterDropdown(false)
      }
    }
    if (openTwitterDropdown) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [openTwitterDropdown])

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
        <Button type="secondary" onClick={() => setOpen((v) => !v)}>
          <Text variant="span" className="text-xs text-white">
            {truncateString(address)}
          </Text>
        </Button>

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
    <header className="fixed top-0 z-50 h-[76px] w-full bg-[rgba(255,255,255,0.01)] backdrop-blur-[25px]">
      <Container size="header" className="flex h-full items-center justify-between">
        <div className="flex items-center gap-20">
          <Link to={routePath.home} className="flex items-center gap-1">
            <img src="/logo/logo.png" alt="" className="h-11 w-11 max-sm:h-6 max-sm:w-6" />
            <Text className="font-neueMachinaBold text-2xl max-sm:text-sm">$ADAM</Text>
          </Link>

          {routes?.map((route) => {
            const currentPath = location.pathname.replace(/\/$/, "")
            const routePathCurrent = route.to.replace(/\/$/, "")
            const isActive = currentPath === routePathCurrent
            return (
              <RefLink
                key={route.to}
                to={route.to}
                className={
                  isActive
                    ? "font-neueMachinaBold flex items-center gap-1 text-xl"
                    : "font-neueMachinaBold flex items-center gap-1 text-xl text-white"
                }
              >
                {route.to === routePath.leaderboard && <span>🏆</span>}
                <span
                  className={isActive ? "animate-gradient-text" : undefined}
                  style={
                    isActive
                      ? {
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          color: "transparent",
                          backgroundImage: "linear-gradient(92deg, #A1D5FF 5.57%, #3499FF 111.38%)",
                          backgroundSize: "200% 100%",
                          animation: "gradient-slide 2.5s linear infinite",
                        }
                      : undefined
                  }
                >
                  {route.label}
                </span>
              </RefLink>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src="/images/tokens/points.png" className="h-5 w-5" alt="" />
            <Text className="font-neueMachinaBold text-base">{formatNumber(+userBalance?.point || 0)}</Text>
          </div>

          {renderButtonSolWallet()}
        </div>
      </Container>
    </header>
  )
}

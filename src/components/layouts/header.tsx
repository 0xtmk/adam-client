import { FC } from "react"
import { Link, NavLink } from "react-router-dom"

import { ButtonConnect } from "@/libs/ui/button-connect"
import { Text } from "@/libs/ui/text"
import { useSolanaWallet } from "@/libs/web3/solana/hooks/use-solana-wallet"
import { routePath, routes } from "@/routes/routes"
import { truncateString } from "@/utils/string"
import { Container } from "./container"

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { connecting, address, disconnectWallet, connectWallet } = useSolanaWallet()

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
      <ButtonConnect onClick={disconnectWallet}>
        <Text variant="span" className="text-xs text-white">
          {truncateString(address)}
        </Text>
      </ButtonConnect>
    )
  }

  return (
    <>
      <header className="header-bg-linear h-44 backdrop-blur-[10px]">
        <Container className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between pt-6">
            <Link to={routePath.home} className="flex items-center gap-1">
              <img src="/logo/logo.png" alt="" className="h-11 w-11" />
              <Text className="font-neueMachinaBold text-2xl">$ADAM</Text>
            </Link>

            <div className="flex items-center gap-3">
              <img src="/icons/prayer.png" alt="" className="h-11 w-11" />
              <Text className="">BLESS YOU CHILDREN</Text>
              <img src="/icons/prayer.png" alt="" className="h-11 w-11" />
            </div>

            <div className="flex items-end gap-3">
              <button className="flex h-9 w-28 items-center justify-center gap-1 rounded-full bg-[rgba(16,38,68,0.2)] shadow-[0_4px_0_rgba(0,0,0,0.25),inset_0_4px_4px_rgba(163,163,163,0.25)] backdrop-blur-[10px] active:scale-95">
                <img src="/images/adam-point.png" className="h-5 w-5" alt="" />
                <Text variant="span" className="font-neueMachinaBold text-xs text-white">
                  150 Points
                </Text>
              </button>

              <div className="flex items-center gap-3">{renderButtonSolWallet()}</div>
            </div>
          </div>

          <div className="flex">
            {routes.map((route) => (
              <NavLink key={route.to} to={route.to}>
                {({ isActive }) => (
                  <div className="h-[56px] w-[228px]">
                    <div className="bg-border h-full overflow-hidden rounded-t-3xl p-[3px]">
                      <div
                        className={`${isActive ? "bg-link-header-active" : "bg-link-header"} header-navlink flex h-full w-full items-center justify-center rounded-t-3xl`}
                      >
                        <Text className="font-neueMachinaBold text-lg">{route.label}</Text>
                      </div>
                    </div>
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </Container>
      </header>
    </>
  )
}

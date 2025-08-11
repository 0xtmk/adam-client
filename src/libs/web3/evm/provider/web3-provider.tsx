import { darkTheme, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { FC, ReactNode } from "react"
import { Chain } from "viem"
import { WagmiProvider } from "wagmi"
import { useShallow } from "zustand/react/shallow"

import { queryClient } from "@/configs/react-query.config"
import { useAppSettingsStore } from "@/hooks/stores/use-app-settings-store"
import { web3Config } from "../configs/web3.config"
import { useWeb3Store } from "../hooks/stores/use-web3-store"
import { Web3Hooks } from "../ui/web3-hooks"
import { Web3Modals } from "../ui/web3-modals"

interface Web3ProviderProps {
  children?: ReactNode
}

export const Web3Provider: FC<Web3ProviderProps> = ({ children }) => {
  const { supportedChains, chain } = useWeb3Store(
    useShallow((state) => ({
      supportedChains: state.supportedChains,
      chain: state.chain,
    })),
  )
  // console.log("🚀 ~ chain:", chain)

  const { theme } = useAppSettingsStore(useShallow((state) => ({ theme: state.theme })))

  // const transports = supportedChains.reduce<{ [key: number]: HttpTransport }>((prev, cur) => {
  //   prev[cur.id] = http()

  //   return prev
  // }, {})

  // const wagmiConfig = createConfig({
  //   chains: supportedChains as [Chain, ...Chain[]],
  //   transports,
  //   connectors: [walletConnect({ projectId: web3Config.walletConnectProjectId })],
  // })

  const config = getDefaultConfig({
    appName: web3Config.appName,
    appDescription: web3Config.appDescription,
    projectId: web3Config.walletConnectProjectId,
    chains: supportedChains as [Chain, ...Chain[]],
    //
    // wallets: [
    //   {
    //     groupName: "Recommend",
    //     wallets: [metaMaskWallet, okxWallet, coin98Wallet, bitgetWallet, , phantomWallet, rabbyWallet, omniWallet],
    //   },
    // ],
    // multiInjectedProviderDiscovery: false,
  })

  return (
    <WagmiProvider config={config} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          // key={chain?.id}
          theme={
            theme === "dark"
              ? {
                  ...darkTheme(),
                }
              : undefined
          }
          showRecentTransactions
          initialChain={chain}
        >
          {children}
          <Web3Modals />
          <Web3Hooks />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { BitgetWalletAdapter, PhantomWalletAdapter, SafePalWalletAdapter } from "@solana/wallet-adapter-wallets"
import { FC, ReactNode, useMemo } from "react"

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css"
import { useSolanaStore } from "../hooks/use-solana-store"
import { SolanaHooks } from "../ui/solana-hooks"

interface SolanaProviderProps {
  children?: ReactNode
}

export const SolanaProvider: FC<SolanaProviderProps> = ({ children }) => {
  const { chain } = useSolanaStore()

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new BitgetWalletAdapter(), new SafePalWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chain?.rpcUrl],
  )

  return (
    <ConnectionProvider endpoint={chain.rpcUrl}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}

          <SolanaHooks />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

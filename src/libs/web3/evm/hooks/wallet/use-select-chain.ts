import { useSearchParams } from "react-router-dom"
import { Chain } from "viem"
import { useAccount, useSwitchChain } from "wagmi"
import { useShallow } from "zustand/react/shallow"
import { useWeb3Store } from "../stores/use-web3-store"

export const useSelectChain = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { isSwitchingChain, setChain, setIsSwitchingChain } = useWeb3Store(
    useShallow((state) => ({
      isSwitchingChain: state.isSwitchingChain,
      chain: state.chain,
      setChain: state.setChain,
      setIsSwitchingChain: state.setIsSwitchingChain,
    })),
  )

  const { isConnected } = useAccount()

  const { switchChainAsync } = useSwitchChain()

  const handleSelectChain = async (chain: Chain) => {
    try {
      setIsSwitchingChain(true)

      if (isConnected) {
        const switchedChain = await switchChainAsync({ chainId: chain.id })

        setChain(switchedChain)
      } else {
        setChain(chain)
      }
      searchParams.set("chain_id", chain.id.toString())
      setSearchParams(searchParams)
    } catch (error: any) {
      console.log("🚀 ~ handleSelectChain ~ error:", error, error?.code)

      if (error?.code === 4902) {
        console.log("🚀 ~ handleSelectChain ~ error:", error?.message)
      } else {
        localStorage.clear()
        window.location.reload()
      }
    } finally {
      setIsSwitchingChain(false)
    }
  }

  return { isSwitchingChain, selectChain: handleSelectChain }
}

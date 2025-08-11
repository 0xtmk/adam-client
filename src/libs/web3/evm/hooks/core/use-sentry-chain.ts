import { useSearchParams } from "react-router-dom"
import useSWR from "swr"
import { useAccount } from "wagmi"
import { useShallow } from "zustand/react/shallow"
import { useWeb3ModalStore } from "../stores/use-web3-modal-store"
import { useWeb3Store } from "../stores/use-web3-store"

export const useSentryChain = () => {
  const { chain, isConnected, isConnecting } = useAccount()
  const { chain: chainStore, supportedChains, isSwitchingChain, setChain, setIsWrongChain } = useWeb3Store()

  const { setIsOpenModalCheckChain } = useWeb3ModalStore(
    useShallow((state) => ({ setIsOpenModalCheckChain: state.setIsOpenModalCheckChain })),
  )

  const [searchParams, setSearchParams] = useSearchParams()
  const chainIdParam = searchParams.get("chain_id")

  useSWR(
    ["sentry-chain", chain, chainIdParam, chainStore, isConnecting],
    async () => {
      if (isConnecting) return

      if (isConnected) {
        const matchedChain = supportedChains.find((spChain) => spChain.id === Number(chainIdParam))

        if (!chain || (matchedChain?.id !== undefined && chainStore.id !== matchedChain.id)) {
          setIsOpenModalCheckChain(true)
          setIsWrongChain(true)
        } else if (chain.id !== chainStore.id) {
          searchParams.set("chain_id", chain.id.toString())
          setSearchParams(searchParams)
          setChain(chain)
          setIsWrongChain(false)
          setIsOpenModalCheckChain(false)
        }
      } else {
        const matchedChain = supportedChains.find((spChain) => spChain.id === Number(chainIdParam))

        if (matchedChain) {
          searchParams.set("chain_id", matchedChain.id.toString())
          setSearchParams(searchParams)
          setChain(matchedChain)
          setIsWrongChain(false)
          setIsOpenModalCheckChain(false)
        }
      }
    },
    {
      dedupingInterval: 0,
    },
  )

  return null
}

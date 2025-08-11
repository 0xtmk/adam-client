import { Button } from "@/libs/ui/button"
import { Modal } from "@/libs/ui/modal"
import { WarningFilled } from "@ant-design/icons"
import { FC, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useWeb3ModalStore } from "../hooks/stores/use-web3-modal-store"
import { useWeb3Store } from "../hooks/stores/use-web3-store"
import { useActive } from "../hooks/wallet/use-active"
import { useSelectChain } from "../hooks/wallet/use-select-chain"

interface RequiredChainModalProps {}

export const RequiredChainModal: FC<RequiredChainModalProps> = () => {
  const { disconnectWallet } = useActive()

  const { isOpenModalCheckChain, setIsOpenModalCheckChain } = useWeb3ModalStore()

  const [isSwitchingChain, setIsSwitchingChain] = useState(false)

  const { supportedChains, chain: chainStore, defaultChain } = useWeb3Store()

  const [searchParams] = useSearchParams()

  const chainIdParam = Number(searchParams.get("chain_id"))

  const selectedChainInParam = useMemo(
    () => supportedChains.find((spChain) => spChain.id === chainIdParam),
    [chainIdParam, supportedChains],
  )

  const requiredChain = selectedChainInParam || defaultChain

  const { selectChain } = useSelectChain()

  return (
    <Modal
      open={isOpenModalCheckChain}
      onCancel={() => setIsOpenModalCheckChain(false)}
      className="rounded-lg"
      width={400}
      closable={false}
      maskClosable={false}
    >
      <div className="">
        <div className="my-4 flex flex-col items-center justify-center gap-4 text-center">
          <WarningFilled className="text-warning-500 animate-pulse text-6xl" />
          <div className="space-y-2">
            <p className="text-warning text-lg font-medium">You are in wrong network</p>
            <p className="text-gray-300">This page is located for {requiredChain?.name}.</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-3">
          <Button
            className="flex-1"
            type="primary"
            async
            onClick={async () => {
              try {
                setIsSwitchingChain(true)

                await selectChain(requiredChain)

                setIsOpenModalCheckChain(false)
              } catch (error: any) {
                console.log("🚀 ~ onClick={ ~ error:", error)
                toast.error(error?.message)
              }
            }}
          >
            Switch network
          </Button>
          <Button
            className="flex-1"
            type="dashed"
            onClick={() => {
              disconnectWallet()
              setIsOpenModalCheckChain(false)
            }}
          >
            Disconnect
          </Button>
        </div>
      </div>
    </Modal>
  )
}

import { popError, popPending, popPendingConfirm, popSuccess, popWeb3Errors } from "@/utils/pop"
import useSWR from "swr"
import { Address, BaseError, erc721Abi } from "viem"
import { useWagmiClient } from "../core/use-wagmi-client"

export const useNftsAllowance = ({
  nftAddress,
  spenderAddress,
}: { nftAddress?: Address; spenderAddress?: Address } = {}) => {
  const { publicClient, account, walletClient } = useWagmiClient()

  const { data: allowanceNfts, mutate: refetchAllowanceNfts } = useSWR(
    ["check-allowance-nfts", publicClient, account, nftAddress, spenderAddress],
    async () => {
      if (!account || !publicClient || !nftAddress || !spenderAddress) return

      const response = await publicClient.readContract({
        abi: erc721Abi,
        address: nftAddress,
        functionName: "isApprovedForAll",
        args: [account, spenderAddress],
      })
      return response
    },
  )

  const handleApproveNfts = async () => {
    try {
      if (!walletClient || !publicClient || !nftAddress || !spenderAddress) return

      popPendingConfirm()

      const hash = await walletClient.writeContract({
        abi: erc721Abi,
        address: nftAddress,
        functionName: "setApprovalForAll",
        args: [spenderAddress, true],
      })

      popPending({ message: "Approve nfts is processing", hash })

      const { status } = await publicClient.waitForTransactionReceipt({
        hash,
      })
      if (status === "success") {
        popSuccess({ message: "Approve NFTs successfully", hash })
        refetchAllowanceNfts()
      } else {
        popError({ message: "Approve NFTs failed", hash })
      }
    } catch (error) {
      popWeb3Errors(error as BaseError, "Approve NFTs failed")
    }
  }

  return {
    allowanceNfts,
    refetchAllowanceNfts,
    approveNfts: handleApproveNfts,
  }
}

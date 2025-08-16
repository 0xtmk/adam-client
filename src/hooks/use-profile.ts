import { useSolana } from "@/libs/web3/solana/hooks/use-solana"
import { useSolanaContracts } from "@/libs/web3/solana/hooks/use-solana-contracts"
import { useSolanaWallet } from "@/libs/web3/solana/hooks/use-solana-wallet"
import { adamIdl } from "@/libs/web3/solana/idls/adam-idl"
import { Service } from "@/services/app.service"
import { getErrorMessage } from "@/utils/common"
import { toastContent } from "@/utils/toast"
import * as anchor from "@coral-xyz/anchor"
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { useAnchorWallet } from "@solana/wallet-adapter-react"
import { ComputeBudgetProgram, PublicKey } from "@solana/web3.js"
import BN from "bn.js"
import { ethers } from "ethers"
import { useState } from "react"

const useProfile = () => {
  const [isClaiming, setIsClaiming] = useState(false)

  const wallet = useSolanaWallet()

  const anchorWallet = useAnchorWallet()

  const { solana } = useSolana()

  const { WALLET_SIGNATURE, USDC } = useSolanaContracts()

  const handleClaim = async () => {
    try {
      if (!anchorWallet || !wallet?.publicKey || !wallet?.signTransaction) {
        return
      }
      setIsClaiming(true)

      const response = await Service.common.withdrawal()
      if (!response) return
      const provider = new anchor.AnchorProvider(solana.connection, anchorWallet, {
        commitment: "finalized",
        preflightCommitment: "finalized",
        skipPreflight: false,
      })

      anchor.setProvider(provider)

      const program = new anchor.Program(adamIdl, provider)

      const user = {
        claim_id: response?.withdrawal?.id,
        user_id: response?.withdrawal?.user_id,
        expireTime: response?.sign_data?.expireTime,
        amount: response?.sign_data?.amount,
      }

      const full_sig = response.sign_data.signature

      const full_sig_bytes = ethers.utils.arrayify(full_sig)
      const signature = full_sig_bytes.slice(0, 64)
      const recoveryId = full_sig_bytes[64] - 27

      const msg_digest = ethers.utils.arrayify(
        ethers.utils.solidityKeccak256(
          ["string", "uint64", "uint64", "uint64", "string"],
          [wallet.publicKey.toString(), user.claim_id, user.user_id, user.expireTime, user.amount],
        ),
      )

      const actual_message = Buffer.concat([Buffer.from("\x19Ethereum Signed Message:\n32"), msg_digest])
      const eth_address = WALLET_SIGNATURE

      const USDC_ADDRESS = new PublicKey(USDC)
      console.log("wallet", { wallet, user })

      const [userClaimInfo] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("user_claim"), new BN(user.claim_id).toArrayLike(Buffer, "le", 8), wallet.publicKey.toBuffer()],
        program.programId,
      )

      const [vault] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("vault_usdc"), USDC_ADDRESS.toBuffer()],
        program.programId,
      )
      const vaultTokenAccount = await getAssociatedTokenAddress(USDC_ADDRESS, vault, true)

      const userTokenAccount = await getAssociatedTokenAddress(USDC_ADDRESS, wallet.publicKey)

      const transaction = new anchor.web3.Transaction()
        .add(
          // Secp256k1 instruction
          anchor.web3.Secp256k1Program.createInstructionWithEthAddress({
            ethAddress: eth_address,
            message: actual_message,
            signature: signature,
            recoveryId: recoveryId,
          }),
        )

        .add(
          ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: 1,
          }),
          await program.methods
            .claimUsdc(
              new BN(user.claim_id),
              new BN(user.user_id),
              new BN(user.expireTime),
              Array.from(Buffer.from(signature)),
              recoveryId,
              user.amount,
            )
            .accounts({
              user: wallet.publicKey,
              userClaimInfo: userClaimInfo,
              tokenMint: USDC_ADDRESS,
              vault: vault,
              vaultTokenAccount: vaultTokenAccount,
              userTokenAccount: userTokenAccount,
              ixSysvar: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
              tokenProgram: TOKEN_PROGRAM_ID,
              associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
              systemProgram: anchor.web3.SystemProgram.programId,
            })
            .instruction(),
        )

      transaction.feePayer = wallet.publicKey
      transaction.recentBlockhash = (await solana.connection.getLatestBlockhash()).blockhash
      const hash = await wallet.sendTransaction(transaction, solana.connection)
      const receipt = await solana.waitForTransactionReceipt({
        hash,
      })
      if (receipt?.value?.err) {
        toastContent({
          type: "error",
          message: "Claim token failed",
          hash,
        })
      } else {
        toastContent({
          type: "success",
          message: "Claim token successfully",
          hash,
        })
      }
    } catch (error: any) {
      console.log("error", error)
      toastContent({
        type: "error",
        message: getErrorMessage(error),
      })
    } finally {
      setIsClaiming(false)
    }
  }

  return {
    handleClaim,
    isClaiming,
  }
}

export default useProfile

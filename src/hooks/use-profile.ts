import { useSolanaWallet } from "@/libs/web3/solana/hooks/use-solana-wallet"
import { Service } from "@/services/app.service"
import * as anchor from "@coral-xyz/anchor"
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { useWallet } from "@solana/wallet-adapter-react"
import { Connection, PublicKey, SystemProgram, SYSVAR_INSTRUCTIONS_PUBKEY, Transaction } from "@solana/web3.js"
import BN from "bn.js"
import { ethers } from "ethers"

const useProfile = () => {
  const { address } = useSolanaWallet()
  const { publicKey, signTransaction, sendTransaction } = useWallet()
  const connection = new Connection("https://api.devnet.solana.com")

  // const handleClaim = async () => {
  //   try {
  //     if (!publicKey || !signTransaction) {
  //       throw new Error("Wallet not connected")
  //     }
  //     const response = await Service.common.withdrawal()
  //     console.log("response", response)
  //     if (!response) return
  //     const sign_data = response?.sign_data

  //     const full_sig_bytes = ethers.utils.arrayify(sign_data.signature)
  //     const signature = full_sig_bytes.slice(0, 64)
  //     const recoveryId = full_sig_bytes[64] - 27

  //     const msg_digest = ethers.utils.arrayify(
  //       ethers.utils.solidityKeccak256(
  //         ["string", "uint64", "uint64", "uint64", "string"],
  //         [sign_data.user_address, sign_data.claim_id, sign_data.user_id, sign_data.expireTime, sign_data.amount],
  //       ),
  //     )
  //     const actual_message = Buffer.concat([Buffer.from("\x19Ethereum Signed Message:\n32"), msg_digest])
  //     const USDC_ADDRESS = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr")

  //     // Anchor program
  //     const idl = await fetch("/idl/adam.json").then((res) => res.json())
  //     const programId = new PublicKey("YOUR_PROGRAM_ID") // <-- Thay bằng programId thực tế
  //     const wallet = {
  //       publicKey,
  //       signTransaction,
  //       sendTransaction,
  //     }
  //     const provider = new anchor.AnchorProvider(connection, wallet as any, {})
  //     const program = new anchor.Program(idl, programId, provider)

  //     const [userClaimInfo] = anchor.web3.PublicKey.findProgramAddressSync(
  //       [Buffer.from("user_claim"), new BN(sign_data.claim_id).toBuffer("le", 8), publicKey.toBuffer()],
  //       program.programId,
  //     )
  //     const [vault] = anchor.web3.PublicKey.findProgramAddressSync(
  //       [Buffer.from("vault_usdc"), USDC_ADDRESS.toBuffer()],
  //       program.programId,
  //     )
  //     const vaultTokenAccount = await getAssociatedTokenAddress(USDC_ADDRESS, vault, true)
  //     const userTokenAccount = await getAssociatedTokenAddress(USDC_ADDRESS, publicKey)

  //     let transaction = new Transaction()
  //       .add(
  //         anchor.web3.Secp256k1Program.createInstructionWithEthAddress({
  //           ethAddress: sign_data.user_address,
  //           message: actual_message,
  //           signature: signature,
  //           recoveryId: recoveryId,
  //         }),
  //       )
  //       .add(
  //         await program.methods
  //           .claimUsdc(
  //             new BN(sign_data.claim_id),
  //             new BN(sign_data.user_id),
  //             new BN(sign_data.expireTime),
  //             Array.from(Buffer.from(signature)),
  //             recoveryId,
  //             sign_data.amount,
  //           )
  //           .accounts({
  //             user: publicKey,
  //             userClaimInfo: userClaimInfo,
  //             tokenMint: USDC_ADDRESS,
  //             vault: vault,
  //             vaultTokenAccount: vaultTokenAccount,
  //             userTokenAccount: userTokenAccount,
  //             ixSysvar: SYSVAR_INSTRUCTIONS_PUBKEY,
  //             tokenProgram: TOKEN_PROGRAM_ID,
  //             associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
  //             systemProgram: SystemProgram.programId,
  //           })
  //           .instruction(),
  //       )

  //     transaction.feePayer = publicKey
  //     transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

  //     // Gửi transaction cho Phantom ký và gửi
  //     const signed = await signTransaction(transaction)
  //     const txid = await connection.sendRawTransaction(signed.serialize(), {
  //       skipPreflight: false,
  //       preflightCommitment: "confirmed",
  //     })
  //     console.log(`Transaction: https://solscan.io/tx/${txid}?cluster=devnet`)
  //   } catch (error) {
  //     console.log("error", error)
  //   }
  // }

  return {
    // handleClaim,
  }
}

export default useProfile

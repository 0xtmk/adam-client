import { retry, sleep } from "@/utils/promise"
import { Connection, ConnectionConfig, ParsedAccountData, PublicKey } from "@solana/web3.js"
import { useSolanaStore } from "./hooks/use-solana-store"

export enum TxMessage {
  PROVIDER_ERROR = "provider undefined",
  SUCCESS = "transaction successful",
  EXPIRED_ERROR = "transaction expired",
  TIMEOUT_ERROR = "time out for transaction",
}
export class Solana {
  public connection: Connection
  readonly RPC_URL: string
  constructor(
    { rpcUrl, ...commitmentOrConfig }: ConnectionConfig & { rpcUrl?: string } = {
      commitment: "finalized",
    },
  ) {
    this.RPC_URL = rpcUrl || useSolanaStore.getState().chain.rpcUrl
    this.connection = new Connection(rpcUrl || this.RPC_URL, commitmentOrConfig)
  }

  async waitForTransactionReceipt({ hash, retries = 30 }: { hash?: string; retries?: number } = {}) {
    if (!hash) return

    const retriedReceipt = await retry(
      async () => {
        const receipt = await this.connection.getSignatureStatus(hash, {
          searchTransactionHistory: true,
        })

        if (!receipt || receipt?.value === null) {
          throw new Error("RPC has error: Get tx failed")
        }

        return receipt
      },
      {
        retries,
        delay: 2800,
      },
    )

    return retriedReceipt
  }

  async isBlockhashExpired(initialBlockHeight: any) {
    const currentBlockHeight = await this.connection.getBlockHeight()
    console.log(currentBlockHeight)
    return currentBlockHeight > initialBlockHeight
  }

  async checkSignatureStatus(tx: string) {
    let message: TxMessage = TxMessage.SUCCESS
    const statusCheckInterval = 300
    const timeout = 60000
    let isBlockhashValid = true
    const inititalBlock = (await this.connection.getSignatureStatus(tx)).context.slot

    console.log("initial block: ", inititalBlock)

    let done = false
    setTimeout(() => {
      if (done) {
        return
      }
      done = true
      message = TxMessage.TIMEOUT_ERROR
      console.log("Timed out for txid", tx)
      console.log(`${isBlockhashValid ? "Blockhash not yet expired." : "Blockhash has expired."}`)
    }, timeout)

    while (!done && isBlockhashValid) {
      const confirmation = await this.connection.getSignatureStatus(tx)
      console.log("confirmation: ", confirmation.context.slot)
      if (
        confirmation.value &&
        (confirmation.value.confirmationStatus === "confirmed" || confirmation.value.confirmationStatus === "finalized")
      ) {
        console.log(`Confirmation Status: ${confirmation.value.confirmationStatus}, ${tx}`)
        done = true
        message = TxMessage.SUCCESS
        //Run any additional code you'd like with your txId (e.g. notify user of succesful transaction)
      } else {
        console.log(`Confirmation Status: ${confirmation.value?.confirmationStatus || "not yet found."}`)
      }
      const blockHashExpired = await this.isBlockhashExpired(inititalBlock)
      if (blockHashExpired) message = TxMessage.EXPIRED_ERROR
      isBlockhashValid = !blockHashExpired
      await sleep(statusCheckInterval)
    }

    return message
  }

  //   async sendSolanaToken({ wallet, to, value }: { wallet: NodeWallet; to: string; value: number }) {
  //     if (!wallet || !to) return

  //     const transaction = new Transaction().add(
  //       SystemProgram.transfer({
  //         fromPubkey: wallet.publicKey,
  //         toPubkey: new PublicKey(to),
  //         lamports: LAMPORTS_PER_SOL * value,
  //       }),
  //     )

  //     const hash = await sendAndConfirmTransaction(this.connection, transaction, [wallet.payer])

  //     return hash
  //   }

  //   async sendSPLToken({ wallet, token, to, value }: { wallet: NodeWallet; token: string; to: string; value: number }) {
  //     const sourceAccount = await getOrCreateAssociatedTokenAccount(
  //       this.connection,
  //       wallet.payer,
  //       new PublicKey(token),
  //       wallet.publicKey,
  //     )

  //     const destinationAccount = await getOrCreateAssociatedTokenAccount(
  //       this.connection,
  //       wallet.payer,
  //       new PublicKey(token),
  //       new PublicKey(to),
  //     )

  //     const numberDecimals = await this.getNumberDecimals(token)

  //     const tx = new Transaction().add(
  //       createTransferInstruction(
  //         sourceAccount.address,
  //         destinationAccount.address,
  //         wallet.publicKey,
  //         value * Math.pow(10, numberDecimals),
  //       ),
  //     )

  //     const hash = await sendAndConfirmTransaction(this.connection, tx, [wallet.payer])

  //     return hash
  //   }

  async getNumberDecimals(mintAddress: string): Promise<number> {
    const info = await this.connection.getParsedAccountInfo(new PublicKey(mintAddress))
    const result = (info.value?.data as ParsedAccountData).parsed.info.decimals as number
    return result
  }

  getTxUrl(hash: string) {
    const blockExplorer = useSolanaStore.getState().chain.blockExplorer

    return `${blockExplorer.url}/tx/${hash}${blockExplorer?.param || ""}`
  }

  isInsufficientBalanceError(error: any) {
    return error?.message?.includes("insufficient")
  }

  compactError(error: any) {
    console.log("🚀 ~ Solana ~ compactError ~ error:", error)
    if (error?.message?.includes("insufficient")) {
      return new Error("Insufficient SOL Balance")
    }

    return error
  }
}

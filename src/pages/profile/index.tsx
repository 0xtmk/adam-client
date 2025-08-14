import { Container } from "@/components/layouts/container"
import { HOST } from "@/configs/host.config"
import { useUserStore } from "@/hooks/stores/use-user-store"
import useProfile from "@/hooks/use-profile"
import useUserInfo from "@/hooks/use-user-info"
import { Button } from "@/libs/ui/button"
import { Text } from "@/libs/ui/text"
import { useSolanaWallet } from "@/libs/web3/solana/hooks/use-solana-wallet"
import { cn } from "@/utils/classnames"
import { truncateAddress, truncateString } from "@/utils/string"
import { toastContent } from "@/utils/toast"
import copy from "copy-to-clipboard"
import { FC } from "react"
interface ProfilePageProps {}

export const ProfilePage: FC<ProfilePageProps> = () => {
  const { userInfo } = useUserStore()
  const { address } = useSolanaWallet()
  const { userBalance } = useUserInfo()
  // const { handleClaim } = useProfile()

  return (
    <Container className="space-y-6">
      <div
        className={cn("card-profile flex items-center justify-between px-14 py-16", !userInfo?.twitter_id && "hidden")}
      >
        <div className="flex items-center gap-4">
          <img src={userInfo?.avatar} className="h-32 w-32 rounded-full" alt="" />
          <div>
            <Text className="font-neueMachinaBold text-2xl">{userInfo?.twitter_full_name}</Text>
            <div className="flex items-center gap-4">
              <Text>@{userInfo?.twitter_username}</Text>
              <Button
                onClick={() => {
                  copy(address || "")
                  toastContent({
                    type: "success",
                    message: "Copied to clipboard",
                  })
                }}
                className="card-info relative flex h-8 items-center gap-4 overflow-hidden px-3"
              >
                <span className="absolute inset-0 bg-[linear-gradient(180deg,#000_0%,#000_100%)] opacity-40"></span>
                <Text className="relative z-10 !text-white">{truncateAddress(address)}</Text>
                <img src="/icons/copy.png" className="h-5 w-5" alt="" />
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div
            className="flex min-w-[700px] items-center justify-between
          gap-2
          rounded-xl
          border border-[#0085FE] bg-[linear-gradient(180deg,#0000%,#000_100%,0.4)] px-6 py-6 shadow-[0_7.519px_7.519px_0_rgba(255,255,255,0.25)_inset,0_7.519px_7.519px_0_rgba(0,0,0,0.25)]
          "
          >
            <Text className="font-neueMachinaBold relative text-2xl ">Invite</Text>
            <div className="flex items-center gap-2">
              <Text className="font-neueMachinaBold text-2xl">{userBalance?.total_invite || 0}</Text>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path
                  d="M12.5996 12.1748C15.361 12.1748 17.5996 9.93623 17.5996 7.1748C17.5996 4.41338 15.361 2.1748 12.5996 2.1748C9.83819 2.1748 7.59961 4.41338 7.59961 7.1748C7.59961 9.93623 9.83819 12.1748 12.5996 12.1748Z"
                  fill="white"
                />
                <path
                  d="M12.5998 14.6748C7.58977 14.6748 3.50977 18.0348 3.50977 22.1748C3.50977 22.4548 3.72977 22.6748 4.00977 22.6748H21.1898C21.4698 22.6748 21.6898 22.4548 21.6898 22.1748C21.6898 18.0348 17.6098 14.6748 12.5998 14.6748Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div
            className="flex min-w-[700px] items-center justify-between
          gap-2
          rounded-xl
          border border-[#0085FE] bg-[linear-gradient(180deg,#0000%,#000_100%,0.4)] px-6 py-6 shadow-[0_7.519px_7.519px_0_rgba(255,255,255,0.25)_inset,0_7.519px_7.519px_0_rgba(0,0,0,0.25)]"
          >
            <Text className="font-neueMachinaBold text-xl">
              {truncateString(HOST)}?ref_code={userInfo?.referral_code}
            </Text>
            <Button
              onClick={() => {
                copy(`${HOST}?ref_code=${userInfo?.referral_code}`)
                toastContent({
                  type: "success",
                  message: "Copied to clipboard",
                })
              }}
              className="relative h-7 w-32 rounded border border-[#0085FE] shadow-[0_1.561px_1.561px_0_rgba(255,255,255,0.25)_inset,0_1.561px_1.561px_0_rgba(0,0,0,0.25)] active:scale-95"
            >
              <span className="absolute inset-0 rounded bg-[linear-gradient(180deg,#047CD3_0%,#73C4FF_100%)] opacity-40"></span>
              <span className="relative z-10 !text-white">Copy Link</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="card-profile relative px-14 py-20">
        <div className="absolute bottom-0 right-28">
          <img src="/images/adam.png" alt="" />
        </div>
        <div className="flex items-center gap-40">
          <div className="space-y-6">
            <Text className="font-neueMachinaBold text-2xl">Total USDC</Text>
            <div className="flex items-start gap-3">
              <Text className="font-neueMachinaBold text-4xl">{userBalance?.usd || 0}</Text>
              <Text className="font-neueMachinaBold">USDC</Text>
            </div>
          </div>

          <div className="space-y-6">
            <Text className="font-neueMachinaBold text-2xl">Total Rewards</Text>
            <div className="flex items-start gap-3">
              <Text className="font-neueMachinaBold text-4xl">{userBalance?.point || 0}</Text>
              <Text className="font-neueMachinaBold">Points</Text>
            </div>
          </div>
        </div>
        <Button
          // onClick={handleClaim}
          className="mt-16 h-12 w-44 rounded-xl border border-[#0085FE] !bg-[linear-gradient(180deg,#000_0%,#000_100%)] !text-white shadow-[0_7.519px_7.519px_0_rgba(255,255,255,0.25)_inset,0_7.519px_7.519px_0_rgba(0,0,0,0.25)]"
        >
          Claim USDC
        </Button>
      </div>
    </Container>
  )
}

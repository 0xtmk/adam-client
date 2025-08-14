import { Container } from "@/components/layouts/container"
import { useUserStore } from "@/hooks/stores/use-user-store"
import { Text } from "@/libs/ui/text"
import { useSolanaWallet } from "@/libs/web3/solana/hooks/use-solana-wallet"
import { cn } from "@/utils/classnames"
import { truncateAddress } from "@/utils/string"
import { FC } from "react"

interface ProfilePageProps {}

export const ProfilePage: FC<ProfilePageProps> = () => {
  const { userInfo } = useUserStore()
  const { address } = useSolanaWallet()
  return (
    <Container>
      <div
        className={cn("card-profile flex items-center justify-between px-14 py-16", !userInfo?.twitter_id && "hidden")}
      >
        <div className="flex items-center gap-4">
          <img src={userInfo?.avatar} className="h-32 w-32 rounded-full" alt="" />
          <div>
            <Text className="font-neueMachinaBold text-2xl">{userInfo?.twitter_full_name}</Text>
            <div className="flex items-center gap-4">
              <Text>@{userInfo?.twitter_username}</Text>
              <button className="card-info flex h-8 items-center gap-4 px-3">
                <Text className="!text-white">{truncateAddress(address)}</Text>
                <img src="/icons/copy.png" className="h-5 w-5" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="card-info !rounded-2xl flex min-w-[283px] flex-col gap-14 px-12 py-7">
            <Text className="font-neueMachinaBold text-2xl relative ">Invite</Text>
            <div className="flex items-center gap-2">
              <Text className="font-neueMachinaBold text-2xl">0</Text>
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
        </div>
      </div>
    </Container>
  )
}

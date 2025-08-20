import { Container } from "@/components/layouts/container"
import { HOST } from "@/configs/host.config"
import { WithdrawalStatus } from "@/constants/app"
import { useUserStore } from "@/hooks/stores/use-user-store"
import useProfile from "@/hooks/use-profile"
import useUserBalances from "@/hooks/use-user-balance"
import { Loading } from "@/libs/ui/loading"
import { Text } from "@/libs/ui/text"
import { useSolanaWallet } from "@/libs/web3/solana/hooks/use-solana-wallet"
import { routePath } from "@/routes/routes"
import { Service } from "@/services/app.service"
import { cn } from "@/utils/classnames"
import { formatNumber } from "@/utils/number"
import { truncateAddress } from "@/utils/string"
import { toastContent } from "@/utils/toast"
import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import copy from "copy-to-clipboard"
import moment from "moment"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useSWR from "swr"
import { ModalClaimUsdc } from "../components/modal-claim-usdc"
import { ModalInviteList } from "../components/modal-invite-list"
import PrimaryButton from "../components/primary-btn"

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = () => {
  const { userInfo, refreshUserInfo, token } = useUserStore()
  const { address } = useSolanaWallet()
  const { userBalance } = useUserBalances()
  const [openClaim, setOpenClaim] = useState<number | undefined>(undefined)
  const [openInviteList, setOpenInviteList] = useState<boolean>(false)

  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate(routePath.home)
    }
  }, [token])

  const { handleClaim, isClaiming } = useProfile()

  const { data: withdrawalList, isLoading: isLoadingWithdrawalList } = useSWR(
    ["get-withdrawal-list", token],
    async () => {
      const response = await Service.common.withdrawalList()
      return response.data
    },
    { refreshInterval: 10000 },
  )
  const { data: referralList, isLoading: isLoadingReferralList } = useSWR(["get-ref-list", token], async () => {
    const response = await Service.user.listReferrals()
    return response
  })

  const handleConnectX = async () => {
    try {
      const res = await Service.common.getTwitterUrl()
      if (res) {
        window.open(res, "_self")
      }
    } catch (error) {
      console.error("Error connecting:", error)
    }
  }

  const twitterNode = () => {
    if (!userInfo?.twitter_id) {
      return (
        <div className="flex items-center gap-5 max-lg:gap-3">
          <img src="/images/default-avatar.png" className="max-lg:h-14 max-lg:w-14" alt="" />
          <div className="space-y-3 max-lg:space-y-1">
            <div className="flex items-center gap-3 max-lg:gap-1">
              <Text className="font-neueMachinaBold text-[28px] leading-[32px] max-lg:text-lg">
                {truncateAddress(address)}
              </Text>
              <div
                className="cursor-pointer hover:scale-105 active:scale-95"
                onClick={() => {
                  copy(address || "")
                  toastContent({
                    type: "success",
                    message: "Address copied to clipboard",
                  })
                }}
              >
                <CopyIcon className="max-lg:h-4 max-lg:w-4" />
              </div>
            </div>
            <PrimaryButton onClick={handleConnectX} childClassName="w-[129px] max-lg:w-[100px]">
              <div className="flex items-center gap-2 max-lg:gap-1">
                <Text className="font-neueMachinaBold text-white">Connect</Text>
                <TwitterIcon className="max-lg:h-4 max-lg:w-4" />
              </div>
            </PrimaryButton>
          </div>
        </div>
      )
    }
    return (
      <div className="flex items-center gap-5 max-lg:gap-3">
        <img src={userInfo?.avatar} className="h-[100px] w-[100px] rounded-full max-lg:h-14 max-lg:w-14" alt="" />
        <div className="space-y-3 max-lg:space-y-1">
          <div className="flex items-center gap-3 max-lg:gap-1">
            <Text className="font-neueMachinaBold text-[28px] leading-[32px] max-lg:text-lg">
              {truncateAddress(address)}
            </Text>
            <div
              className="cursor-pointer hover:scale-105 active:scale-95"
              onClick={() => {
                copy(address || "")
                toastContent({
                  type: "success",
                  message: "Address copied to clipboard",
                })
              }}
            >
              <CopyIcon className="max-lg:h-4 max-lg:w-4" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M12.017 0.599609H1.98317C1.21934 0.599609 0.600098 1.21885 0.600098 1.98268V12.0165C0.600098 12.7804 1.21934 13.3996 1.98317 13.3996H12.017C12.7809 13.3996 13.4001 12.7804 13.4001 12.0165V1.98268C13.4001 1.21885 12.7809 0.599609 12.017 0.599609ZM8.76435 11.4543L6.38576 7.99252L3.40775 11.4543H2.63808L6.04401 7.49534L2.63808 2.53839H5.23585L7.48821 5.81642L10.3082 2.53839H11.0778L7.83006 6.31371H7.82985L11.3621 11.4543H8.76435Z"
                fill="white"
                fillOpacity="0.8"
              />
            </svg>

            <Text className="text-[rgba(255,255,255,0.80)] max-lg:text-xs">@{userInfo?.twitter_username}</Text>
            <img
              onClick={async () => {
                const res = await Service.common.logoutTwitter()
                if (res) {
                  refreshUserInfo()
                }
              }}
              src="/images/disconnect.png"
              className="cursor-pointer hover:scale-105 active:scale-100"
              alt=""
            />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <img src="/images/bg-profile.png" className="absolute left-0 right-0 top-0" alt="" />

      <Container size="blessing" className="relative pt-10 max-lg:pt-4">
        <div className="rounded-[32px] bg-[radial-gradient(63.22%_110.29%_at_20.47%_4%,#116191_0%,#52B8FC_71.41%,#243358_100%)] p-[2px]">
          <div className="h-full w-full space-y-8 rounded-[32px] bg-[#111932] p-8 max-lg:space-y-4 max-lg:p-4">
            <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-2">
              {twitterNode()}
              <div className="space-y-3 max-md:w-full">
                <Text className="font-neueMachinaBold text-xl max-lg:text-sm">Earn 10 points for every invite</Text>
                <div className="bg-fill flex h-[52px] w-[436px] items-center  justify-between bg-[url('/images/border-share.png')] bg-no-repeat px-3 max-lg:h-12 max-sm:w-full">
                  <Text className="max-lg:text-sm">
                    {truncateAddress(`${HOST}?ref_code=${userInfo?.referral_code}`, 10)}
                  </Text>
                  <PrimaryButton
                    onClick={() => {
                      copy(`${HOST}?ref_code=${userInfo?.referral_code}`)
                      toastContent({
                        type: "success",
                        message: "Link copied to clipboard",
                      })
                    }}
                    childClassName="w-[114px] max-lg:w-20"
                  >
                    <Text className="font-neueMachinaBold">Copy link</Text>
                  </PrimaryButton>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5 max-lg:gap-2 max-md:grid-cols-1">
              <div className="space-y-5 rounded-[20px] bg-[#1B2547] p-4 max-lg:space-y-3">
                <div className="flex items-center gap-3 max-lg:gap-1">
                  <img src="/images/tokens/usdc.png" className="h-7 w-7 max-lg:h-5 max-lg:w-5" alt="" />
                  <Text className="font-neueMachinaBold text-xl max-lg:text-base">Your USDC</Text>
                </div>
                <div className="flex items-center gap-3">
                  <Text className="font-neueMachinaBold text-2xl max-lg:text-base">{userBalance?.usd || 0}</Text>
                  {userBalance?.usd > 0 && (
                    <PrimaryButton
                      onClick={async () => {
                        const res = await handleClaim()
                        res && setOpenClaim(userBalance?.usd)
                      }}
                      childClassName="w-[84px] h-9 flex item-center gap-2"
                    >
                      {isClaiming && <Spin indicator={<LoadingOutlined spin />} className="text-white" size="small" />}
                      <Text>Claim</Text>
                    </PrimaryButton>
                  )}
                </div>
              </div>

              <div className="space-y-5 rounded-[20px] bg-[#1B2547] p-4 max-lg:space-y-3">
                <div className="flex items-center gap-3 max-lg:gap-1">
                  <img src="/images/tokens/points.png" className="h-7 w-7 max-lg:h-5 max-lg:w-5" alt="" />
                  <Text className="font-neueMachinaBold text-xl max-lg:text-base">Your Points</Text>
                </div>
                <Text className="font-neueMachinaBold text-2xl max-lg:text-base">{userBalance?.point || 0}</Text>
              </div>

              <div className="space-y-5 rounded-[20px] bg-[#1B2547] p-4 max-lg:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 max-lg:gap-1">
                    <UserIcon className="max-lg:h-4 max-lg:w-4" />
                    <Text className="font-neueMachinaBold text-xl max-lg:text-base">Invited</Text>
                  </div>
                  <Text
                    onClick={() => setOpenInviteList(true)}
                    className="cursor-pointer text-[#40BFE5] hover:underline max-lg:text-xs"
                  >
                    View detail
                  </Text>
                </div>
                <Text className="font-neueMachinaBold text-2xl max-lg:text-base">{userBalance?.total_invite || 0}</Text>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 max-lg:mt-6 max-md:mt-4">
          <Text className="font-neueMachinaBold text-2xl max-lg:text-lg">Claim history</Text>
          {isLoadingWithdrawalList ? (
            <div className="mt-[105px] flex justify-center">
              <Loading className="h-10 w-10" />
            </div>
          ) : withdrawalList?.length > 0 ? (
            <div className="mt-6 rounded-[32px] bg-[linear-gradient(172deg,#456396_-27.86%,#000D1F_82.05%)] p-[2px] max-md:mt-4">
              <div className="modal-scroll-bar h-[536px] max-md:h-[400px] w-full overflow-y-auto rounded-[32px]">
                <div className="grid h-14 grid-cols-3 items-center rounded-t-[32px] bg-[#1B2547] max-md:h-10">
                  <Text className="font-neueMachinaBold text-center max-md:text-sm">Date</Text>
                  <Text className="font-neueMachinaBold text-center max-md:text-sm">Amount</Text>
                  <Text className="font-neueMachinaBold text-center max-md:text-sm">Status</Text>
                </div>

                <div className="">
                  {withdrawalList?.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={cn(
                          "grid h-[60px] grid-cols-3 items-center max-md:h-10",
                          index % 2 === 0 ? "bg-[#111932]" : "bg-[#1B2547]",
                        )}
                      >
                        <Text className="font-neueMachinaBold text-center max-md:text-sm">
                          {moment(item?.created_time).format("DD/MM/YYYY")}
                        </Text>
                        <div className="flex items-center justify-center gap-3 max-md:gap-1">
                          <img src="/images/tokens/usdc.png" className="h-5 w-5 max-md:h-4 max-md:w-4" alt="" />
                          <div className="flex items-center gap-1 max-md:text-sm">
                            <Text>{formatNumber(+item?.quantity)}</Text>
                            <Text>USDC</Text>
                          </div>
                        </div>
                        <div className="text-center max-md:text-sm">
                          {item?.status === WithdrawalStatus.DONE && (
                            <Text className="text-success-500 font-neueMachinaBold">Done</Text>
                          )}

                          {item?.status === WithdrawalStatus.FAILED && (
                            <Text className="text-error-500 font-neueMachinaBold">Failed</Text>
                          )}

                          {item?.status === WithdrawalStatus.REQUESTED && (
                            <Text className="text-warning-500 font-neueMachinaBold">Pending</Text>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto mt-[105px] max-w-[350px] space-y-3">
              <Text className="font-neueMachinaBold text-center text-xl">No claim history</Text>
              <Text className="font-neueMachinaBold text-[rgba(255,255,255,0.80)]">
                Complete the task to receive a reward.
              </Text>
            </div>
          )}
        </div>
      </Container>
      <ModalClaimUsdc open={Boolean(openClaim)} data={openClaim} onCancel={() => setOpenClaim(undefined)} />
      <ModalInviteList
        width={928}
        open={openInviteList}
        data={referralList?.data}
        isLoading={isLoadingReferralList}
        onCancel={() => setOpenInviteList(false)}
      />
    </div>
  )
}

export default ProfilePage

const CopyIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_10417_300)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.83325 2.49968C5.83325 1.57919 6.57945 0.833001 7.49993 0.833008L17.4999 0.833082C18.4204 0.833085 19.1666 1.57928 19.1666 2.49975V12.4997C19.1666 13.4202 18.4204 14.1663 17.4999 14.1663H16.6666C16.2063 14.1663 15.8333 13.7933 15.8333 13.333V7.08304C15.8333 5.47222 14.5274 4.16638 12.9166 4.16638H6.66659C6.20634 4.16638 5.83325 3.79329 5.83325 3.33304V2.49968ZM0.833252 7.49982C0.833252 6.57934 1.57944 5.83315 2.49992 5.83315L12.4999 5.83317C13.4204 5.83317 14.1666 6.57936 14.1666 7.49984V17.4998C14.1666 18.4203 13.4204 19.1664 12.4999 19.1664H2.49992C1.57944 19.1664 0.833252 18.4203 0.833252 17.4998V7.49982Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_10417_300">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

const TwitterIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_10417_305)">
        <path
          d="M10.6686 9.65845L15.1694 16.0961H13.3223L9.64957 10.843V10.8426L9.11037 10.0715L4.82007 3.93457H6.66718L10.1294 8.8873L10.6686 9.65845Z"
          fill="white"
        />
        <path
          d="M17.839 0H2.16104C0.967563 0 0 0.967563 0 2.16104V17.839C0 19.0324 0.967563 20 2.16104 20H17.839C19.0324 20 20 19.0324 20 17.839V2.16104C20 0.967563 19.0324 0 17.839 0ZM12.7566 16.9604L9.0401 11.5514L4.38696 16.9604H3.18435L8.50611 10.7746L3.18435 3.02934H7.24336L10.7627 8.15126L15.1689 3.02934H16.3715L11.2968 8.92828H11.2965L16.8156 16.9604H12.7566Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_10417_305">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

const UserIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5392 4.21182C9.72833 5.20185 8.50008 7.12432 8.50008 9.33366C8.50008 10.5168 8.8523 11.6176 9.45761 12.5371C7.13848 12.4279 5.29175 10.5131 5.29175 8.16699C5.29175 5.75074 7.2505 3.79199 9.66675 3.79199C10.3368 3.79199 10.9716 3.94261 11.5392 4.21182ZM10.279 14.292C7.22886 15.1804 5.00008 17.9967 5.00008 21.3336C5.00008 21.9403 5.12474 22.5178 5.34982 23.042H4.66675C3.07893 23.042 1.79175 21.7548 1.79175 20.167C1.79175 16.9224 4.42208 14.292 7.66674 14.292H10.279ZM14.3334 4.95866C11.9172 4.95866 9.95842 6.91741 9.95842 9.33366C9.95842 11.7499 11.9172 13.7087 14.3334 13.7087C16.7497 13.7087 18.7084 11.7499 18.7084 9.33366C18.7084 6.91741 16.7497 4.95866 14.3334 4.95866ZM12.3334 15.4587C9.08875 15.4587 6.45842 18.089 6.45842 21.3336C6.45842 22.9215 7.7456 24.2087 9.33342 24.2087H19.3334C20.9212 24.2087 22.2084 22.9215 22.2084 21.3336C22.2084 18.089 19.578 15.4587 16.3334 15.4587H12.3334ZM20.1667 9.33366C20.1667 10.5168 19.8145 11.6176 19.2093 12.5371C21.5284 12.4279 23.3751 10.5131 23.3751 8.16699C23.3751 5.75074 21.4164 3.79199 19.0001 3.79199C18.3301 3.79199 17.6953 3.94261 17.1276 4.21182C18.9385 5.20185 20.1667 7.12432 20.1667 9.33366ZM23.6667 21.3336C23.6667 21.9403 23.5421 22.5178 23.317 23.042H24.0001C25.5879 23.042 26.8751 21.7548 26.8751 20.167C26.8751 16.9224 24.2447 14.292 21.0001 14.292H18.3878C21.4379 15.1804 23.6667 17.9967 23.6667 21.3336Z"
        fill="white"
      />
    </svg>
  )
}

import { Container } from "@/components/layouts/container"
import { HOST } from "@/configs/host.config"
import { WithdrawalStatus } from "@/constants/app"
import { useUserStore } from "@/hooks/stores/use-user-store"
import useProfile from "@/hooks/use-profile"
import useUserInfo from "@/hooks/use-user-info"
import { Button } from "@/libs/ui/button"
import { Text } from "@/libs/ui/text"
import { useSolanaWallet } from "@/libs/web3/solana/hooks/use-solana-wallet"
import { routePath } from "@/routes/routes"
import { Service } from "@/services/app.service"
import { cn } from "@/utils/classnames"
import { formatNumber } from "@/utils/number"
import { truncateAddress } from "@/utils/string"
import { toastContent } from "@/utils/toast"
import { Empty, Modal } from "antd"
import copy from "copy-to-clipboard"
import moment from "moment"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useSWR from "swr"

interface ProfilePageProps {}

export const ProfilePage: FC<ProfilePageProps> = () => {
  const { userInfo, token } = useUserStore()
  const { address } = useSolanaWallet()
  const { userBalance } = useUserInfo()
  const { handleClaim, isClaiming } = useProfile()
  const navigate = useNavigate()
  const [openInviteList, setOpenInviteList] = useState(false)
  useEffect(() => {
    if (!token || !userInfo?.twitter_id) navigate(routePath.home)
  }, [token, userInfo?.twitter_id, navigate])

  const { data: withdrawalList } = useSWR(
    ["get-withdrawal-list", token],
    async () => {
      const response = await Service.common.withdrawalList()
      return response.data
    },
    { refreshInterval: 10000 },
  )

  const { data: referralList } = useSWR(["get-ref-list", token], async () => {
    const response = await Service.user.listReferrals()
    return response
  })

  return (
    <Container className="mb-6 space-y-4">
      <div
        className={cn(
          "flex items-center justify-between rounded-[38px] border border-black bg-[linear-gradient(182deg,rgba(17,55,103,0.20)_-16.39%,rgba(0,102,255,0.20)_71.93%)] bg-fixed px-6 py-10 shadow-[0_4px_4px_0_rgba(163,163,163,0.25)_inset,0_4px_6.5px_0_rgba(0,0,0,0.25)] backdrop-blur-[5px]",
          "max-retina:flex-col max-retina:gap-6",
          "max-sm:p-6",
        )}
      >
        <div className="flex items-center gap-4">
          <img
            src={userInfo?.avatar}
            className={cn(
              "h-32 w-32 rounded-full max-md:h-20 max-md:w-20 max-sm:h-12 max-sm:w-12",
              !userInfo?.twitter_id && "hidden",
            )}
            alt=""
          />
          <div>
            <Text className="font-neueMachinaBold text-2xl max-sm:text-sm">{userInfo?.twitter_full_name || ""}</Text>
            <div className="flex items-center gap-4">
              <Text className="max-sm:text-xs">@{userInfo?.twitter_username || ""}</Text>
              <Button
                onClick={() => {
                  copy(address || "")
                  toastContent({
                    type: "success",
                    message: "Copied to clipboard",
                  })
                }}
                className="card-info flex h-8 items-center gap-4 overflow-hidden px-3 max-sm:gap-1 max-sm:px-1"
              >
                <Text className="relative z-10 !text-white max-sm:!text-[10px] max-sm:text-xs">
                  {truncateAddress(address)}
                </Text>
                <img src="/icons/copy.png" className="h-5 w-5 max-sm:h-4 max-sm:w-4" alt="" />
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div
            className="flex min-w-[700px] items-center justify-between gap-2 rounded-xl
          border
          border-[#0085FE]
          bg-[linear-gradient(180deg,#0000%,#000_100%,0.4)] px-6 py-6 shadow-[0_7.519px_7.519px_0_rgba(255,255,255,0.25)_inset,0_7.519px_7.519px_0_rgba(0,0,0,0.25)] max-lg:w-auto max-lg:min-w-max max-md:p-3
          "
          >
            <Text className="font-neueMachinaBold relative text-2xl max-md:text-base">Invite</Text>
            <div
              onClick={() => setOpenInviteList(true)}
              className="hover:text-info-500 flex cursor-pointer items-center gap-2 underline"
            >
              <Text className="font-neueMachinaBold text-2xl max-md:text-base">{userBalance?.total_invite || 0}</Text>
              <UserIcon className="max-md:h-4 max-md:w-4" />
            </div>
          </div>

          <div
            className="flex min-w-[700px] items-center justify-between gap-4 rounded-xl
          border
          border-[#0085FE]
          bg-[linear-gradient(180deg,#0000%,#000_100%,0.4)] px-6 py-6 shadow-[0_7.519px_7.519px_0_rgba(255,255,255,0.25)_inset,0_7.519px_7.519px_0_rgba(0,0,0,0.25)] max-lg:w-auto max-lg:min-w-max max-md:p-3 max-sm:flex-col"
          >
            <Text className="font-neueMachinaBold text-xl max-md:text-sm">
              {truncateAddress(HOST, 4)}?ref_code={userInfo?.referral_code}
            </Text>
            <Button
              onClick={() => {
                copy(`${HOST}?ref_code=${userInfo?.referral_code}`)
                toastContent({
                  type: "success",
                  message: "Copied to clipboard",
                })
              }}
              className="relative h-7 w-32 rounded border border-[#0085FE] shadow-[0_1.561px_1.561px_0_rgba(255,255,255,0.25)_inset,0_1.561px_1.561px_0_rgba(0,0,0,0.25)] active:scale-95 max-md:w-20"
            >
              <span className="absolute inset-0 rounded bg-[linear-gradient(180deg,#047CD3_0%,#73C4FF_100%)] opacity-40"></span>
              <span className="relative z-10 !text-white max-md:text-xs">Copy Link</span>
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "relative bg-fixed px-6 py-10",
          "rounded-[38px] border border-black bg-[linear-gradient(182deg,rgba(17,55,103,0.20)_-16.39%,rgba(0,102,255,0.20)_71.93%)] shadow-[0_4px_4px_0_rgba(163,163,163,0.25)_inset,0_4px_6.5px_0_rgba(0,0,0,0.25)] backdrop-blur-[5px]",
          "max-md:p-10 max-sm:p-4",
        )}
      >
        <div className="absolute bottom-0 right-0 max-lg:right-0 max-md:w-[40%]">
          <img src="/images/adam.png" className="w-[90%]" alt="" />
        </div>
        <div className="flex items-center gap-40 max-lg:gap-16 max-sm:gap-6">
          <div className="space-y-4 max-sm:space-y-3">
            <Text className="font-neueMachinaBold text-xl max-md:text-base">Your USDC</Text>
            <div className="flex items-center gap-2 max-md:gap-1">
              <Text className="font-neueMachinaBold text-2xl max-md:text-base">{userBalance?.usd || 0}</Text>
              <img src="/images/tokens/usdc.png" className="h-6 w-6 max-md:h-4 max-md:w-4" alt="" />
            </div>
          </div>

          <div className="space-y-4 max-sm:space-y-3">
            <Text className="font-neueMachinaBold text-xl max-md:text-base">Your Points</Text>
            <div className="flex items-center gap-2">
              <Text className="font-neueMachinaBold text-2xl max-md:text-base">{userBalance?.point || 0}</Text>
              <img src="/images/tokens/points.png" className="h-6 w-6 max-md:h-4 max-md:w-4" alt="" />
            </div>
          </div>
        </div>
        <Button
          loading={isClaiming}
          onClick={handleClaim}
          disabled={isClaiming}
          className="mt-16 h-12 w-44 rounded-xl border border-[#0085FE] bg-[linear-gradient(180deg,#000_0%,#000_100%)] text-2xl !text-white shadow-[0_7.519px_7.519px_0_rgba(255,255,255,0.25)_inset,0_7.519px_7.519px_0_rgba(0,0,0,0.25)] max-sm:mt-10 max-sm:h-8 max-sm:w-28"
        >
          <Text className="max-sm:text-xs">Claim</Text>
          <img src="/images/tokens/usdc.png" className="h-6 w-6 max-sm:h-4 max-sm:w-4" alt="" />
        </Button>
      </div>

      <div
        className={cn(
          "relative bg-fixed px-6 py-10",
          "rounded-[38px] border border-black bg-[linear-gradient(182deg,rgba(17,55,103,0.20)_-16.39%,rgba(0,102,255,0.20)_71.93%)] shadow-[0_4px_4px_0_rgba(163,163,163,0.25)_inset,0_4px_6.5px_0_rgba(0,0,0,0.25)] backdrop-blur-[5px]",
          "max-md:p-10 max-sm:p-4",
        )}
      >
        <Text className="font-neueMachinaBold text-2xl max-md:text-xl">Claim USDC</Text>
        {!Number(withdrawalList?.length) ? (
          <Empty />
        ) : (
          <div className="mt-5 max-h-[600px] w-full overflow-auto">
            <table className="w-full min-w-[500px] pr-2 text-left">
              <thead>
                <tr className="text-lg text-white">
                  <th className="font-neueMachinaBold w-1/3 pb-2 text-left text-lg max-md:text-base">Date</th>
                  <th className="font-neueMachinaBold w-1/3 pb-2 text-center text-lg max-md:text-base">Amount</th>
                  <th className="font-neueMachinaBold w-1/3 pb-2 text-right text-lg max-md:text-base">Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawalList?.map((row: any, idx: number) => (
                  <tr key={idx} className="border-b border-[#15467D] last:border-0">
                    <td className="w-1/3 py-2 text-left text-sm max-md:text-xs">
                      {moment(row?.created_time).format("YYYY-MM-DD HH:mm:ss")}
                    </td>
                    <td className="w-1/3 py-2 text-center text-sm max-md:text-xs">{formatNumber(+row?.quantity)}</td>
                    <td className="w-1/3 py-2 text-right text-sm max-md:text-xs">
                      <span
                        className={cn(
                          row?.status === WithdrawalStatus.DONE && "text-success-500",
                          row?.status === WithdrawalStatus.FAILED && "text-error-500",
                          row?.status === WithdrawalStatus.REQUESTED && "text-warning-500",
                        )}
                      >
                        {row?.status === WithdrawalStatus.DONE
                          ? "Done"
                          : row?.status === WithdrawalStatus.FAILED
                            ? "Failed"
                            : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        className="custom-modal relative"
        width={500}
        open={openInviteList}
        onClose={() => setOpenInviteList(false)}
        footer={null}
        closeIcon={null}
      >
        <img
          onClick={() => setOpenInviteList(false)}
          src="/images/close.png"
          className="absolute -right-4 -top-4 z-30 h-12 w-12 cursor-pointer hover:scale-105 active:scale-95"
          alt=""
        />
        <div className="gradient-card">
          <div className="gradient-card-content relative p-4">
            <img src="/images/reward-his-grid.png" className="absolute inset-0 h-full w-full translate-y-3" alt="" />
            <div className="relative">
              <Text className="font-neueMachinaBold text-center text-2xl">Invited</Text>
              <div className="mt-4 max-h-[600px] overflow-auto pr-2">
                <table className="w-full">
                  <tbody>
                    {referralList?.data?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="py-2 pr-2">
                          <div className="flex items-center gap-2">
                            <Text>{index + 1}.</Text>
                            <img className="h-6 w-6 rounded-full object-cover" src={item?.avatar} alt="" />
                            <Text>{item?.full_name || item?.twitter_username}</Text>
                          </div>
                        </td>
                        <td className="w-2 px-2 text-center align-middle">|</td>
                        <td className="pl-2 text-right text-sm">{truncateAddress(item?.address)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Container>
  )
}

const LineCard = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="223" height="6" viewBox="0 0 223 6" fill="none">
      <g>
        <ellipse cx="111.759" cy="2.66655" rx="110.86" ry="2.48661" fill="url(#paint0_radial_9436_942)" />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_9436_942"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(111.759 2.66655) scale(110.86 2.48661)"
        >
          <stop stopColor="#0077FF" />
          <stop offset="1" stopColor="#15467D" stopOpacity="0.1" />
        </radialGradient>
      </defs>
    </svg>
  )
}

const UserIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      className={className}
    >
      <path
        d="M12.5996 12.1748C15.361 12.1748 17.5996 9.93623 17.5996 7.1748C17.5996 4.41338 15.361 2.1748 12.5996 2.1748C9.83819 2.1748 7.59961 4.41338 7.59961 7.1748C7.59961 9.93623 9.83819 12.1748 12.5996 12.1748Z"
        fill="white"
      />
      <path
        d="M12.5998 14.6748C7.58977 14.6748 3.50977 18.0348 3.50977 22.1748C3.50977 22.4548 3.72977 22.6748 4.00977 22.6748H21.1898C21.4698 22.6748 21.6898 22.4548 21.6898 22.1748C21.6898 18.0348 17.6098 14.6748 12.5998 14.6748Z"
        fill="white"
      />
    </svg>
  )
}

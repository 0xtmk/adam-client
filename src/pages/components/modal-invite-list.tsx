import { Loading } from "@/libs/ui/loading"
import { Text } from "@/libs/ui/text"
import { cn } from "@/utils/classnames"
import { truncateAddress } from "@/utils/string"
import { Empty, Modal, ModalProps } from "antd"
import { FC } from "react"

interface ModalInviteListProps extends ModalProps {
  data: any[]
  isLoading: boolean
}

export const ModalInviteList: FC<ModalInviteListProps> = ({ data, isLoading, ...props }) => {
  console.log("🚀 ~ ModalInviteList ~ data:", data)
  const contentNode = () => {
    if (isLoading) {
      return (
        <div className="mt-6 flex justify-center">
          <Loading className="h-10 w-10" />
        </div>
      )
    }
    if (!Number(data?.length)) {
      return (
        <div className="mt-6">
          <Empty />
        </div>
      )
    }

    return (
      <div>
        {data?.map((item, index) => {
          return (
            <div
              key={index}
              className={cn("flex h-[60px] items-center", index % 2 === 0 ? "bg-[#111932]" : "bg-[#1B2547]")}
            >
              <div className=" w-[10%] text-center">#{index + 1}</div>
              <div className=" flex w-[40%] items-center gap-2 text-left">
                <img className="h-8 w-8 rounded-full" src={item?.avatar || "/images/default-avatar.png"} alt="" />
                <Text>{item?.twitter_username}</Text>
              </div>
              <div className="w-[50%] text-left">{truncateAddress(item?.address || "")} </div>
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <Modal footer={null} className="primary-modal" {...props}>
      <div className="h-[655px] rounded-[32px] bg-[radial-gradient(circle_at_20%_4%,_#116191_0%,_#52B8FC_71%,_#243358_100%)] bg-fixed p-[2px]">
        <div className="h-full w-full rounded-[32px] bg-[#111932] p-8">
          <Text className="font-neueMachinaBold text-center text-2xl">Invited list</Text>
          <div className="mt-6">
            <div className=" rounded-[32px] bg-[linear-gradient(172deg,#456396_-27.86%,#000D1F_82.05%)] p-[2px]">
              <div className="modal-scroll-bar h-[536px]  w-full overflow-y-auto rounded-[32px]">
                <div className="flex h-14 items-center rounded-t-[32px] bg-[#1B2547]">
                  <Text className="font-neueMachinaBold w-[10%] text-center">#</Text>
                  <Text className="font-neueMachinaBold w-[40%] text-left">Username</Text>
                  <Text className="font-neueMachinaBold w-[50%] text-left">Wallet address</Text>
                </div>

                {contentNode()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

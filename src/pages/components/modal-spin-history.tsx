import { CURRENCY_TYPE } from "@/constants/app"
import { Loading } from "@/libs/ui/loading"
import { Text } from "@/libs/ui/text"
import { cn } from "@/utils/classnames"
import { formatNumber } from "@/utils/number"
import { Empty, Modal, ModalProps } from "antd"
import moment from "moment"
import { FC } from "react"

interface ModalSpinHistoryProps extends ModalProps {
  data: any[]
  isLoading: boolean
}

export const ModalSpinHistory: FC<ModalSpinHistoryProps> = ({ data, isLoading, ...props }) => {
  console.log("🚀 ~ ModalSpinHistory ~  data, isLoading,:", data, isLoading)
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
              className={cn(
                "grid h-[60px] grid-cols-2 items-center",
                index % 2 === 0 ? "bg-[rgba(40,100,151,0.10)]" : "bg-[#1B2547]",
              )}
            >
              <Text className="font-neueMachinaBold text-center">
                {moment(item?.created_time).format("DD/MM/YYYY")}
              </Text>
              <div>
                <div className="font-neueMachinaBold flex items-center gap-3  justify-center">
                  <img
                    src={
                      item?.currency_type === CURRENCY_TYPE.POINT
                        ? "/images/tokens/points.png"
                        : "/images/tokens/usdc.png"
                    }
                    className="h-5 w-5"
                    alt=""
                  />
                  <div className="flex items-center justify-center gap-1">
                    <Text>{formatNumber(+item?.reward)}</Text>
                    <Text>
                      {item?.currency_type === CURRENCY_TYPE.POINT && "Points"}
                      {item?.currency_type === CURRENCY_TYPE.USD1 && "USDC"}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <Modal footer={null} className="primary-modal" {...props}>
      <div className="h-[655px] rounded-[32px] bg-[radial-gradient(circle_at_20%_4%,_#116191_0%,_#52B8FC_71%,_#243358_100%)] p-[2px]">
        <div className="h-full w-full rounded-[32px] bg-[#111932] p-8">
          <Text className="font-neueMachinaBold text-center text-2xl">Spin history</Text>
          <div className="mt-6">
            <div className=" rounded-[32px] bg-[linear-gradient(172deg,#456396_-27.86%,#000D1F_82.05%)] p-[2px]">
              <div className="modal-scroll-bar h-[536px]  w-full overflow-y-auto rounded-[32px]">
                <div className="grid h-14 grid-cols-2 items-center rounded-t-[32px] bg-[#1B2547]">
                  <Text className="font-neueMachinaBold text-center">Date</Text>
                  <Text className="font-neueMachinaBold text-center">Reward</Text>
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

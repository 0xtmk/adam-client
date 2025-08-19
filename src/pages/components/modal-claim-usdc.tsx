import { Text } from "@/libs/ui/text"
import { Modal, ModalProps } from "antd"
import { FC } from "react"
import PrimaryButton from "./primary-btn"

interface ModalClaimUsdcProps extends ModalProps {
  data?: number
}

export const ModalClaimUsdc: FC<ModalClaimUsdcProps> = ({ data, ...props }) => {
  return (
    <Modal footer={null} className="primary-modal" {...props}>
      <div className="h-fit rounded-[32px] bg-[radial-gradient(circle_at_20%_4%,_#116191_0%,_#52B8FC_71%,_#243358_100%)] p-[2px]">
        <div className="h-full w-full rounded-[32px] bg-[#111932] p-8">
          <div className="flex justify-center">
            <img src="/images/tokens/usdc.png" className="h-[120px] w-[120px]" alt="" />
          </div>
          <div className="mt-4 flex flex-col items-center space-y-3">
            <Text
              style={{
                background: "linear-gradient(92deg, #A1D5FF 5.57%, #3499FF 111.38%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="font-neueMachinaBold text-3xl"
            >
              Congrats!
            </Text>
            <Text>You have successfully claimed</Text>
            <div className="flex items-center gap-1">
              <img src="/images/tokens/usdc.png" className="h-7 w-7" alt="" />
              <Text className="font-neueMachinaBold text-2xl">{data} USDC</Text>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <PrimaryButton onClick={(e: any) => props?.onCancel?.(e)} childClassName="w-[120px]">
              OK
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Modal>
  )
}

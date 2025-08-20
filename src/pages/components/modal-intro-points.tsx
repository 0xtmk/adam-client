import { Text } from "@/libs/ui/text"
import { Modal, ModalProps } from "antd"
import { FC } from "react"

interface ModalIntroPointsProps extends ModalProps {}

export const ModalIntroPoints: FC<ModalIntroPointsProps> = ({ ...props }) => {
  return (
    <Modal footer={null} className="primary-modal" {...props}>
      <div className="h-fit rounded-[32px] bg-[radial-gradient(circle_at_20%_4%,_#116191_0%,_#52B8FC_71%,_#243358_100%)] p-[2px]">
        <div className="h-full w-full rounded-[32px] bg-[#111932] p-8 max-sm:p-4">
          <img src="/images/adam-money.png" className="absolute bottom-8 right-8 max-sm:bottom-2 max-sm:right-0 max-sm:w-[30%]" alt="" />
          <div className="space-y-6 max-sm:space-y-4">
            <Text>Spin the wheel, let it fly,</Text>
            <Text>Catch the prize before it says goodbye.</Text>
            <Text>Luck’s on your side, let&apos;s wait and see!</Text>
            <Text>Do your missions, claim your spin,</Text>
            <Text>More rewards for you to win!</Text>
          </div>
        </div>
      </div>
    </Modal>
  )
}

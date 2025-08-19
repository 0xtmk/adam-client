import { Text } from "@/libs/ui/text"
import { Modal, ModalProps } from "antd"
import { FC } from "react"

interface ModalHowToPlayProps extends ModalProps {}

export const ModalHowToPlay: FC<ModalHowToPlayProps> = ({ ...props }) => {
  return (
    <Modal footer={null} className="primary-modal" {...props}>
      <div className="h-fit rounded-[32px] bg-[radial-gradient(circle_at_20%_4%,_#116191_0%,_#52B8FC_71%,_#243358_100%)] p-[2px]">
        <div className="h-full w-full rounded-[32px] bg-[#111932] p-8">
          <div className="flex justify-center">
            <img src="/images/spin-modal.png" className="h-[200px] w-[200px]" alt="" />
          </div>
          <Text
            style={{
              background: "var(--Brand, linear-gradient(92deg, #A1D5FF 5.57%, #3499FF 111.38%))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="font-neueMachinaBold mt-6 text-center text-3xl"
          >
            How to play
          </Text>
          <div className="mt-6">
            <Text>Complete daily missions to earn free spins for prizes like points and USDC.</Text>
            <Text className="font-neueMachinaBold">• Do daily missions to earn free spins.</Text>
            <Text className="font-neueMachinaBold">• Each spin can win you Adam Points or USDC.</Text>
            <Text className="font-neueMachinaBold">• Play daily to boost your streak and chances for big rewards.</Text>
          </div>
        </div>
      </div>
    </Modal>
  )
}

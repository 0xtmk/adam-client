import { Text } from "@/libs/ui/text"
import { Modal, ModalProps } from "antd"
import { FC } from "react"

interface ModalAboutPointsProps extends ModalProps {}

export const ModalAboutPoints: FC<ModalAboutPointsProps> = ({ ...props }) => {
  return (
    <Modal footer={null} className="primary-modal" {...props}>
      <div className="h-fit rounded-[32px] bg-[radial-gradient(circle_at_20%_4%,_#116191_0%,_#52B8FC_71%,_#243358_100%)] p-[2px]">
        <div className="h-full w-full rounded-[32px] bg-[#111932] p-8">
          <div className="flex justify-center">
            <img src="/images/tokens/points.png" className="h-[120px] w-[120px]" alt="" />
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
            About points
          </Text>
          <div className="mt-6">
            <Text>Points are the heartbeat of the ADAM ecosystem. Here&apos;s why they matter: </Text>
            <Text className="font-neueMachinaBold">• Convert into $ADAM airdrops when token revvards go live. </Text>
            <Text className="font-neueMachinaBold">
              • Claim VL NFTs for priority access to special events and drops.{" "}
            </Text>
            <Text className="font-neueMachinaBold">• Trade points for USDC or premium prizes in select events.</Text>
            <Text>The more you hold, the greater your rewards, status, and opportunities.</Text>
          </div>
        </div>
      </div>
    </Modal>
  )
}

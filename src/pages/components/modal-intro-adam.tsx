import { Text } from "@/libs/ui/text"
import { Modal, ModalProps } from "antd"
import { FC } from "react"

interface ModalIntroAdamProps extends ModalProps {}

export const ModalIntroAdam: FC<ModalIntroAdamProps> = ({ ...props }) => {
  return (
    <Modal footer={null} className="primary-modal" {...props}>
      <div className="h-fit rounded-[32px] bg-[radial-gradient(circle_at_20%_4%,_#116191_0%,_#52B8FC_71%,_#243358_100%)] p-[2px]">
        <div className="h-full w-full rounded-[32px] bg-[#111932] p-8">
          <div className="flex justify-center">
            <img src="/images/intro-adam.png" className="h-1/6 w-1/6" alt="" />
          </div>
          <Text className="mt-6 text-xl text-center">
            ADAM - Not just a project, but a mission to protect the planet and power charity.
          </Text>
        </div>
      </div>
    </Modal>
  )
}

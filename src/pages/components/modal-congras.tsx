import { Modal, ModalProps } from "antd"
import { FC } from "react"

interface ModalCongratsProps extends ModalProps {
  children: React.ReactNode
}

export const ModalCongrats: FC<ModalCongratsProps> = ({ children, ...props }) => {
  return (
    <Modal rootClassName="modal-congrats-root" className="modal-congrats" footer={null} closeIcon={null} centered {...props}>
      {children}
    </Modal>
  )
}

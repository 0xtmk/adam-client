import { FC } from "react"

interface ButtonConnectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}

export const ButtonConnect: FC<ButtonConnectProps> = ({ children, ...props }) => {
  return (
    <button {...props} className="uiverse active:scale-95">
      <div className="wrapper">
        {/* <span className="text-white">CONNECT</span> */}
        {children}
        <div className="circle circle-12"></div>
        <div className="circle circle-11"></div>
        <div className="circle circle-10"></div>
        <div className="circle circle-9"></div>
        <div className="circle circle-8"></div>
        <div className="circle circle-7"></div>
        <div className="circle circle-6"></div>
        <div className="circle circle-5"></div>
        <div className="circle circle-4"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-1"></div>
      </div>
    </button>
  )
}

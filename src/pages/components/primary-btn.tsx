import { cn } from "@/utils/classnames"

interface PrimaryButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}
const PrimaryButton = ({ className, children, ...props }: PrimaryButtonProps) => {
  return (
    <div
      className="relative z-10 cursor-pointer rounded-full bg-[linear-gradient(92deg,#A1D5FF_5.57%,#3499FF_111.38%)] p-[1px] hover:opacity-80 active:scale-95"
      {...props}
    >
      <div
        className={cn(
          "flex h-10 w-[72px] items-center justify-center rounded-full bg-[radial-gradient(91.73%_131.24%_at_20.47%_4%,_#116191_0%,_#52B8FC_71.41%,_#243358_100%)]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default PrimaryButton

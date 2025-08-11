import { FC, ReactNode } from "react"

interface TonProviderProps {
  children: ReactNode
}

export const TonProvider: FC<TonProviderProps> = ({ children }) => {
  return <div>{children}</div>
}

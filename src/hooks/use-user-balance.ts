import { Service } from "@/services/app.service"
import useSWR from "swr"
import { useUserStore } from "./stores/use-user-store"

const useUserBalances = () => {
  const { token } = useUserStore()
  const { data: userBalance, mutate } = useSWR(["get-user-balance", token], async () => {
    if (!token) return null
    const response = await Service.user.getInfo()
    return response
  })

  return {
    userBalance,
    mutateUserBalance: mutate,
  }
}

export default useUserBalances

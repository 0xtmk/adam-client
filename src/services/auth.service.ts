import { axiosInstance } from "@/libs/axios/axios-instance"
import { UserInfo } from "@/types/user.type"

export class AuthService {
  async getNonce(address: string) {
    const response = await axiosInstance.get<{
      nonce: string
    }>("/auth/get-nonce", {
      params: {
        address,
      },
    })

    return response.data
  }

  async login(address: string, sign: string, referral_code?: string) {
    const response = await axiosInstance.post<{
      user_info: UserInfo
      token: string
    }>("/auth/login", {
      address,
      sign,
      referral_code,
    })

    return response.data
  }

  async loginSolana(address: string, sign: string, referral_code?: string) {
    const { data } = await axiosInstance.post<{
      userInfo: UserInfo
      token: string
    }>("/auth/login", {
      address,
      sign,
      referral_code,
    })

    return data
  }
}

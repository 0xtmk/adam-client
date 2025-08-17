import { axiosInstance } from "@/libs/axios/axios-instance"
import { RLeaderboard, UserInfo } from "@/types/user.type"

export class UserService {
  async getUser() {
    const response = await axiosInstance.get<UserInfo>("/user/get")

    return response.data
  }

  async getLeaderboard() {
    const response = await axiosInstance.request<RLeaderboard>({
      method: "GET",
      url: "/user/leaderboard",
    })

    return response.data
  }

  async getInfo() {
    const response = await axiosInstance.request<any>({
      method: "GET",
      url: "/user/info",
    })

    return response.data
  }
  async listReferrals() {
    const response = await axiosInstance.request<any>({
      method: "GET",
      url: "/user/list-ref",
    })

    return response.data
  }
}

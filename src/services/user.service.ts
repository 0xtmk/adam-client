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
}

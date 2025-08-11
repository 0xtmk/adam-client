import { axiosInstance } from "@/libs/axios/axios-instance"
import { BaseDataListResponse, BaseParamsRequest } from "@/types/core.type"
import { Leaderboard } from "@/types/game.type"

export class GameService {
  async getLeaderboard(params?: BaseParamsRequest) {
    const { data } = await axiosInstance.request<BaseDataListResponse<Leaderboard>>({
      method: "GET",
      url: "/game/leaderboard",
      params,
    })
    return data
  }
}

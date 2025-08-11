import { axiosInstance } from "@/libs/axios/axios-instance"

export class CommonService {
  async getUrlGame() {
    const { data } = await axiosInstance.request<{ url: string }>({
      method: "GET",
      url: "/game/get-link",
      params: {},
    })
    return data
  }
}

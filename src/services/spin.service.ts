import { axiosInstance } from "@/libs/axios/axios-instance"

class SpinService {
  async getListReward() {
    const response = await axiosInstance.request({
      method: "GET",
      url: "/spin/list-reward",
    })

    return response.data
  }

  async spinWheel() {
    const response = await axiosInstance.request({
      method: "POST",
      url: "/spin/get",
    })

    return response.data
  }

  async getHistory(params?: { offset?: number; limit?: number }) {
    const response = await axiosInstance.request({
      method: "GET",
      url: "/spin/history",
      params
    })

    return response.data
  }
}

export default SpinService

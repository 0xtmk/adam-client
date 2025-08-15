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
}

export default SpinService

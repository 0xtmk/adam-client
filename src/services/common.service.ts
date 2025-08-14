import { axiosInstance } from "@/libs/axios/axios-instance"

export class CommonService {
  async getTwitterUrl() {
    const { data } = await axiosInstance.request({
      method: "GET",
      url: "/twitter/link",
    })

    return data
  }

  async callbackTwitter(code: string) {
    const { data } = await axiosInstance.request({
      method: "POST",
      url: "/twitter/connect-callback",
      data: {
        code,
      },
    })

    return data
  }

  async logoutTwitter() {
    const { data } = await axiosInstance.request({
      method: "POST",
      url: "/twitter/logout",
    })

    return data
  }

  async withdrawal() {
    const { data } = await axiosInstance.request({
      method: "POST",
      url: "/withdrawal/withdraw-usd",
    })
    return data
  }
}

import { axiosInstance } from "@/libs/axios/axios-instance"

class MissionService {
  async getListMissions() {
    const reponse = await axiosInstance.request<RMission[]>({
      method: "GET",
      url: "/mission/list",
    })
    return reponse.data
  }

  async checkMission(missionId: number) {
    const reponse = await axiosInstance.request({
      method: "POST",
      url: "/mission/check",
      data: {
        mission_id: missionId,
      },
    })
    return reponse.data
  }
}

export default MissionService

interface RMission {
  id: number
  timestamp: number
  mission_type: number
  data: MissionData
  status: number
  name: string
  updated_time: string
  user_status: number
}

interface MissionData {
  target_id: string
  target_content: string
}

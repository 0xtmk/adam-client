import { AuthService } from "./auth.service"
import { CommonService } from "./common.service"
import MissionService from "./mission.service"
import SpinService from "./spin.service"
import { UserService } from "./user.service"
import { Web3Service } from "./web3.service"

export const Service = {
  auth: new AuthService(),
  user: new UserService(),
  web3: new Web3Service(),
  common: new CommonService(),
  mission: new MissionService(),
  spin: new SpinService(),
}

import { UserInfo } from "./user.type"

export enum EWSChatType {
  LOGIN = "login",
  LIST_MESSAGE = "list_message",
  CHAT = "chat_bot",
  NEW_CHAT = "new_chat_bot"
}

export enum EChatType {
  BOT = 1,
  COMMUNITY,
}

export enum EMessageType {
  USER = 1,
  BOT,
}

export interface IChatItem {
  id?: number
  user_id?: number
  message?: string
  user_info?: UserInfo
  type?: number
  message_type?: EMessageType
  created_time?: string
}

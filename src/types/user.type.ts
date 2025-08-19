import { Address } from "viem"

export interface UserInfo {
  id?: number
  address?: Address
  email?: string
  name?: string
  username?: string
  full_name?: string
  avatar?: string
  mobile?: string
  ref?: string
  type?: number
  status?: number
  last_active?: string
  created_time?: string
  updated_time?: string
  token?: string
  [key: string]: any
}

export interface RLeaderboard {
  list_top: Listtop[]
  user_rank: Userrank
}

interface Userrank {
  id: number
  twitter_username: null
  address: null
  balance: number
  rank: number
  total_invite: number
  avatar: string
}

interface Listtop {
  id: number
  twitter_username: string
  address: string
  total_invite: number
  balance: string
  avatar: string

}

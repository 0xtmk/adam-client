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

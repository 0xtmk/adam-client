import { ReactNode } from "react"

export interface BaseRoute {
  label: ReactNode
  to: string
  icon?: ReactNode
  isEnd?: boolean
  isComingSoon?: boolean
  isExternalLink?: boolean
  isLoginRequired?: boolean
  childrens?: BaseRoute[]
}

export type Theme = "dark" | "light"

export interface BaseParamsRequest {
  limit?: number
  offset?: number
  search?: string
  order_by?: string
  reverse?: boolean
}
export interface BaseResponse<T> {
  error_code: string
  data: T
}

export interface BaseDataListResponse<T> {
  data: T[]
  total: number
}

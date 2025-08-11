import axios, { AxiosError } from "axios"

export const isAxiosError = <T = any>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error)
}

export const getAxiosError = <T = { error_msg: string; error_code: string }>(error: unknown) => {
  if (isAxiosError<T>(error)) {
    return error.response?.data
  }
}

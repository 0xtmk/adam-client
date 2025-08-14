import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { Chain } from "viem"

import { API_URL, API_URLS_FOR_CHAINS } from "@/configs/endpoints.config"
import { isProduction } from "@/configs/env.config"
import { useUserStore } from "@/hooks/stores/use-user-store"
import { toast } from "react-toastify"
import { useWeb3Store } from "../web3/evm/hooks/stores/use-web3-store"
import { toastContent } from "@/utils/toast"

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60s
  headers: {},
})

function onRequestFulfilled(config: InternalAxiosRequestConfig) {
  const { token } = useUserStore.getState()
  const { chain } = useWeb3Store.getState()

  if (chain) {
    const apiMatchedWithChain = API_URLS_FOR_CHAINS.TESTNET.chains.find(
      (chainConfig: Chain) => chainConfig?.id === chain.id,
    )
    if (apiMatchedWithChain) {
      config.baseURL = API_URLS_FOR_CHAINS.TESTNET.url
    } else {
      const apiMatchedWithChain = API_URLS_FOR_CHAINS.MAINNET.chains.find(
        (chainConfig: Chain) => chainConfig?.id === chain.id,
      )

      if (apiMatchedWithChain) {
        config.baseURL = API_URLS_FOR_CHAINS.MAINNET.url
      }
    }
  }

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }

  return config
}

function onResponseFulfilled(response: AxiosResponse) {
  response.data = response.data.data
  return Promise.resolve(response)
}

function onResponseRejected(error: AxiosError) {
  if (error?.code === "ERR_NETWORK" && !isProduction) {
    toast.error("Network Error. This could be a CORS issue or a dropped internet connection.", {
      toastId: "network-error",
    })
  }

  const errorCode = (error?.response as any)?.data?.error_code

  switch (errorCode) {
    case "TWITTER_IS_CONNECTED": {
      toastContent({
        type: "error",
        message: "Twitter is already connected!",
      })
      break
    }

  }
  return Promise.reject(error)
}

axiosInstance.interceptors.request.use(onRequestFulfilled)
axiosInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected)

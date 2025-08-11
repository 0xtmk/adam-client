import { WS_URL } from "@/configs/endpoints.config"
import { useCallback, useMemo } from "react"
import useWebSocket from "react-use-websocket"
import useSWR from "swr"
import { useUserStore } from "./stores/use-user-store"

const useSocketConnect = () => {
  const { token } = useUserStore()

  const { sendJsonMessage, sendMessage, readyState, lastMessage, lastJsonMessage, getWebSocket } = useWebSocket(
    WS_URL,
    {
      onOpen: async () => {
        console.log("Connection opened.")
        loginWs()
      },
      onClose: () => {
        console.log("Connection closed.")
      },
      onError: () => {
        console.log("Connection error.")
      },
      shouldReconnect: (closeEvent) => true,
      share: true,
      retryOnError: true,
      reconnectInterval: 5000,
      reconnectAttempts: 120,
    },
  )

  const loginWs = useCallback(() => {
    if (!token) return
    sendJsonMessage({
      type: "login",
      data: {
        token,
      },
    })
  }, [token])

  useSWR(
    ["socket-webapp-login", loginWs],
    async () => {
      loginWs()
    }
  )

  useSWR(
    ["socket-webapp-ping"],
    () => {
      sendJsonMessage({
        type: "ping",
      })
    },
    {
      refreshInterval: 8000,
    },
  )

  const connectStatus = useMemo(() => {
    return readyState
  }, [readyState])

  return {
    sendJsonMessage,
    sendMessage,
    connectStatus,
    lastMessage,
    lastJsonMessage: lastJsonMessage as any,
    getWebSocket,
    loginWs
  }
}

export default useSocketConnect

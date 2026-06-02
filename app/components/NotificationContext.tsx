"use client"

import { createContext, useContext, useState, useCallback } from "react"

type NotificationType = "success" | "error"

type NotificationContextType = {
  message: string,
  type: NotificationType,
  showNotification: (message: string, type?: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  showNotification: () => { }
})

export const NotificationProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [message, setMessage] = useState("")
  const [type, setType] = useState<NotificationType>("success")

  const showNotification = useCallback((
    msg: string,
    notifiType: NotificationType = "success"
  ) => {
    setMessage(msg)
    setType(notifiType)
    setTimeout(() => {
      setMessage("")
    }, 5 * 1000);
  }, [])

  return (
    <NotificationContext value={{ message, type, showNotification }}>
      {children}
    </NotificationContext>
  )
}

export const useNotification = () => useContext(NotificationContext)
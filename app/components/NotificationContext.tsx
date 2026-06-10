"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { NotificationError } from "../actions/users"

type NotificationType = "success" | "error"

type NotificationContextType = {
  error: NotificationError
  type: NotificationType,
  showNotification: (message: NotificationError, type?: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextType>({
  error: { message: "", type: "" },
  type: "success",
  showNotification: () => { }
})

export const NotificationProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [error, setError] = useState({ message: "", type: "" })
  const [type, setType] = useState<NotificationType>("success")

  const showNotification = useCallback((
    error: { message: string, type: string },
    notifiType: NotificationType = "success",
  ) => {
    setError(error)
    setType(notifiType)
    setTimeout(() => {
      setError({ message: "", type: "" })
    }, 5 * 1000);
  }, [])

  return (
    <NotificationContext value={{ error, type, showNotification }}>
      {children}
    </NotificationContext>
  )
}

export const useNotification = () => useContext(NotificationContext)
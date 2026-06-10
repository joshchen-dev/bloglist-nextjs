"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { error, type } = useNotification()

  if (!error.message) {
    return null
  }

  return (
    <div className={`py-[10px] px-[16px] mb-[10px] rounded-lg text-white ${type === "success" ? "bg-green-500" : "bg-red-500"}`} data-testid={error.type}>
      {error.message}
    </div>
  )
}
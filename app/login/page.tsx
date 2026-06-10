"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useNotification } from "../components/NotificationContext";

export default function LoginPage() {
  const router = useRouter()
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false
    })

    if (result?.error) {
      showNotification({ message: "wrong credentials", type: "error-message" }, "error")
    } else {
      showNotification({ message: "successfully logged in", type: "notification" }, "success")
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>
        <button type="submit" data-testid="login-button">Login</button>
      </form>
    </div>
  )
}
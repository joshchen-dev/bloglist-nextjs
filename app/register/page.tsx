"use client"

import { useActionState, useEffect } from "react";
import { registerUser } from "../actions/users";
import { useNotification } from "../components/NotificationContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    error: { message: "", type: "" },
    success: false
  })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification({ message: "user registered", type: "" })
      router.push("/login")
    } else {
      showNotification(state.error, "error")
    }
  }, [state, showNotification, router])

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input type="password" name="confirm" required />
          </label>
        </div>
        <button type="submit" data-testid="register-button">Register</button>
      </form>
    </div>
  )
}
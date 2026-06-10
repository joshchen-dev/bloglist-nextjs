"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import bcrypt from "bcryptjs"
import { minLength } from "../utils/validation"
import { eq } from "drizzle-orm"

export type NotificationError = {
  message: string,
  type: string
}

export const registerUser = async (prevState: { error: NotificationError, success: boolean }, formData: FormData) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const confirm = formData.get("confirm") as string

  const usernameError = minLength(username, 4)
  if (usernameError?.error) {
    return {
      error: { message: "username less than 4 characters long", type: "username-error" },
      success: false
    }
  }



  for (const v of [username, password]) {
    const res = minLength(v, 4)
    if (res?.error) {
      return {
        error: { message: res.error, type: "test" },
        success: false,
      }
    }
  }

  if (!confirm || confirm !== password) {
    return {
      error: { message: "passwords don't match", type: "passwordConfirm-error" },
      success: false,
    }
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, username)
  })

  if (user) {
    return {
      error: { message: `"${username}" has already been registered`, type: "" },
      success: false,
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  return {
    error: { message: "", type: "" },
    success: true,
  }
}
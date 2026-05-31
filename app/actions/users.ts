"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { minLength } from "../utils/validation"
import { eq } from "drizzle-orm"

export const registerUser = async (prevState: { error: string }, formData: FormData) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const confirm = formData.get("confirm") as string

  for (const v of [username, password]) {
    const res = minLength(v, 4)
    if (res?.error) {
      return res
    }
  }

  if (!confirm || confirm !== password) {
    return { error: "passwords don't match" }
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, username)
  })

  if (user) {
    return { error: `"${username}" has already been registered` }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}
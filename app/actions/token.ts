"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { randomUUID } from "crypto"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const generateToken = async (formdata: FormData) => {
  const username = formdata.get("username") as string
  const uuid = randomUUID()

  await db.update(users)
    .set({ token: uuid })
    .where(eq(users.username, username))

  revalidatePath("/me")
}
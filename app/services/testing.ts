import { db } from "@/db"
import { blogs, readingLists, users } from "@/db/schema"

export const resetDatabase = async () => {
  await db.delete(readingLists)
  await db.delete(blogs)
  await db.delete(users)
}
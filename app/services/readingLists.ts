import { db } from "@/db"
import { getUser } from "./users"
import { readingLists } from "@/db/schema"
import { eq } from "drizzle-orm"

export const insertToReadingList = async (username: string, blogId: string) => {
  const userId = (await getUser(username))?.id

  await db
    .insert(readingLists)
    .values({
      userId: Number(userId),
      blogId: Number(blogId)
    })
}

export const markAsRead = async (readingListId: string) => {
  const id = Number(readingListId)

  await db.update(readingLists)
    .set({ read: true })
    .where(eq(readingLists.id, id))
}
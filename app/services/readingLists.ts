import { db } from "@/db"
import { getUser } from "./users"
import { readingLists } from "@/db/schema"

export const insertToReadingList = async (username: string, blogId: string) => {
  const userId = (await getUser(username))?.id

  await db
    .insert(readingLists)
    .values({
      userId: Number(userId),
      blogId: Number(blogId)
    })
}
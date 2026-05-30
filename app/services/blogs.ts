import { db } from "@/db"
import { blogs } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { getCurrentUser } from "./session"

export const getBlogs = async () => {
  return db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  await db.insert(blogs).values({ title, author, url, userId: user!.id })
}

export const getBlogById = async (id: number) => {
  return await db.query.blogs.findFirst({
    where: eq(blogs.id, id)
  })
}

export const incrementBlogLikes = async (id: number) => {
  await db.update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id))
}
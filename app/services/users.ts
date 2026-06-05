import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUser = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username)
  })
}

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: true,
      readingLists: {
        with: {
          blog: true
        }
      }
    }
  })
}
export const getUserWithMatchingToken = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
    columns: {
      passwordHash: false,
      token: false
    },
    with: {
      blogs: {
        columns: {
          author: true,
          title: true,
          url: true
        }
      }
    }
  })
}
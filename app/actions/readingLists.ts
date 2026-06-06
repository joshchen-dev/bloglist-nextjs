"use server"

import { revalidatePath } from "next/cache"
import { insertToReadingList, markAsRead } from "../services/readingLists"

export const addToReadingList = async (formdata: FormData) => {
  const username = formdata.get("username") as string
  const blogId = formdata.get("blogId") as string

  await insertToReadingList(username, blogId)
}

export const markRead = async (formdata: FormData) => {
  const id = formdata.get("readingListId") as string
  await markAsRead(id)
  revalidatePath("/me")
}
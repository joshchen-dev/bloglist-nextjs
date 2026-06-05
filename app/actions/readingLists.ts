"use server"

import { insertToReadingList } from "../services/readingLists"

export const addToReadingList = async (formdata: FormData) => {
  const username = formdata.get("username") as string
  const blogId = formdata.get("blogId") as string

  await insertToReadingList(username, blogId)
}
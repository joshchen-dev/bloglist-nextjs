"use server"

import { redirect } from "next/navigation"
import { addBlog, incrementBlogLikes } from "../services/blogs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { minLength } from "../utils/validation"
import { ReturnValues } from "@/types"

export const createBlog = async (prevState: { error: string, values?: ReturnValues, success: boolean }, formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string

  for (const v of [title, author, url]) {
    const res = minLength(v, 6)
    if (res?.error) {
      return {
        error: res.error,
        values: { title, author, url },
        success: false
      }
    }
  }

  await addBlog(title, author, url)
  revalidatePath("/blogs")
  return {
    error: "",
    success: true
  }
}

export const likeBlog = async (formdata: FormData) => {
  const id = Number(formdata.get("id"))
  await incrementBlogLikes(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const filterBlogTitle = async (formdata: FormData) => {
  const filter = formdata.get("filter")?.toString().toLowerCase()
  if (filter) {
    redirect(`/blogs?title=${filter}`)
  } else {
    redirect("blogs")
  }
}
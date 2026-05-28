"use server"

import { redirect } from "next/navigation"
import { addBlog, incrementBlogLikes } from "../services/blogs"
import { revalidatePath } from "next/cache"

export const createBlog = async (formData: FormData) => {
  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  await addBlog(title, author, url)
  revalidatePath("/blogs")
  redirect("/blogs")
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
"use client"

import { createBlog } from "@/app/actions/blogs"
import DivCard from "@/app/components/DivCard"
import { useNotification } from "@/app/components/NotificationContext"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    values: {
      title: "",
      author: "",
      url: ""
    },
    success: false
  })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    console.log(state)
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    } else if (state.error) {
      showNotification(state.error, "error")
    }
  }, [state, showNotification, router])

  return (
    <DivCard>
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction} className="bg-white">
        <div className="hover:bg-gray-50 border-2 border-black/60 rounded-lg py-1 px-2 shadow-xl mb-3 space-y-1">
          <div>
            <label className="">
              Title
              <input
                type="text" name="title" required minLength={5} defaultValue={state.values?.title}
                className="border rounded ml-1 pl-1"
              />
            </label>
          </div>
          <div>
            <label>
              Author
              <input
                type="text" name="author" required minLength={5} defaultValue={state.values?.author}
                className="border rounded ml-1 pl-1"
              />
            </label>
          </div>
          <div>
            <label>
              URL
              <input
                type="text" name="url" required minLength={5} defaultValue={state.values?.url}
                className="border rounded ml-1 pl-1"
              />
            </label>
          </div>
        </div>
        <button type="submit" className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm text-white">Create</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </DivCard>
  )
}

export default NewBlog
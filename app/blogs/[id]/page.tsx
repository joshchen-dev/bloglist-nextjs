import { likeBlog } from "@/app/actions/blogs"
import { getBlogById } from "@/app/services/blogs"
import { notFound } from "next/navigation"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p><strong>Author:</strong> {blog.author}</p>
      <p><strong>URL:</strong> {blog.url}</p>
      <p><strong>Likes:</strong> {blog.likes}</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">
          like
        </button>

      </form>
    </div>
  )
}

export default BlogPage
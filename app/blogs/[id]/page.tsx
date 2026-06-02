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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
      <div className="space-y-1 mb-2 border-2 rounded-xl p-3 hover:bg-gray-50">
        <p><strong>Author:</strong> {blog.author}</p>
        <p><strong>URL:</strong> {blog.url}</p>
        <p><strong>Likes:</strong> {blog.likes}</p>
      </div>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm text-white">
          like
        </button>

      </form>
    </div>
  )
}

export default BlogPage
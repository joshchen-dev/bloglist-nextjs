import { likeBlog } from "@/app/actions/blogs"
import { addToReadingList } from "@/app/actions/readingLists"
import { getBlogById } from "@/app/services/blogs"
import { auth } from "@/auth"
import { notFound } from "next/navigation"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const user = (await auth())?.user

  if (!blog) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6" data-testid="blog-detail">
      <h2 className="text-2xl font-bold mb-4" data-testid="blog-title">{blog.title}</h2>
      <div className="space-y-1 mb-2 border-2 rounded-xl p-3 hover:bg-gray-50">
        <p data-testid="blog-author"><strong>Author:</strong> {blog.author}</p>
        <p><strong>URL:</strong> {blog.url}</p>
        <p><strong>Likes:</strong> {blog.likes}</p>
      </div>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 m-2 rounded text-sm text-white">
          like
        </button>
      </form>
      {user && (
        <form action={addToReadingList}>
          <input type="hidden" name="blogId" value={blog.id} />
          <input type="hidden" name="username" value={String(user.email)} />
          <button type="submit" className="bg-green-600 hover:bg-green-500 px-4 py-2 m-2 rounded text-sm text-white" data-testid="add-to-reading-list-button">
            add to reading list
          </button>
        </form>
      )}
    </div>
  )
}

export default BlogPage
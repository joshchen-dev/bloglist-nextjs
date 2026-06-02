import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { filterBlogTitle } from "../actions/blogs"

const Blogs = async ({ searchParams }: { searchParams: Promise<{ title: string }> }) => {
  const { title } = await searchParams
  const blogs = await getBlogs()
  blogs.sort((a, b) => b.likes - a.likes)
  const filteredBlogs = title
    ? blogs.filter(blog => blog.title.toLowerCase().includes(title))
    : blogs

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <form action={filterBlogTitle} className="mb-4">
        <input className="border rounded mr-2 p-0.5" name="filter" placeholder="enter your title filter..." />
        <button type="submit" className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm text-white">Search</button>
      </form>
      <ul className="space-y-2">
        {filteredBlogs.map(blog => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
              {blog.title} <strong>{blog.author}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default Blogs
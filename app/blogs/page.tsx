import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { filterBlogTitle } from "../actions/blogs"
import DivCard from "../components/DivCard"
import { addToReadingList } from "../actions/readingLists"
import { auth } from "@/auth"

const Blogs = async ({ searchParams }: { searchParams: Promise<{ title: string }> }) => {
  const session = await auth()
  const user = session?.user
  const { title } = await searchParams
  const blogs = await getBlogs()
  blogs.sort((a, b) => b.likes - a.likes)
  const filteredBlogs = title
    ? blogs.filter(blog => blog.title.toLowerCase().includes(title))
    : blogs

  return (
    <DivCard>
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <form action={filterBlogTitle} className="mb-4">
        <input className="border rounded mr-2 p-0.5" name="filter" placeholder="enter your title filter..." data-testid="filter-input" />
        <button type="submit" className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm text-white" data-testid="search-button">Search</button>
      </form>
      <ul className="space-y-2" data-testid="blogs-list">
        {filteredBlogs.map(blog => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <div>
              <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
                {blog.title}
              </Link>
              <strong>{blog.author}</strong>
              {` ${blog.likes} likes`}
            </div>
            <form action={addToReadingList}>
              <input type="hidden" name="username" value={String(user?.email)} />
              <input type="hidden" name="blogId" value={blog.id} />
              <button type="submit" className="ml-auto bg-green-600 hover:bg-green-500 px-4 py-2 m-2 rounded text-sm text-white" data-testid="add-to-reading-list-button">mark as read</button>
            </form>
          </li>
        ))}
      </ul>
    </DivCard >

  )
}

export default Blogs
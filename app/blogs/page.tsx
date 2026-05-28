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
    <div>
      <h2>Blogs</h2>
      <ul>
        {filteredBlogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title} <strong>{blog.author}</strong></Link>
          </li>
        ))}
      </ul>
      <form action={filterBlogTitle}>
        <input style={{ marginRight: "10px" }} name="filter" placeholder="enter your title filter..." />
        <button type="submit">Search</button>
      </form>
    </div>

  )
}
export default Blogs
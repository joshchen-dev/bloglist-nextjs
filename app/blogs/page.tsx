import { blogs } from "../services/blogs"

const Blogs = () => {
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            {blog.title} <strong>{blog.author}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs
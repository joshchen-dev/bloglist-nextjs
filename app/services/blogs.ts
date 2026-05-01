export const blogs = [
  {
    id: 1,
    title: "Say the Thing You Want",
    author: "Terrible Software",
    url: "https://terriblesoftware.org/2026/04/01/say-the-thing-you-want/",
    likes: 0
  },
  {
    id: 2,
    title: "また逢う日まで",
    author: "尾崎紀世彦",
    url: "https://www.youtube.com/watch?v=JXh4zt3fL9Y",
    likes: 0
  },
]

let nextId = 3

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({
    id: nextId++,
    title,
    author,
    url,
    likes: 0
  })
}
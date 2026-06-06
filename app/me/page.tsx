import { notFound } from "next/navigation"
import { getUserWithBlogs } from "../services/users"
import { auth } from "@/auth"
import { generateToken } from "../actions/token"
import DivCard from "../components/DivCard"
import Link from "next/link"
import { markRead } from "../actions/readingLists"

const MePage = async () => {
  const session = await auth()
  const user = session?.user

  if (!user?.email) {
    notFound()
  }

  const userData = await getUserWithBlogs(user.email)
  console.log(userData?.readingLists)
  const readList = userData?.readingLists.filter(v => v.read)
  const unreadList = userData?.readingLists.filter(v => !v.read)

  return (
    <DivCard>
      <section className="mt-4 mb-6 space-y-4">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <p>Name: {user.name}</p>
        <p>Username: {user.email}</p>
      </section>
      <section className="my-6 space-y-4">
        <h2 className="text-2xl font-bold">API Token</h2>
        {userData?.token
          ? (
            <p>Current token: {userData.token}</p>
          ) : (
            <p>No token generated yet.</p>
          )}
        <form action={generateToken}>
          <input type="hidden" name="username" value={user.email} />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded text-sm text-white">
            Generate New Token
          </button>
        </form>
        {userData?.readingLists && (
          <section className="my-6 space-y-4">
            <h2 className="text-2xl font-bold">My Reading List</h2>
            <h3 className="text-xl font-bold">Unread {`(${unreadList?.length})`}</h3>
            {unreadList!.map(r => (
              <div key={r.id}>
                <form action={markRead} className="flex items-center">
                  <Link href={`/blogs/${r.blog.id}`}>{r.blog.title}</Link>
                  <input type="hidden" name="readingListId" value={r.id} />
                  <button type="submit" className="ml-auto bg-green-600 hover:bg-green-500 px-4 py-2 m-2 rounded text-sm text-white">mark as read</button>
                </form>
              </div>
            ))}
            <h3 className="text-xl font-bold">Read {`(${readList?.length})`}</h3>
            {readList!.map(r => (
              <p key={r.id}>
                <Link href={`/blogs/${r.blog.id}`}>{r.blog.title}</Link>
              </p>
            ))}
          </section>
        )}
      </section>
    </DivCard>
  )
}

export default MePage
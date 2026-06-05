import { notFound } from "next/navigation"
import { getUserWithBlogs } from "../services/users"
import { auth } from "@/auth"
import { generateToken } from "../actions/token"
import DivCard from "../components/DivCard"

const MePage = async () => {
  const session = await auth()
  const user = session?.user

  if (!user?.email) {
    notFound()
  }

  const userData = await getUserWithBlogs(user.email)

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
        <section className="my-6 space-y-4">
          <h2 className="text-2xl font-bold">My Reading List</h2>
          {userData?.readingLists.map(r => (
            <p key={r.id}>{r.blog.title}</p>
          ))}
        </section>
      </section>
    </DivCard>
  )
}

export default MePage
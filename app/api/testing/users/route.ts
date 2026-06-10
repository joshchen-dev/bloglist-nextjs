import { registerUser } from "@/app/services/users"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This engpoint is not available in production" },
      { status: 403 }
    )
  }

  const body = await req.json()
  console.log(body)
  await registerUser(body.username, body.name, body.password)

  return NextResponse.json({ ok: "test" })
}
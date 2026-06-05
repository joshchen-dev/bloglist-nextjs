import { getUserWithMatchingToken } from "@/app/services/users"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export const GET = async () => {
  const headersList = await headers()
  const authorization = headersList.get("authorization")

  if (!authorization) {
    return NextResponse.json(
      { error: "Not authorized" },
      { status: 401 }
    )
  }

  const user = await getUserWithMatchingToken(authorization?.substring(7))

  return NextResponse.json(user)
}
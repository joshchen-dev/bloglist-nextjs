import { resetDatabase } from "@/app/services/testing"
import { NextResponse } from "next/server"

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This engpoint is not available in production" },
      { status: 403 }
    )
  }

  await resetDatabase()

  return Response.json({
    ok: "database has been reset"
  })
}
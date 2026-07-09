import { NextResponse } from "next/server";


export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out" },
    { status: 200 }
  );

  console.log("logging out from api");

  response.cookies.set("admin_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/"
  });

  return response;
}

import { createAdminToken } from "@/lib/auth";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const { password } = await request.json();

  if (!password || password !== process.env.ADM_PSS) {
    return NextResponse.json(
      { message: "Invalid Credentials." },
      { status: 401 });
  }

  const token = await createAdminToken();

  const response = NextResponse.json(
    { message: "Login Successful" },
    { status: 200 }
  );

  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 2
  });

  return response;

}

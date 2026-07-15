import { verifyAdminToken } from "@/lib/auth";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const runtime = "nodejs";

const editableFiles = {
  experience: path.join(process.cwd(), "src", "app", "content", "experience.json"),
  projects: path.join(process.cwd(), "src", "app", "content", "projects.json"),
} as const;

type EditableFile = keyof typeof editableFiles;

const isEditableFile = (file: string | null): file is EditableFile =>
  file === "experience" || file === "projects";

const verifyRequest = async (request: NextRequest) => {
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return false;
  }

  return Boolean(await verifyAdminToken(token));
};

export async function GET(request: NextRequest) {
  if (!(await verifyRequest(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const file = request.nextUrl.searchParams.get("file");

  if (!isEditableFile(file)) {
    return NextResponse.json({ message: "Invalid JSON file." }, { status: 400 });
  }

  const content = await fs.readFile(editableFiles[file], "utf-8");

  return NextResponse.json({ content });
}

export async function PUT(request: NextRequest) {
  if (!(await verifyRequest(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const file = request.nextUrl.searchParams.get("file");

  if (!isEditableFile(file)) {
    return NextResponse.json({ message: "Invalid JSON file." }, { status: 400 });
  }

  const { content } = (await request.json()) as { content?: string };

  if (!content) {
    return NextResponse.json({ message: "JSON content is required." }, { status: 400 });
  }

  try {
    JSON.parse(content);
  } catch {
    return NextResponse.json({ message: "JSON content is not valid." }, { status: 400 });
  }

  await fs.writeFile(editableFiles[file], `${content.trim()}\n`, "utf-8");

  return NextResponse.json({ message: "JSON saved." });
}

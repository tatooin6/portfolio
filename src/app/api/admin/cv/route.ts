import { verifyAdminToken } from "@/lib/auth";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const runtime = "nodejs";

const cvFiles = {
  english: path.join(process.cwd(), "public", "CV-AntonioPantoja_ENG.pdf"),
  spanish: path.join(process.cwd(), "public", "CV-AntonioPantoja_ESP.pdf"),
} as const;

type CvLanguage = keyof typeof cvFiles;

const isCvLanguage = (language: FormDataEntryValue | null): language is CvLanguage =>
  language === "english" || language === "spanish";

const verifyRequest = async (request: NextRequest) => {
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return false;
  }

  return Boolean(await verifyAdminToken(token));
};

export async function POST(request: NextRequest) {
  if (!(await verifyRequest(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const language = formData.get("language");
  const file = formData.get("file");

  if (!isCvLanguage(language)) {
    return NextResponse.json({ message: "Invalid CV language." }, { status: 400 });
  }

  if (!(file instanceof File) || file.type !== "application/pdf") {
    return NextResponse.json({ message: "Upload a PDF file." }, { status: 400 });
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(cvFiles[language], fileBuffer);

  return NextResponse.json({ message: "CV uploaded." });
}

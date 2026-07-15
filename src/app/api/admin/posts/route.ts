import { verifyAdminToken } from "@/lib/auth";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const runtime = "nodejs";

type PostPayload = {
  slug?: string;
  title?: string;
  publishedAt?: string;
  summary?: string;
  content?: string;
};

const postsDir = path.join(process.cwd(), "src", "app", "content", "posts");
const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const verifyRequest = async (request: NextRequest) => {
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return false;
  }

  return Boolean(await verifyAdminToken(token));
};

const parseFrontmatter = (fileContent: string) => {
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return {};
  }

  return match[1].trim().split("\n").reduce<Record<string, string>>(
    (metadata, line) => {
      const [key, ...valueParts] = line.split(": ");
      const value = valueParts.join(": ").trim().replace(/^['"](.*)['"]$/, "$1");

      metadata[key.trim()] = value;
      return metadata;
    },
    {},
  );
};

const escapeYamlValue = (value: string) => value.replace(/'/g, "''").trim();

const formatMdxFile = ({ title, publishedAt, summary, content }: Required<Omit<PostPayload, "slug">>) => `---
title: '${escapeYamlValue(title)}'
publishedAt: '${escapeYamlValue(publishedAt)}'
summary: '${escapeYamlValue(summary)}'

---

${content.trim()}
`;

export async function GET(request: NextRequest) {
  if (!(await verifyRequest(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const files = await fs.readdir(postsDir);
  const posts = await Promise.all(
    files
      .filter((file) => path.extname(file) === ".mdx")
      .map(async (file) => {
        const fileContent = await fs.readFile(path.join(postsDir, file), "utf-8");
        const metadata = parseFrontmatter(fileContent);

        return {
          file,
          slug: path.basename(file, ".mdx"),
          metadata,
        };
      }),
  );

  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  if (!(await verifyRequest(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as PostPayload;
  const slug = payload.slug?.trim().toLowerCase();
  const title = payload.title?.trim();
  const publishedAt = payload.publishedAt?.trim();
  const summary = payload.summary?.trim();
  const content = payload.content?.trim();

  if (!slug || !slugRegex.test(slug)) {
    return NextResponse.json(
      { message: "Use a lowercase kebab-case slug, for example my-new-post." },
      { status: 400 },
    );
  }

  if (!title || !publishedAt || !summary || !content) {
    return NextResponse.json(
      { message: "Slug, title, published date, summary, and content are required." },
      { status: 400 },
    );
  }

  const filePath = path.join(postsDir, `${slug}.mdx`);

  try {
    await fs.access(filePath);
    return NextResponse.json({ message: "A post with that slug already exists." }, { status: 409 });
  } catch {
    await fs.writeFile(
      filePath,
      formatMdxFile({ title, publishedAt, summary, content }),
      "utf-8",
    );
  }

  return NextResponse.json({ message: "Post created." }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyRequest(request))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { file } = (await request.json()) as { file?: string };

  if (!file || path.basename(file) !== file || path.extname(file) !== ".mdx") {
    return NextResponse.json({ message: "Invalid post file." }, { status: 400 });
  }

  await fs.unlink(path.join(postsDir, file));

  return NextResponse.json({ message: "Post deleted." });
}

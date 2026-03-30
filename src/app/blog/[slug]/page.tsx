import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { formatDate, getBlogPosts } from "../utils";
import { baseUrl } from "../../sitemap";
import CustomMDX, { slugify } from "@/app/components/CustomMDX";
import TableOfContents, {
  TableOfContentsHeading,
} from "@/app/components/TableOfContents";
import { IoArrowBack } from "react-icons/io5";
import Icon from "@/app/components/common/Icon";

interface BlogParams {
  params: { slug: string };
}

const headingRegex = /^ {0,3}(#{2,3})\s+(.+)$/gm;

const stripCodeBlocks = (content: string) =>
  content.replace(/```[\s\S]*?```/g, "");

const getHeadingsFromContent = (content: string): TableOfContentsHeading[] => {
  const headings: TableOfContentsHeading[] = [];
  const sanitized = stripCodeBlocks(content);
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(sanitized)) !== null) {
    const level = match[1].length === 3 ? 3 : 2;
    const rawTitle = match[2]
      .replace(/[*_`]/g, "")
      .replace(/<[^>]+>/g, "")
      .trim();
    if (!rawTitle) continue;

    headings.push({
      id: slugify(rawTitle),
      title: rawTitle,
      level: level as 2 | 3,
    });
  }

  return headings;
};

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogParams): Metadata | void {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if(!post) return;

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    }
  }
}

export default function Blog({ params }: BlogParams) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) notFound();

  const headings = getHeadingsFromContent(post.content);

  return (
    <section className="px-4 py-12 text-theme-text">
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Tato',
              name: `Tato Portfolio`,
            },
          }),
        }}
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-center gap-12 lg:flex-row">
        <main className="w-full max-w-3xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/blog"
              className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-theme-primary transition hover:text-theme-secondary"
            >
              <Icon icon={IoArrowBack} description="back" />
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight text-theme-primary transition">
              {post.metadata.title}
            </h1>
          </div>
          <p className="mt-3 text-base text-theme-muted">
            {formatDate(post.metadata.publishedAt)}
          </p>
          {post.metadata.summary && (
            <p className="mt-4 text-lg text-theme-text">
              {post.metadata.summary}
            </p>
          )}
          <div className="my-8 h-px w-full bg-theme-border/20" />
          <article className="prose prose-lg max-w-none rounded-3xl bg-transparent text-base lg:prose-xl dark:prose-invert prose-headings:mt-14 prose-headings:font-semibold prose-headings:leading-tight prose-headings:tracking-tight prose-headings:text-theme-primary prose-p:tracking-normal prose-p:text-theme-text prose-p:leading-relaxed prose-a:font-medium prose-a:text-theme-primary prose-a:no-underline prose-blockquote:border-l-4 prose-blockquote:border-theme-primary prose-blockquote:bg-theme-panel/30 prose-blockquote:py-4 prose-blockquote:pl-6 prose-blockquote:text-lg prose-blockquote:text-theme-text prose-blockquote:italic prose-code:rounded-md prose-code:bg-theme-code prose-code:px-2 prose-code:py-1 prose-code:text-theme-codeText prose-pre:rounded-2xl prose-pre:border prose-pre:border-theme-border/20 prose-pre:bg-theme-code prose-pre:p-5 prose-pre:text-sm prose-pre:leading-relaxed prose-pre:text-theme-contrast prose-pre:shadow-2xl prose-ul:my-6 prose-ol:my-6 prose-li:my-2 prose-img:rounded-2xl prose-hr:border-theme-border/20">
            <CustomMDX source={post.content} />
          </article>
        </main>
        {headings.length > 0 && (
          <aside className="hidden w-64 self-start lg:sticky lg:top-24 lg:block">
            <TableOfContents headings={headings} />
          </aside>
        )}
      </div>
    </section>
  );
}

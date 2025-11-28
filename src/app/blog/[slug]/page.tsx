import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from 'next/script';
import { formatDate, getBlogPosts } from "../utils";
import { baseUrl } from '../../sitemap';
import CustomMDX from "@/app/components/CustomMDX";

interface BlogParams { params: { slug: string } };

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

export default function Blog({params}: BlogParams) {
  const post = getBlogPosts()
                .find((post)=> post.slug === params.slug);

  if (!post) notFound();

  return (
    <section className="px-4">
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
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm dark:text-neutral-300">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose dark:prose-invert max-w-none">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}

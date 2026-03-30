import Link from "next/link";
import { formatDate, getBlogPosts } from "../blog/utils";

const Posts = () => {
  let allBlogs = getBlogPosts();

  return (
    <>
      {allBlogs.length > 0 ? (
        <div>
          {allBlogs
            .sort((a, b) => {
              if (
                new Date(a.metadata.publishedAt) >
                new Date(b.metadata.publishedAt)
              ) {
                return -1;
              }
              return 1;
            })
            .map((post) => (
              <Link
                key={post.slug}
                className="mb-4 flex flex-col space-y-1 rounded-xl px-2 py-2 transition hover:bg-theme-panel/40"
                href={`/blog/${post.slug}`}
              >
                <div className="flex w-full flex-col space-x-0 md:flex-row md:space-x-2">
                  <p className="w-[150px] tabular-nums text-theme-accent">
                    {formatDate(post.metadata.publishedAt, false)}
                  </p>
                  <p className="tracking-tight text-theme-text">
                    {post.metadata.title}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <div className="mt-6 flex items-center justify-center rounded-lg border border-dashed border-theme-border/40 bg-theme-panel/40 p-4">
          <p className="text-lg text-theme-text">
            Sorry, there are no blogs available yet.{" "}
            <span className="font-semibold text-theme-muted">
              Check back soon!
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default Posts;

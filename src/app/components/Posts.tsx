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
                className="flex flex-col space-y-1 mb-4"
                href={`/blog/${post.slug}`}
              >
                <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                  <p className="dark:text-[#9ece6a] w-[150px] tabular-nums">
                    {formatDate(post.metadata.publishedAt, false)}
                  </p>
                  <p className="dark:text-gray-300 tracking-tight">
                    {post.metadata.title}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-6 p-4 border-sky-50 border-dashed rounded-lg bg-gray-100 dark:bg-gray-800">
          <p className="text-lg text-neutral-800 dark:text-neutral-200">
            Sorry, there are no blogs available yet.{" "}
            <span className="text-grey-500 font-semibold">
              Check back soon!
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default Posts;

import { expect, test } from "@jest/globals";

import { getBlogPosts } from "@/app/blog/utils";

test("getBlogPosts reads mdx files and returns parsed content", () => {
  const posts = getBlogPosts();

  expect(Array.isArray(posts)).toBe(true);
  expect(posts.length).toBeGreaterThan(0);

  const designPatternsPost = posts.find((post) => post.slug === "designPatterns");
  expect(designPatternsPost).toBeDefined();

  expect(designPatternsPost?.metadata).toMatchObject({
    title: "Design Patterns in JavaScript and TypeScript: A Practical Guide",
    publishedAt: "2025-01-29",
  });

  expect(designPatternsPost?.metadata.summary).toContain("design patterns");
  expect(designPatternsPost?.content).toContain("# Design Patterns in JavaScript and TypeScript");
});

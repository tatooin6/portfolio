import React from "react";
import Posts from "../components/Posts";

const Page = () => {
  return (
    <section className="px-2">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter dark:text-gray-200">
        Blog Entries
      </h1>
      <Posts />
    </section>
  );
};

export default Page;

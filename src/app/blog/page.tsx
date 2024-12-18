import React from "react";
import Posts from "../components/Posts";

const Page = () => {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Tato's Portfolio
      </h1>
      <Posts />
    </section>
  );
};

export default Page;

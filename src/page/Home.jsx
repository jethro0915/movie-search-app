import React from "react";

const Home = () => {
  return (
    <section className="flex flex-col pt-20 items-center w-screen h-screen">
      <h1>Home</h1>
      <input
        type="search"
        id="moviesearch"
        name="moviesearch"
        className="rounded-xl w-[500px] border self-center"
      />
    </section>
  );
};

export default Home;

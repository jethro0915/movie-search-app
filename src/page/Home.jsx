import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "@/constants/movieApiKey";
import TrendingCard from "@/components/cards/TrendingCard";
import MovieSearchbar from "@/components/search/MovieSearchbar";
import FlameIcon from "../assets/flame.svg";

const Home = () => {
  const [trendings, setTrendings] = useState([]);

  useEffect(() => {
    const getTrendings = async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/week",
        {
          params: { api_key: API_KEY },
          headers: {
            accept: "application/json",
          },
        }
      );
      setTrendings(res.data.results);
    };
    getTrendings();
  }, []);

  console.log(trendings);

  return (
    <section className="py-20 space-y-10 w-full">
      <MovieSearchbar />
      <h1 className="flex items-center text-5xl dark:text-white mx-5 py-3 border-b-4 border-red-500 dark:border-red-800">
        People Watch This Week
        <FlameIcon width={55} height={55} />
      </h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]  justify-items-center gap-5">
        {trendings &&
          trendings.map((item) => (
            <TrendingCard
              id={item.id}
              title={item.title}
              postImg={item.poster_path}
              rate={item.vote_average}
              key={item.id}
              overview={item.overview}
            />
          ))}
      </div>
    </section>
  );
};

export default Home;

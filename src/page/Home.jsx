import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchIcon from "../assets/search.svg";
import { API_KEY } from "@/constants/movieApiKey";
import MovieCard from "@/components/cards/MovieCard";

const Home = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getHomeMovies = async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: API_KEY,
            page: "1",
          },
          headers: {
            accept: "application/json",
          },
        }
      );
      setMovie(res.data.results);
    };
    getHomeMovies();
  }, []);

  return (
    <section className="flex flex-col py-20 items-center h-full">
      <div className="flex w-full max-w-[600px]">
        <Input
          type="text"
          placeholder="Search your movie..."
          onChange={() => {}}
          className="rounded-l-full min-h-[50px] shadow-none outline-none dark:text-slate-50 focus-visible:border-red-400"
        />
        <Button
          onClick={() => {}}
          className="rounded-r-full min-h-[50px]"
          variant="destructive"
        >
          <SearchIcon fill="white" />
        </Button>
      </div>
      <div className="flex gap-[50px] flex-wrap justify-center px-3 pt-[50px]">
        {movie.map((item) => (
          <MovieCard
            id={item.id}
            title={item.title}
            postImg={item.poster_path}
            rate={item.vote_average}
            key={item.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;

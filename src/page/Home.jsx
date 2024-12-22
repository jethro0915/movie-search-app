import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "@/constants/movieApiKey";
import TrendingCard from "@/components/cards/TrendingCard";
import MovieSearchbar from "@/components/search/MovieSearchbar";
import FlameIcon from "../assets/flame.svg";
import { TailSpin } from "react-loader-spinner";
import { Helmet } from "react-helmet-async";
import TmdbIcon from "../assets/tmdb.svg";

const Home = () => {
  const [trendings, setTrendings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendings = async () => {
      try {
        setLoading(true);
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
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    getTrendings();
  }, []);

  console.log(error);

  if (error) {
    return (
      <h1 className="my-20 text-2xl font-semibold">
        Sorry! There are some problems on this page. Please try it later.
      </h1>
    );
  }

  return (
    <section className="py-20 space-y-10 w-full">
      <Helmet>
        <title>Home - MovieWarehouse</title>
      </Helmet>
      <MovieSearchbar />
      <h1 className="flex items-center text-5xl max-md:text-3xl dark:text-white mx-5 py-3 border-b-4 border-red-500 dark:border-red-800">
        People Watch This Week
        <span>
          <FlameIcon className="w-[55px] h-[55px] max-md:w-[40px] max-md:h-[40px]" />
        </span>
      </h1>
      {loading ? (
        <div className="flex w-full justify-center py-10">
          <TailSpin width="100" height="100" radius="1" color="red" />
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]  justify-items-center gap-5">
          {trendings.map((item) => (
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
      )}
      <div className="flex flex-col items-center gap-2">
        <TmdbIcon className="w-[100px] h-[80px]" />
        <p className="text-slate-300 dark:text-slate-600 text-[12px]">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
    </section>
  );
};

export default Home;

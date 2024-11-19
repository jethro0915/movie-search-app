import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { API_KEY } from "@/constants/movieApiKey";
import MovieCard from "@/components/cards/MovieCard";
import MovieSearchbar from "@/components/search/MovieSearchbar";

const Home = () => {
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortFilter = searchParams.get("sortBy");
  const genreFilter = searchParams.get("genre");

  useEffect(() => {
    const getAllGenres = async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          params: { api_key: API_KEY },
          headers: {
            accept: "application/json",
          },
        }
      );

      setGenres(res.data.genres);
    };
    getAllGenres();
  }, []);

  useEffect(() => {
    const getHomeMovies = async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: API_KEY,
            page: "1",
            sort_by: sortFilter,
            with_genres: genreFilter,
          },
          headers: {
            accept: "application/json",
          },
        }
      );
      setMovie(res.data.results);
    };
    getHomeMovies();
  }, [sortFilter, genreFilter]);

  const selectSearchParams = (value, name) => {
    setSearchParams((prevParams) => {
      prevParams.set(name, value);
      return prevParams;
    });
  };

  return (
    <section className="flex flex-col py-20 items-center h-full">
      <MovieSearchbar />
      <div className="flex gap-3 flex-wrap">
        <Select
          defaultValue={sortFilter || ""}
          onValueChange={(val) => selectSearchParams(val, "sortBy")}
        >
          <SelectTrigger className="w-[250px] focus:ring-0 max-sm:w-full dark:text-slate-50">
            <SelectValue placeholder="Select a sorting filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity.desc">
              Popularity By Descending
            </SelectItem>
            <SelectItem value="popularity.asc">
              Popularity By Ascending
            </SelectItem>
            <SelectItem value="vote_average.desc">
              Average Vote By Descending
            </SelectItem>
            <SelectItem value="vote_average.asc">
              Average Vote By Ascending
            </SelectItem>
          </SelectContent>
        </Select>
        <Select
          defaultValue={genreFilter || ""}
          onValueChange={(val) => selectSearchParams(parseInt(val), "genre")}
        >
          <SelectTrigger className="w-[250px] focus:ring-0 max-sm:w-full dark:text-slate-50">
            <SelectValue placeholder="Select a genre filter" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((item) => (
              <SelectItem value={item.id.toString()} key={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-[50px] flex-wrap justify-center px-3 pt-[50px]">
        {movie.map((item) => (
          <MovieCard
            id={item.id}
            title={item.title}
            postImg={item.poster_path}
            rate={item.vote_average}
            key={item.id}
            linkstate={searchParams.toString()}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;

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
import PageNavigation from "@/components/shared/PageNavigation";

const Movies = () => {
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortFilter = searchParams.get("sortBy");
  const genreFilter = searchParams.get("genre");
  const pageFilter = searchParams.get("page");

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
            page: pageFilter,
            sort_by: sortFilter,
            with_genres: genreFilter,
          },
          headers: {
            accept: "application/json",
          },
        }
      );
      setMovie(res.data);
    };
    getHomeMovies();
  }, [sortFilter, genreFilter, pageFilter]);

  const selectSearchParams = (value, name) => {
    setSearchParams((prevParams) => {
      prevParams.set(name, value);
      if (prevParams.has("page")) {
        prevParams.delete("page");
      }
      return prevParams;
    });
  };

  console.log(movie);

  return (
    <section className="flex flex-col py-20 w-full px-10 gap-5">
      <h1 className="text-5xl dark:text-white max-sm:self-center">
        All Movies
      </h1>
      <div className="flex flex-wrap justify-between items-center gap-5 max-sm:justify-center">
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
        {movie.total_pages && (
          <PageNavigation
            totalPage={movie.total_pages}
            searchParams={searchParams}
            onSearchParams={setSearchParams}
            otherClasses={"w-fit mx-0"}
          />
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 justify-items-center my-2 py-[50px] border-y-2 border-y-slate-200 dark:border-y-slate-600">
        {movie.results &&
          movie.results.map((item) => (
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
      <div className="flex flex-wrap justify-between items-center max-sm:justify-center gap-3">
        <p className="dark:text-white max-sm:hidden">{`${movie.total_results} ${
          movie.total_results > 1 ? "results are found" : "result is found"
        }, total ${movie.total_pages} ${
          movie.total_pages > 1 ? "pages" : "page"
        }`}</p>
        {movie.total_pages && (
          <PageNavigation
            totalPage={movie.total_pages}
            searchParams={searchParams}
            onSearchParams={setSearchParams}
            otherClasses={"w-fit mx-0"}
          />
        )}
      </div>
    </section>
  );
};

export default Movies;

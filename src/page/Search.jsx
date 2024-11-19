import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { API_KEY } from "@/constants/movieApiKey";
import MovieCard from "@/components/cards/MovieCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchIcon from "../assets/search.svg";
import PageNavigation from "@/components/shared/PageNavigation";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const page = searchParams.get("page");
  const [search, setSearch] = useState([]);
  const [searchInput, setSearchInput] = useState(query || "");

  useEffect(() => {
    const getSearchMovie = async () => {
      const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: { api_key: API_KEY, query: query, page: page },
        headers: {
          accept: "application/json",
        },
      });
      setSearch(res.data);
      //console.log(res.data);
    };
    getSearchMovie();
  }, [query, page]);

  const handleSearch = () => {
    setSearchParams((prevParams) => {
      prevParams.set("query", searchInput);
      if (prevParams.has("page")) {
        prevParams.delete("page");
      }
      return prevParams;
    });
  };

  return (
    <div className="pt-[60px]  mx-auto flex flex-col gap-5 max-w-[850px] w-full">
      <div className="space-y-5">
        <h1 className="text-5xl dark:text-white">Search</h1>
        <div className="flex max-w-[250px] w-full">
          <Input
            placeholder="Search your movie..."
            className="rounded-r-none shadow-none outline-none dark:text-slate-50 focus-visible:border-red-400"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button
            onClick={handleSearch}
            className="p-2 rounded-l-none"
            variant="destructive"
          >
            <SearchIcon fill="white" />
          </Button>
        </div>
        {search.total_pages && (
          <PageNavigation
            totalPage={search.total_pages}
            searchParams={searchParams}
            onSearchParams={setSearchParams}
          />
        )}
      </div>

      <div className="space-y-5 border-y-2 border-y-slate-200 dark:border-y-slate-600 py-5">
        <h3>{`${search.total_results} ${
          search.total_results > 1 ? "results are found" : "result is found"
        }, total ${search.total_pages} ${
          search.total_pages > 1 ? "pages" : "page"
        }`}</h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] justify-items-center gap-5">
          {search.results &&
            search.results.map((item) => (
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
      </div>
      {search.total_pages && (
        <PageNavigation
          totalPage={search.total_pages}
          searchParams={searchParams}
          onSearchParams={setSearchParams}
        />
      )}
    </div>
  );
};

export default Search;

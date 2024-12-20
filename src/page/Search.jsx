import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { API_KEY } from "@/constants/movieApiKey";
import MovieCard from "@/components/cards/MovieCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchIcon from "../assets/search.svg";
import PageNavigation from "@/components/shared/PageNavigation";
import { TailSpin } from "react-loader-spinner";
import { Helmet } from "react-helmet-async";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const page = searchParams.get("page");
  const [search, setSearch] = useState([]);
  const [searchInput, setSearchInput] = useState(query || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSearchMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: { api_key: API_KEY, query: query, page: page },
            headers: {
              accept: "application/json",
            },
          }
        );
        setSearch(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
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

  if (error) {
    return (
      <h1 className="my-20 text-2xl font-semibold">
        Sorry! There are some problems on this page. Please try it later.
      </h1>
    );
  }

  return (
    <div className="pt-[60px]  mx-auto flex flex-col gap-5 max-w-[850px] w-full">
      <Helmet>
        <title>Search</title>
      </Helmet>
      <section className="space-y-5 mt-5">
        <h1 className="text-5xl dark:text-white px-5 border-l-4 border-red-600 dark:border-red-800">
          Search
        </h1>
        <div className="flex max-w-[250px] w-full">
          <Input
            placeholder="Search your movie..."
            className="rounded-r-none shadow-none outline-none dark:text-slate-50 dark:bg-slate-800 focus-visible:border-red-400"
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
            otherClasses={"justify-start"}
          />
        )}
      </section>

      {loading ? (
        <div className="flex w-full justify-center py-10">
          <TailSpin width="100" height="100" radius="1" color="red" />
        </div>
      ) : (
        <section className="space-y-5 border-y-2 border-y-slate-200 dark:border-y-slate-600 py-5">
          <h3 className="dark:text-white">{`${search.total_results} ${
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
        </section>
      )}
      {search.total_pages && (
        <PageNavigation
          totalPage={search.total_pages}
          searchParams={searchParams}
          onSearchParams={setSearchParams}
          otherClasses={"justify-start"}
        />
      )}
    </div>
  );
};

export default Search;

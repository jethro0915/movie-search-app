import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "@/constants/movieApiKey";
import MovieInfo from "@/components/movie/MovieInfo";
import { ChevronLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [error, setError] = useState(null);
  const { state } = useLocation();

  console.log(movieInfo);

  useEffect(() => {
    const getMovieById = async (id) => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
            },
            headers: {
              accept: "application/json",
            },
          }
        );
        setMovieInfo(res.data);
      } catch (err) {
        setError(err);
      }
    };
    getMovieById(movieId);
  }, [movieId]);

  if (error) {
    return (
      <div className="my-20 flex flex-col gap-1">
        <p className="text-2xl font-semibold">
          Sorry! There are some problems on this page. Please try it later.
        </p>
        <Link
          to={state === null ? "/" : `${state.url}?${state?.searchQuery || ""}`}
          className="bg-red-600 text-slate-50 hover:bg-red-400 px-4 py-2 rounded-lg mt-5 w-fit"
        >
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Helmet>
        <title>{movieInfo.title}</title>
      </Helmet>
      <div className="mt-5 container flex flex-col items-center mx-auto">
        <Link
          to={state === null ? "/" : `${state.url}?${state?.searchQuery || ""}`}
          className="mr-auto mb-5"
        >
          <ChevronLeft className="w-[50px] h-[50px] stroke-red-500" />
        </Link>
        <MovieInfo movieData={movieInfo} />
      </div>
    </div>
  );
};

export default MovieDetail;

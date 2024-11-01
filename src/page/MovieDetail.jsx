import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "@/constants/movieApiKey";
import MovieInfo from "@/components/movie/MovieInfo";
import BackIcon from "../assets/chevronleft.svg";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const { state } = useLocation();

  useEffect(() => {
    const getMovieById = async (id) => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: API_KEY,
        },
        headers: {
          accept: "application/json",
        },
      });
      setMovieInfo(res.data);
    };
    getMovieById(movieId);
  }, [movieId]);

  console.log(movieInfo);
  console.log(state);

  return (
    <div className="pt-20">
      <section className="mt-5 container flex flex-col items-center mx-auto">
        <Link to={`${state.url}?${state.searchQuery}`} className="mr-auto mb-5">
          <BackIcon fill="red" width="25px" height="25px" className="ml-5" />
        </Link>
        <MovieInfo movieData={movieInfo} />
      </section>
    </div>
  );
};

export default MovieDetail;

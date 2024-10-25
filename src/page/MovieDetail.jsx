import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "@/constants/movieApiKey";
import MovieInfo from "@/components/movie/MovieInfo";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState({});

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

  return (
    <section className="pt-20 container flex flex-col items-center mx-auto">
      <MovieInfo movieData={movieInfo} />
    </section>
  );
};

export default MovieDetail;

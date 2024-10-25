import React from "react";
import RatingIcon from "../../assets/rating.svg";
import PopularityIcon from "../../assets/popularity.svg";
import { getDataValue } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

const MovieInfo = ({ movieData }) => {
  const { mode } = useTheme();
  return (
    <div>
      <div className="px-4 border-l-4 border-l-red-500">
        <h1 className="text-4xl font-semibold text-black dark:text-white">
          {movieData.title}
        </h1>
        <h3 className="text-xl text-slate-400 font-medium ">
          {movieData.original_title}
        </h3>
      </div>

      <div className="flex max-sm:flex-col max-sm:items-center text-black dark:text-white">
        <div className="space-y-8 py-4 pr-4 border-r max-w-[320px] w-full max-sm:border-none">
          <img
            src={`https://image.tmdb.org/t/p/w200${movieData.poster_path}`}
            alt={movieData.title}
            width="300px"
          />
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Production Company: </span>
              {getDataValue(movieData.production_companies)}
            </p>
            <p>
              <span className="font-semibold">Production Countries: </span>
              {getDataValue(movieData.production_countries)}
            </p>
            <p>
              <span className="font-semibold">Release Date: </span>
              {movieData.release_date}
            </p>
            <p>
              <span className="font-semibold">Genres: </span>
              {getDataValue(movieData.genres)}
            </p>
            <p>
              <span className="font-semibold">Duration: </span>
              {`${movieData.runtime} mins`}
            </p>
            <p>
              <span className="font-semibold">Original Language: </span>
              {movieData.original_language}
            </p>
            <p>
              <span className="font-semibold">Spoken Languages: </span>
              {getDataValue(movieData.spoken_languages)}
            </p>
          </div>
        </div>
        <div className="space-y-24 p-10 max-w-[500px] w-full">
          <div className="flex gap-14 max-lg:flex-col">
            <div className="flex flex-col items-center">
              <span className="inline-flex text-4xl font-semibold items-center gap-2">
                <RatingIcon
                  fill={mode === "light" ? "black" : "white"}
                  width={40}
                  height={40}
                />
                Ratings
              </span>

              <p className="text-3xl mt-8">{movieData.vote_average}</p>
              <p className="text-sm">{`${movieData.vote_count} users`}</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="inline-flex text-4xl font-semibold items-center gap-2">
                <PopularityIcon
                  fill={mode === "light" ? "black" : "white"}
                  width={40}
                  height={40}
                />
                Popularity
              </span>
              <p className="text-3xl mt-8">{movieData.popularity}</p>
            </div>
          </div>
          <div className="space-y-8">
            <h1 className="text-3xl font-medium pl-4 border-l-4 border-l-red-500">
              Homepage
            </h1>
            <p className="ml-5 text-lg">{movieData.homepage}</p>
          </div>
          <div className="space-y-8">
            <h1 className="text-3xl font-medium pl-4 border-l-4 border-l-red-500">
              Overview
            </h1>
            <p className="ml-5 text-lg">{movieData.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;

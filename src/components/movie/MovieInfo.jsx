/* eslint-disable */

import React, { useState } from "react";
import RatingIcon from "../../assets/rating.svg";
import PopularityIcon from "../../assets/popularity.svg";
import {
  getArrayValue,
  getStringValue,
  findMovieInCollections,
  getDocIdFromCollections,
} from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { db } from "@/database/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";

const MovieInfo = ({ movieData }) => {
  const { mode } = useTheme();
  const { currentUser, userCollections, deleteMovieFromCollections } =
    useAuth();

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isCollected = findMovieInCollections(movieData.id, userCollections);

  console.log(movieData);

  const addMovieToCollections = async () => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "movieCollections"), {
        uid: currentUser.uid,
        movieData: {
          movieId: movieData.id,
          title: movieData.title,
          genres: movieData.genres,
          overview: movieData.overview,
          postImg: movieData.poster_path,
          rating: movieData.vote_average,
        },
        createdAt: serverTimestamp(),
      });
      setLoading(false);
      toast({
        title: "Movie is added to your collections sucessfully.",
        variant: "successful",
      });
    } catch (err) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please retry.",
      });
    }
  };

  const handleClick = async () => {
    if (currentUser) {
      await addMovieToCollections();
    } else {
      toast({ title: "You need to sign in first", variant: "destructive" });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <section className="px-4 border-l-4 border-l-red-500">
        <h1 className="text-4xl font-semibold text-black dark:text-white">
          {movieData.title}
        </h1>
        <h3 className="text-xl text-slate-400 font-medium ">
          {movieData.original_title}
        </h3>
      </section>
      {isCollected ? (
        <Button
          onClick={() =>
            deleteMovieFromCollections(
              getDocIdFromCollections(movieData.id, userCollections)
            )
          }
          className="w-fit bg-red-500 dark:bg-red-800 dark:text-white gap-2 hover:bg-red-400 dark:hover:bg-red-700"
        >
          <Trash2 width={20} height={20} />
          Remove from Collections
        </Button>
      ) : (
        <Button
          onClick={handleClick}
          disabled={loading === true}
          className="w-fit bg-red-500 dark:bg-red-800 dark:text-white gap-2 hover:bg-red-400 dark:hover:bg-red-700"
        >
          {loading ? (
            <TailSpin width="20" height="20" radius="1" color="white" />
          ) : (
            <Heart width={20} height={20} />
          )}
          Add to Collections
        </Button>
      )}
      <div className="flex max-sm:flex-col max-sm:items-center text-black dark:text-white">
        <div className="space-y-8 py-4 pr-4 border-r min-w-[250px] max-w-[320px] w-full max-sm:border-none ">
          {movieData.poster_path === null ? (
            <div className="flex w-[300px] h-[450px] bg-slate-400 justify-center items-center font-semibold text-3xl max-md:w-[240px] max-md:h-[400px] max-sm:w-[300px] max-sm:h-[450px]">
              No Image
            </div>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w200${movieData.poster_path}`}
              alt={movieData.title}
              className="w-[300px] h-[450px] flex-shrink-0 max-md:w-[240px] max-md:h-[400px] max-sm:w-[300px] max-sm:h-[400px]"
            />
          )}

          <div className="space-y-2">
            <p>
              <span className="font-semibold">Production Company: </span>
              {getArrayValue(movieData.production_companies)}
            </p>
            <p>
              <span className="font-semibold">Production Countries: </span>
              {getArrayValue(movieData.production_countries)}
            </p>
            <p>
              <span className="font-semibold">Release Date: </span>
              {getStringValue(movieData.release_date)}
            </p>
            <p>
              <span className="font-semibold">Genres: </span>
              {getArrayValue(movieData.genres)}
            </p>
            <p>
              <span className="font-semibold">Duration: </span>
              {`${getStringValue(movieData.runtime)} ${
                getStringValue(movieData.runtime) !== "N/A" && "mins"
              }`}
            </p>
            <p>
              <span className="font-semibold">Original Language: </span>
              {getStringValue(movieData.original_language)}
            </p>
            <p>
              <span className="font-semibold">Spoken Languages: </span>
              {getArrayValue(movieData.spoken_languages)}
            </p>
          </div>
        </div>
        <div className="space-y-24 p-10 max-w-[550px] w-full max-lg:max-w-[500px]">
          <div className="flex flex-wrap max-lg:gap-3 max-sm:justify-center lg:gap-6">
            <div className="flex flex-col items-center py-4">
              <span className="inline-flex text-4xl font-semibold items-center gap-2">
                <RatingIcon
                  fill={mode === "light" ? "black" : "white"}
                  width={40}
                  height={40}
                />
                Ratings
              </span>

              <p className="text-3xl mt-8">
                {getStringValue(movieData.vote_average)}
              </p>
              <p className="text-sm">{`${getStringValue(
                movieData.vote_count
              )} ${
                getStringValue(movieData.vote_count) !== "N/A" ? "users" : ""
              }`}</p>
            </div>
            <div className="flex flex-col items-center py-4">
              <span className="inline-flex text-4xl font-semibold items-center gap-2">
                <PopularityIcon
                  fill={mode === "light" ? "black" : "white"}
                  width={40}
                  height={40}
                />
                Popularity
              </span>
              <p className="text-3xl mt-8">
                {getStringValue(movieData.popularity)}
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <h1 className="text-3xl font-medium pl-4 border-l-4 border-l-red-500">
              Homepage
            </h1>
            <p className="ml-5 text-lg break-all">
              {getStringValue(movieData.homepage)}
            </p>
          </div>
          <div className="space-y-8">
            <h1 className="text-3xl font-medium pl-4 border-l-4 border-l-red-500">
              Overview
            </h1>
            <p className="ml-5 text-lg">{getStringValue(movieData.overview)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;

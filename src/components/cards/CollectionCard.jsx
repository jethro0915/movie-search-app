/* eslint-disable */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const CollectionCard = ({ movieData, docId }) => {
  const { genres, movieId, overview, postImg, title, rating } = movieData;
  const { deleteMovieFromCollections } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className="flex justify-between items-center gap-5 border-b border-slate-200 group">
      <Link
        to={`/movies/${movieId}`}
        className="flex gap-6 px-2 py-6 dark:text-white w-full max-w-[800px]"
        state={{ url: pathname }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w185${postImg}`}
          alt={title}
          className="h-[180px] w-[150px]"
        />
        <div className="flex flex-col justify-between p-2">
          <div className="space-y-3">
            <h3 className="font-semibold text-xl line-clamp-1">{title}</h3>
            <p className="font-md text-lg">{`Rating: ${rating}`}</p>
          </div>

          <p className="line-clamp-3">{overview}</p>
        </div>
      </Link>
      <button
        onClick={() => deleteMovieFromCollections(docId)}
        className="hover:bg-red-200 dark:hover:bg-red-400 p-2  rounded-full opacity-0 group-hover:opacity-100"
      >
        <Trash2 width={30} height={30} stroke="red" />
      </button>
    </div>
  );
};

export default CollectionCard;

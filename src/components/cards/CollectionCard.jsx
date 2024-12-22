/* eslint-disable */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";

const CollectionCard = ({ movieData, docId }) => {
  const { genres, movieId, overview, postImg, title, rating } = movieData;
  const { deleteMovieFromCollections } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className="flex justify-between items-center gap-5 border-b border-slate-200 group overflow-y-hidden max-sm:gap-2">
      <Link
        to={`/movies/${movieId}`}
        className="flex justify-between gap-6 px-2 py-6 dark:text-white w-full max-w-[800px] max-sm:gap-1"
        state={{ url: pathname }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w185${postImg}`}
          alt={title}
          className="h-[180px] w-[150px] max-sm:h-[150px] max-sm:w-[100px] flex-shrink"
        />
        <div className="flex flex-col justify-between p-2">
          <div className="space-y-3">
            <h3 className="font-semibold text-xl line-clamp-1 max-sm:text-base">
              {title}
            </h3>
            {genres.length > 0 ? (
              <div className="flex gap-2 items-center flex-wrap max-sm:overflow-x-hidden max-sm:gap-1">
                <p className="font-md text-lg max-sm:hidden">Genres:</p>
                {genres.map((item) => (
                  <Badge
                    key={item.id}
                    className="rounded-lg bg-red-600  dark:bg-red-800 text-white dark:text-white hover:bg-red-600 hover:dark:bg-red-800 overflow-hidden max-sm:text-[8px]"
                  >
                    {item.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="font-md text-lg max-sm:text-sm">{`Genres: N/A`}</p>
            )}
          </div>

          <p className="line-clamp-3 mt-2 max-sm:text-xs">{overview}</p>
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

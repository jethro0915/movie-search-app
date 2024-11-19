import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { getStringValue } from "@/lib/utils";

const MovieCard = ({ id, postImg, title, rate, linkstate }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={`/movies/${id}`}
      className="flex flex-col rounded-lg shadow-md w-[250px]"
      key={id}
      state={{ url: pathname, searchQuery: linkstate }}
    >
      {postImg === null ? (
        <div className="flex w-[250px] h-[375px] bg-slate-400 rounded-t-lg justify-center items-center font-semibold text-3xl">
          No Image
        </div>
      ) : (
        <div className="h-[375px] w-[250px]">
          <img
            src={`https://image.tmdb.org/t/p/w185${postImg}`}
            alt={title}
            className="rounded-t-lg h-[375px] w-[250px]"
          />
        </div>
      )}
      <div className="flex flex-col gap-3 p-3 dark:text-white">
        <h1 className="font-bold text-xl line-clamp-1">{title}</h1>
        <div className="flex justify-between">
          <p className="text-lg font-medium">
            {`Rating: ${
              getStringValue(rate) === "N/A" ? "N/A" : rate.toFixed(1)
            }${getStringValue(rate) !== "N/A" ? "/10" : ""}`}
          </p>
          <Badge className="text-[10px] rounded-sm px-2 py-1">Read more</Badge>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

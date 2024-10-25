import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const MovieCard = ({ id, postImg, title, rate }) => {
  return (
    <Link
      to={`movies/${id}`}
      className="flex flex-col rounded-lg shadow-md w-[250px]"
      key={id}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${postImg}`}
        alt={title}
        width="250px"
        className="rounded-t-lg"
      />
      <div className="flex flex-col gap-3 p-3 dark:text-white">
        <h1 className="font-bold text-xl line-clamp-1">{title}</h1>
        <div className="flex justify-between">
          <p className="text-lg font-medium">{`Rating: ${rate.toFixed(
            1
          )}/10`}</p>
          <Badge className="text-[10px] rounded-sm px-2 py-1">Read more</Badge>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

import React from "react";
import { Link } from "react-router-dom";
import { getStringValue } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const TrendingCard = ({ id, postImg, title, rate, overview }) => {
  return (
    <Link
      to={`/movies/${id}`}
      className="space-y-2 rounded-lg shadow-md w-[250px] p-3 border h-fit"
      key={id}
    >
      {postImg === null ? (
        <div className="flex w-[250px] h-[375px] bg-slate-400 justify-center items-center font-semibold text-3xl">
          No Image
        </div>
      ) : (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w185${postImg}`}
            alt={title}
            className="h-[375px] w-[250px]"
          />
        </div>
      )}
      <div className="space-y-3 dark:text-white">
        <h3 className="font-bold text-xl ">{title}</h3>
        <p className="text-lg font-bold">
          {`Rating: ${
            getStringValue(rate) === "N/A" ? "N/A" : rate.toFixed(1)
          }${getStringValue(rate) !== "N/A" ? "/10" : ""}`}
        </p>
        <p className="line-clamp-3">{overview}</p>
        <Badge className="text-[10px] rounded-sm px-2 py-1">Read more</Badge>
      </div>
    </Link>
  );
};

export default TrendingCard;

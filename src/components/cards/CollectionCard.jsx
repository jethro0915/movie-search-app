import React from "react";
import { Link } from "react-router-dom";

const CollectionCard = ({ id, postImg, title, rate, overview }) => {
  return (
    <Link
      to="."
      className="flex gap-6 px-2 py-6 dark:text-white w-full max-w-[800px] border-b border-slate-200"
    >
      <img
        src={`https://image.tmdb.org/t/p/w185${postImg}`}
        alt={title}
        className="h-[180px] w-[150px]"
      />
      <div className="flex flex-col justify-between p-2">
        <div className="space-y-3">
          <h3 className="font-semibold text-xl">{title}</h3>
          <p className="font-md text-lg">{`Rating: ${rate}`}</p>
        </div>

        <p className="line-clamp-3">{overview}</p>
      </div>
    </Link>
  );
};

export default CollectionCard;

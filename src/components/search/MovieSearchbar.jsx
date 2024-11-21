import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchIcon from "../../assets/search.svg";

const MovieSearchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  //console.log(search);
  //console.log(searchQuery);

  const handleClick = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div className="flex w-full max-w-[600px] mb-10 mx-auto">
      <Input
        type="text"
        placeholder="Search your movie..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
        className="rounded-l-full min-h-[50px] shadow-none outline-none dark:text-slate-50 focus-visible:border-red-400"
      />
      <Button
        onClick={handleClick}
        className="rounded-r-full min-h-[50px]"
        variant="destructive"
      >
        <SearchIcon fill="white" />
      </Button>
    </div>
  );
};

export default MovieSearchbar;

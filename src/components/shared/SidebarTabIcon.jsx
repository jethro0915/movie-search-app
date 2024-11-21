/* eslint-disable */

import React from "react";
import HomeIcon from "../../../src/assets/home.svg";
import AllMovieIcon from "../../../src/assets/allmovie.svg";
import StarIcon from "../../../src/assets/star.svg";
import RatingIcon from "../../../src/assets/rating.svg";
import PopularityIcon from "../../../src/assets/rating.svg";

const SidebarTabIcon = ({ name, themeMode }) => {
  const iconColor = themeMode === "light" ? "black" : "white";
  if (name === "home") {
    return <HomeIcon fill={iconColor} width={22} height={22} />;
  }
  if (name === "collections") {
    return <StarIcon stroke={iconColor} width={22} height={22} />;
  }
  if (name === "movies") {
    return <AllMovieIcon fill={iconColor} width={22} height={22} />;
  }
  if (name === "rating") {
    return <RatingIcon stroke={iconColor} width={22} height={22} />;
  }
  if (name === "popularity") {
    return <PopularityIcon stroke={iconColor} width={22} height={22} />;
  }
};

export default SidebarTabIcon;

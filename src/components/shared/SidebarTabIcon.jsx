/* eslint-disable */

import React from "react";
import HomeIcon from "../../../src/assets/home.svg";
import HistoryIcon from "../../../src/assets/clock.svg";
import StarIcon from "../../../src/assets/star.svg";

const SidebarTabIcon = ({ name, themeMode }) => {
  const iconColor = themeMode === "light" ? "black" : "white";
  if (name === "home") {
    return <HomeIcon fill={iconColor} width={22} height={22} />;
  }
  if (name === "collections") {
    return <StarIcon stroke={iconColor} width={22} height={22} />;
  }
  if (name === "history") {
    return <HistoryIcon stroke={iconColor} width={22} height={22} />;
  }
};

export default SidebarTabIcon;

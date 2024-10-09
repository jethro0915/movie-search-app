import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../shared/LeftSidebar";
import Navbar from "../shared/Navbar";

const PageLayout = () => {
  return (
    <main>
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <Outlet />
      </div>
    </main>
  );
};

export default PageLayout;

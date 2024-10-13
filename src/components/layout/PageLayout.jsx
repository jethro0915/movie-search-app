import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../shared/LeftSidebar";
import Navbar from "../shared/Navbar";

const PageLayout = () => {
  return (
    <main className="bg-slate-50 dark:bg-black">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <Outlet />
      </div>
    </main>
  );
};

export default PageLayout;

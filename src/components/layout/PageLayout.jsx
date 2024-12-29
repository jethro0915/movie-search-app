import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../shared/LeftSidebar";
import Navbar from "../shared/Navbar";

const PageLayout = () => {
  return (
    <main className="bg-slate-50 dark:bg-slate-900 relative min-h-screen duration-300">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex flex-col flex-wrap ml-auto w-[90%] max-sm:w-full h-auto p-4 overflow-auto">
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default PageLayout;

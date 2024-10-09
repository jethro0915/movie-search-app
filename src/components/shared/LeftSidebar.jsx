import React from "react";
import SidebarTabIcon from "./SidebarTabIcon";
import { NavLink } from "react-router-dom";
import SunIcon from "../../../src/assets/sun.svg";
import { sidebarLinks } from "@/constants";

const LeftSidebar = () => {
  return (
    <section className="flex flex-col sticky top-0 left-0 p-4 pt-[90px] shadow-md h-screen border-r lg:w-[280px] max-sm:hidden overflow-y-auto custom-scrollbar">
      <nav className="flex flex-1 flex-col gap-3 ">
        {sidebarLinks.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) =>
                [
                  "inline-flex gap-3 p-3 text-black  rounded-md",
                  isActive
                    ? "bg-red-300 hover:bg-red-300"
                    : "bg-white hover:bg-slate-100",
                ].join(" ")
              }
            >
              <SidebarTabIcon name={item.name} themeMode="light" />
              <p className="capitalize font-semibold max-lg:hidden">
                {item.name}
              </p>
            </NavLink>
          );
        })}
        <button
          onClick={() => {}}
          className="inline-flex gap-3 p-3 text-black hover:bg-slate-100 rounded-md"
        >
          <SunIcon fill={`black`} width={22} height={22} />
          <p className="capitalize font-semibold max-lg:hidden">Theme</p>
        </button>
      </nav>
    </section>
  );
};

export default LeftSidebar;

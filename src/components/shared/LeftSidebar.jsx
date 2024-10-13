import React from "react";
import SidebarTabIcon from "./SidebarTabIcon";
import { NavLink } from "react-router-dom";
import SunIcon from "../../../src/assets/sun.svg";
import MoonIcon from "../../../src/assets/moon.svg";
import { sidebarLinks } from "@/constants";
import { useTheme } from "@/hooks/useTheme";

const LeftSidebar = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <section className="bg-white flex flex-col sticky top-0 left-0 p-4 pt-[90px] shadow-md h-screen border-r border-slate-100 lg:w-[280px] max-sm:hidden overflow-y-auto custom-scrollbar dark:bg-slate-900 dark:shadow-none dark:border-gray-800">
      <nav className="flex flex-1 flex-col gap-3 ">
        {sidebarLinks.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) =>
                [
                  "inline-flex gap-3 p-3 text-black  rounded-md  dark:text-white",
                  isActive
                    ? "bg-red-300 hover:bg-red-300"
                    : "hover:bg-slate-100",
                ].join(" ")
              }
            >
              <SidebarTabIcon name={item.name} themeMode={mode} />
              <p className="capitalize font-semibold max-lg:hidden">
                {item.name}
              </p>
            </NavLink>
          );
        })}
        <button
          onClick={toggleTheme}
          className="bg-white inline-flex gap-3 p-3 text-black hover:bg-slate-100 rounded-md dark:bg-slate-900 dark:text-white"
        >
          {mode === "light" ? (
            <SunIcon fill={`black`} width={22} height={22} />
          ) : (
            <MoonIcon fill={`white`} width={22} height={22} />
          )}
          <p className="capitalize font-semibold max-lg:hidden">{`Theme: ${mode}`}</p>
        </button>
      </nav>
    </section>
  );
};

export default LeftSidebar;

import React from "react";
import { sidebarLinks } from "@/constants";
import SidebarTabIcon from "./SidebarTabIcon";
import { NavLink } from "react-router-dom";
import SunIcon from "../../../src/assets/sun.svg";
import MoonIcon from "../../../src/assets/moon.svg";
import MenuIcon from "../../../src/assets/hamburger.svg";
import { useTheme } from "@/hooks/useTheme";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { mode, toggleTheme } = useTheme();
  return (
    <header className="flex p-3 fixed bg-white shadow-md w-full z-10 dark:bg-slate-900">
      <div className="flex gap-2 items-baseline max-sm:hidden">
        <img src="/assets/movie.svg" width={19} height={19} />
        <h1 className="font-bold text-2xl tracking-tighter text-black dark:text-white">
          MovieWarehouse
        </h1>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon
            fill={mode === "light" ? "black" : "white"}
            width={32}
            height={32}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-white dark:bg-slate-900 dark:text-white border-none"
        >
          <SheetHeader>
            <SheetTitle>
              <img src="/assets/movie.svg" width={33} height={33} />
            </SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <nav className="flex flex-1 flex-col gap-3 mt-10">
            <SheetClose asChild>
              <div className="flex flex-col gap-3">
                {sidebarLinks.map((item, index) => {
                  return (
                    <NavLink
                      key={index}
                      to={item.link}
                      className={({ isActive }) =>
                        [
                          "inline-flex gap-3 p-3 text-black  rounded-md w-[200px] dark:text-white",
                          isActive
                            ? "bg-red-300 hover:bg-red-300"
                            : " hover:bg-slate-100 dark:hover:bg-slate-700",
                        ].join(" ")
                      }
                    >
                      <SidebarTabIcon name={item.name} themeMode={mode} />
                      <p className="capitalize font-semibold">{item.name}</p>
                    </NavLink>
                  );
                })}
              </div>
            </SheetClose>
            <button
              onClick={toggleTheme}
              className="bg-white inline-flex gap-3 p-3 text-black hover:bg-slate-100 rounded-md outline-none w-[200px] dark:bg-slate-900 dark:text-white dark:hover:bg-slate-700"
            >
              {mode === "light" ? (
                <SunIcon fill={`black`} width={22} height={22} />
              ) : (
                <MoonIcon fill={`white`} width={22} height={22} />
              )}
              <p className="capitalize font-semibold">{`Theme: ${mode}`}</p>
            </button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;

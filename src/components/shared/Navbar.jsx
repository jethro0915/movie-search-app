import React from "react";
import { sidebarLinks } from "@/constants";
import SidebarTabIcon from "./SidebarTabIcon";
import { NavLink } from "react-router-dom";
import SunIcon from "../../../src/assets/sun.svg";
import MenuIcon from "../../../src/assets/hamburger.svg";
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
  return (
    <header className="flex p-3 fixed bg-white shadow-md w-full z-10">
      <div className="flex gap-2 items-baseline max-sm:hidden">
        <img src="/assets/movie.svg" width={19} height={19} />
        <h1 className="font-bold text-2xl tracking-tighter">MovieWarehouse</h1>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon
            fill={`black`}
            width={32}
            height={32}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              <img src="/assets/movie.svg" width={33} height={33} />
            </SheetTitle>
            <SheetDescription />
          </SheetHeader>

          <SheetClose asChild>
            <nav className="flex flex-1 flex-col gap-3 mt-10">
              {sidebarLinks.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    to={item.link}
                    className={({ isActive }) =>
                      [
                        "inline-flex gap-3 p-3 text-black  rounded-md w-[200px]",
                        isActive
                          ? "bg-red-300 hover:bg-red-300"
                          : "bg-white hover:bg-slate-100",
                      ].join(" ")
                    }
                  >
                    <SidebarTabIcon name={item.name} themeMode="light" />
                    <p className="capitalize font-semibold">{item.name}</p>
                  </NavLink>
                );
              })}
              <button
                onClick={() => {}}
                className="inline-flex gap-3 p-3 text-black hover:bg-slate-100 rounded-md outline-none w-[200px]"
              >
                <SunIcon fill={`black`} width={22} height={22} />
                <p className="capitalize font-semibold">Theme</p>
              </button>
            </nav>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;

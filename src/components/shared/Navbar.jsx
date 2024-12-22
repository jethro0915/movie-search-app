import React from "react";
import { sidebarLinks } from "@/constants";
import SidebarTabIcon from "./SidebarTabIcon";
import { NavLink, Link, useLocation } from "react-router-dom";
import SunIcon from "../../../src/assets/sun.svg";
import MoonIcon from "../../../src/assets/moon.svg";
import MenuIcon from "../../../src/assets/hamburger.svg";
import UserIcon from "../../../src/assets/user.svg";
import StarIcon from "../../../src/assets/star.svg";
import LogoutIcon from "../../../src/assets/logout.svg";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/database/server";
import { signOut } from "firebase/auth";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { mode, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  const { pathname, search } = useLocation();
  const { toast } = useToast();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast({
          title: "You have logout succesfully.",
          variant: "successful",
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request. Please retry.",
        });
      });
  };

  return (
    <header className="flex px-5 py-3 fixed bg-white shadow-md w-full z-10 dark:bg-slate-800 justify-between items-center duration-300">
      <div className="flex gap-2 items-baseline max-sm:hidden">
        <img src="/assets/movie.svg" width={19} height={19} />
        <h1 className="font-bold text-2xl tracking-tighter text-black dark:text-white">
          MovieWarehouse
        </h1>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon
            width={32}
            height={32}
            className="cursor-pointer sm:hidden fill-red-500 dark:fill-red-700"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-white dark:bg-slate-800 dark:text-white border-none"
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
                            ? "bg-red-300 hover:bg-red-300 dark:bg-red-800 dark:hover:bg-red-800"
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
              className="bg-white inline-flex gap-3 p-3 text-black hover:bg-slate-100 rounded-md outline-none w-[200px] dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
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
      {currentUser === null ? (
        <Link
          to="login"
          state={{ url: pathname, query: search }}
          className="flex gap-2 px-4 py-2 rounded-lg bg-red-600 text-slate-50 hover:bg-red-400  dark:bg-red-800 dark:hover:bg-red-500 items-center"
        >
          <UserIcon width={20} height={20} fill="white" />
          <p className="font-bold">Sign In</p>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="mr-5 outline-none">
            <UserIcon width={30} height={30} fill="red" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="mt-1 p-2 dark:bg-slate-700"
          >
            <DropdownMenuLabel className="text-xl">
              {currentUser.displayName ||
                currentUser.email.slice(0, currentUser.email.indexOf("@"))}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="text-slate-300 text-[12px]">
              {currentUser.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                to="/collections"
                className="flex gap-2 w-full cursor-pointer"
              >
                <StarIcon
                  width={21}
                  height={21}
                  stroke={mode === "dark" ? "white" : "black"}
                />
                <p>Collections</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} asChild>
              <div className="flex gap-2 cursor-pointer">
                <LogoutIcon
                  width={21}
                  height={21}
                  fill={mode === "dark" ? "white" : "black"}
                />
                <p>Logout</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
};

export default Navbar;

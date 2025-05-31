"use client";

import { NavigationRoutes } from "@/model/navigation/NavigationRoutes";
import Link from "next/link";
import React from "react";
import ThemeToggleButton from "../ui/theme-toggle-button";
import { PathCheck } from "@/model/navigation/pathCheck";
import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";



const NavBar = () => {
  const currentPathname = PathCheck();

  return (
    <header className="py-8 xl:py-10 text-neutral-950 dark:text-neutral-200">
      <div className="container mx-auto flex justify-between content-center items-center">
        <div className="flex flex-row justify-start content-center items-center gap-3">
          <div className="md:hidden items-center">
            <Popover>
              <PopoverTrigger asChild className="">
                <Button variant="ghost">
                  <Menu className="h-36" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-[50%]">
                <nav className="flex flex-col gap-5">
                  {NavigationRoutes.map((item, index) => {
                    return (
                      <Link
                        href={item.link}
                        key={index}
                        className={`${
                          item.link === currentPathname &&
                          "text-blue-600 border-b-2 border-blue-600"
                        } capitalize font-medium hover:text-blue-400 transition-all`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </PopoverContent>
            </Popover>
          </div>
          <div className="">
            <Link href="/" className="">
              <h2 className="text-3xl font-semibold text-center">
                EStore <span className="text-5xl text-blue-500">{" ."}</span>
              </h2>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-end gap-7 mr-3">
          <nav className="hidden md:flex gap-7">
            {NavigationRoutes.map((item, index) => {
              return (
                <Link
                  href={item.link}
                  key={index}
                  className={`${
                    item.link === currentPathname &&
                    "text-blue-600 border-b-2 border-blue-600"
                  } capitalize font-medium hover:text-blue-400 transition-all`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div>
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

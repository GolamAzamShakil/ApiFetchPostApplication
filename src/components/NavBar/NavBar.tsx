"use client";

import { NavigationRoutes } from "@/model/navigation/NavigationRoutes";
import Link from "next/link";
import React from "react";
import ThemeToggleButton from "../ui/theme-toggle-button";

const NavBar = () => {
  return (
    <header className="py-8 xl:py-10 text-neutral-950 dark:text-neutral-200">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
        <h2 className="text-3xl font-semibold">EStore <span className="text-5xl text-blue-500">{" ."}</span></h2>
      </Link>
      <div className="hidden md:flex items-center justify-end gap-7">
        <nav className="flex gap-7">
          {NavigationRoutes.map((item, index) => {
            return (
              <Link href={item.link} key={index}>
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

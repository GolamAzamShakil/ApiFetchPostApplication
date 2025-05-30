"use client"

import { usePathname } from "next/navigation";

export function PathCheck() {
    const currentPathname = usePathname();

    return currentPathname;
}
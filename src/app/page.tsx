"use client";
import { motion } from "motion/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";
import { Button } from "@/components/ui/button";



export default function Home() {
  return (
    <div className="px-2 pb-10">
      <AuroraBackground className="rounded-md">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Create digital address of your beloved store!
          </div>
          <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
            And explore our inhouse products.
          </div>
          {/* <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"></button> */}
          <Link href={"/registration"}>
            <Button
              variant="default"
              className="w-fit text-white dark:text-black px-4 py-2"
            >
              Register your shop
            </Button>
          </Link>
        </motion.div>
      </AuroraBackground>
    </div>
  );
}

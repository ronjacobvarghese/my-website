"use client";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  imageUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.22 1"], // bottom of the viewport crosses the top of the target, bottom of the viewPort has gone 33% of the beyond the top of the project
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group relative bg-gray-100 max-w-[42rem] border border-black/5 overflow-hidden sm:pr-8 sm:h-[20rem] mb-3 sm:mb-8 last:mb-0 sm:even:pl-8 hover:bg-gray-200 transition  dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
    >
      <div className="py-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] h-full flex flex-col sm:group-even:ml-[18rem]">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
          {description}
        </p>
        <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
          {tags.map((tag, index) => (
            <li
              className="bg-black/[0.7] px-3 py -1 text-[0.7rem] uppercase-tracking-wider text-white rounded-full  dark:text-white/70"
              key={index}
            >
              {" "}
              {tag}{" "}
            </li>
          ))}
        </ul>
      </div>

      <Image
        className="absolute hidden top-12 -right-40 w-[28.25rem] rounded-t-lg shadow-xl transition sm:block
        group-even:right-[initial] 
        group-even:-left-40 
        
        group-hover:scale-[1.04]---
        group-hover-translate-x-3 
        group-hover:translate-y-3 
        group-hover:-rotate-2

        group-even:group-hover:translate-x-3 
        group-even:group-hover:translate-y-3 
        group-even:group-hover:rotate-2
        "
        src={imageUrl}
        alt="Projects I worked On"
        quality={95}
      />
    </motion.div>
  );
}

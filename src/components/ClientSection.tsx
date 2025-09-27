"use client";

import Image from "next/image";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import userHero from "../../public/userHero.png";

const ClientSection = () => {
  return (
    <div className=" bg-brand-primary h-[100vh] flex items-center justify-center">
      <div className="container mx-44 flex items-start justify-center gap-4 flex-col p-4">
        <h2 className="text-bold text-3xl md:text-4xl text-white text-start ">
          What our clients are saying
        </h2>
        <p className="w-[90%] md:w-3xl text-gray-300 ">
          Our clients range from individual investors, to local, international
          as well as fortune 500 companies.Our clients range from individual
          investors, to local, international as well as fortune 500 companies.
        </p>
        <div className=" flex items-center flex-col md:flex-row gap-2 md:gap-4 mt:1 md:mt-3">
          <div className="col-span-1 p-1 flex items-center justify-center flex-col gap-1">
            <div className="p-1 rounded-lg  w-[374px] h-[374px]">
              <Image
                src={userHero.src}
                alt="Background"
                width={374}
                height={374}
                objectFit="cover"
                className="rounded-lg w-full"
              />
            </div>
          </div>
          <div className="col-span-2 flex items-start justify-center gap-4 flex-col">
            <p className="w-[90%] md:w-2xl text-gray-400">
              "With the help of the hospitable staff of Al Safar and Partners I
              was able to get my work done without any hassle. The help I
              received helped me a great deal to overcome the issues that I
              faced. I was always updated about my case and my queries never
              went unanswered.
            </p>
            <h4 className="text-white text-bold text-xl font-bold">
              Ahmed Ibrahim
            </h4>
            <p className="text-white">CEO/Company</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-6 w-full">
          <button
            type="button"
            aria-label="Previous"
            className="disabled:opacity-40 w-[40px] h-[40] rounded-full bg-white opacity-55 flex items-center justify-center"
          >
            <MdArrowBack className="text-2xl text-amber-700 cursor-pointer" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="disabled:opacity-40 w-[40px] h-[40] rounded-full bg-white flex items-center justify-center"
          >
            <MdArrowForward className="text-3xl text-amber-700  cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientSection;

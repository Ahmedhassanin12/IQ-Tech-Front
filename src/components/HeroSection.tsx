"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setActiveSlide } from "@/store/mainAppSlice";
import userHero from "../../public/userHero.png";
import HeroSectionWrapper from "./HeroSectionWrapper";

const HeroSection = () => {
  const { currentSlide } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const tHomePage = useTranslations("HomePage");

  const locale = useLocale();
  const isRtl = locale === "ar";
  const slides = useMemo(
    () =>
      ["s1", "s2", "s3"].map((id) => ({
        id,
        title: tHomePage("title"),
        description:
          tHomePage("about"),
      })),
    [tHomePage],
  );

  const goToSlide = (index: number) => {
    dispatch(setActiveSlide({ index }));
  };

  const goToNext = () => {
    const next = (currentSlide + 1) % slides.length;
    dispatch(setActiveSlide({ index: next }));
  };

  useEffect(() => {
    const id = setInterval(() => {
      const next = (currentSlide + 1) % slides.length;
      dispatch(setActiveSlide({ index: next }));
    }, 10000);
    return () => clearInterval(id);
  }, [currentSlide, slides.length, dispatch]);

  return (
    <HeroSectionWrapper>
      <div className="relative z-10 h-full w-full">
        <div
          className="h-full w-full flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(${isRtl ? currentSlide * 100 : -currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div key={`slide_${slide.id}`} className="min-w-full h-full">
              <div className="pt-[80px] px-3 grid grid-cols-[30px_1fr] md:grid-cols-[100px_1fr_1fr] grid-rows-1 gap-2 h-full">
                <div className="flex items-center justify-center flex-col gap-4">
                  <button
                    type="button"
                    aria-label="Next slide"
                    onClick={goToNext}
                    className="text-4xl cursor-pointer"
                  >
                    <MdOutlineArrowBack />
                  </button>
                  <div className="flex items-center justify-center flex-col gap-2 pt-5">
                    {slides.map((dotSlide, index) => (
                      <button
                        type="button"
                        key={`dot_${dotSlide.id}`}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide
                          ? "bg-white scale-125"
                          : " hover:bg-white/60  border-1 border-white"
                          }`}
                      />
                    ))}
                  </div>
                </div>
                <div className=" flex items-start justify-center flex-col gap-1 ">
                  <h4 className="font-bold text-3xl">{slide.title}</h4>
                  <p className="font-semibold text-lg">{slide.description}</p>
                  <button
                    type="button"
                    className="focus:outline-none cursor-pointer text-black bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:ring-slate-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  >
                    {tHomePage("more")}
                  </button>
                </div>
                <div className="p-1 hidden md:flex items-center justify-center flex-col gap-1">
                  <div className="p-1 rounded-lg  w-[374px] h-[374px]">
                    <Image
                      src={userHero.src}
                      alt="Background"
                      width={374}
                      height={374}
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </HeroSectionWrapper>
  );
};

export default HeroSection;

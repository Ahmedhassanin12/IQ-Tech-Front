/** biome-ignore-all lint/suspicious/noArrayIndexKey: <not have real id now will back and fix it> */
"use client";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import TeamMemberCard from "@/common/components/TeamMemberCard";
import { getTeam } from "@/lib/api/team/team";

const TeamSection = () => {
  const tTeam = useTranslations("Team");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["TEAM_MEMBERS"],

    queryFn: async () => {
      const response = await getTeam(1);
      return response.data;
    },
  });

  const [isMdUp, setIsMdUp] = useState(false);
  const visibleCount = isMdUp ? 3 : 1;
  const maxIndex = Math.max(0, data?.length ?? 0 - visibleCount);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const md = "matches" in e ? e.matches : (e as MediaQueryList).matches;
      setIsMdUp(md);
    };
    onChange(mql);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [maxIndex, index]);

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const itemBasisPercent = 100 / visibleCount;
  const translatePercent = index * itemBasisPercent;

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-[#F3F3F3] h-[100vh] flex items-center justify-center gap-2 flex-col">
        <h5 className="font-bold text-3xl text-brand-primary">Our Team</h5>
        <p className="text-lg text-[#1e1e1e] md:w-3xl text-center px-4">
          Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>

        <div className="flex items-center gap-7 w-full max-w-6xl px-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-brand-primary rounded-full animate-spin"></div>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="flex gap-4">
              {Array.from({ length: visibleCount }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 px-2"
                  style={{ flexBasis: `${itemBasisPercent}%` }}
                >
                  <div className="bg-white rounded-lg p-6 animate-pulse">
                    <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-12 h-12 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-brand-primary rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#F3F3F3] h-[100vh] flex items-center justify-center gap-2 flex-col">
        <h5 className="font-bold text-3xl text-brand-primary">Our Team</h5>
        <p className="text-lg text-[#1e1e1e] md:w-3xl text-center px-4">
          Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>

        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <div className="text-red-500 text-6xl">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800">
            Failed to load team members
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            We're having trouble loading our team information. Please try again.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="bg-[#F3F3F3] h-[100vh] flex items-center justify-center gap-2 flex-col">
        <h5 className="font-bold text-3xl text-brand-primary">
          {tTeam("team")}
        </h5>
        <p className="text-lg text-[#1e1e1e] md:w-3xl text-center px-4">
          {tTeam("desc")}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <div className="text-gray-400 text-6xl">👥</div>
          <h3 className="text-xl font-semibold text-gray-800">
            No team members found
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            We're currently updating our team information. Please check back
            later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-[#F3F3F3] h-[100vh] flex items-center justify-center gap-2 flex-col">
      <h5 className="font-bold text-3xl text-brand-primary">
        {tTeam("team")}

      </h5>
      <p className="text-lg text-[#1e1e1e] md:w-3xl text-center px-4">
        {tTeam("desc")}

      </p>

      <div className="flex items-center gap-7 w-full max-w-6xl px-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous"
          className="disabled:opacity-40"
          disabled={index === 0}
        >
          <MdArrowBack className="text-5xl text-brand-primary cursor-pointer" />
        </button>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${translatePercent}%)` }}
          >
            {data?.map((member, i) => (
              <div
                key={i}
                className="shrink-0 px-2"
                style={{ flexBasis: `${itemBasisPercent}%` }}
              >
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next"
          className="disabled:opacity-40"
          disabled={index === maxIndex}
        >
          <MdArrowForward className="text-5xl text-brand-primary  cursor-pointer" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-3">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === index ? "bg-brand-primary scale-110" : "bg-black/30"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;

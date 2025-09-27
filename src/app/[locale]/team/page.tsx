"use client";

import { useQuery } from "@tanstack/react-query";
import TeamMemberCard from "@/common/components/TeamMemberCard";
import HeroSectionWrapper from "@/components/HeroSectionWrapper";
import { getTeam } from "@/lib/api/team/team";

const OurTeam = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["TEAM_MEMBERS"],

    queryFn: async () => {
      const response = await getTeam(1);
      return response.data;
    },
  });

  return (
    <div>
      <HeroSectionWrapper>
        <div className="relative z-10 h-full w-full">
          <div className="pt-[80px] px-3 grid grid-cols-[1fr] md:grid-cols-[1fr] grid-rows-1 gap-2 h-full ">
            <h4 className="flex items-center px-8 font-bold text-5xl">
              Our Team
            </h4>
          </div>
        </div>
      </HeroSectionWrapper>
      <div className="p-5 w-full  flex items-center transition-transform duration-500 ease-in-out">
        {data?.map((member,) => (
          <div key={member.documentId} className="shrink-0 px-2">
            <TeamMemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;

"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Footer from "@/common/components/Footer";
import NavigationLink from "@/common/components/NavigationLink";
import TeamMemberCard from "@/common/components/TeamMemberCard";
import type { Member } from "@/common/types/member.type";
import type { Service } from "@/common/types/service.type";
import HeroSectionWrapper from "@/components/HeroSectionWrapper";
import { searchServices } from "@/lib/api/services/services";
import { searchTeam } from "@/lib/api/team/team";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const tSearch = useTranslations("Search");

  const {
    data: servicesData,
    isLoading: servicesLoading,
    error: servicesError,
  } = useQuery({
    queryKey: ["searchServices", query],
    queryFn: () => searchServices(query),
    enabled: !!query,
  });

  const {
    data: teamData,
    isLoading: teamLoading,
    error: teamError,
  } = useQuery({
    queryKey: ["searchTeam", query],
    queryFn: () => searchTeam(query),
    enabled: !!query,
  });

  const services = servicesData?.data || [];
  const team = teamData?.data || [];

  if (!query) {
    return (
      <>
        <HeroSectionWrapper>
          <div className="relative z-10 h-full w-full">
            <div className="pt-[80px] px-3 grid grid-cols-[1fr] md:grid-cols-[1fr] grid-rows-1 gap-2 h-full">
              <h4 className="flex items-center px-8 font-bold text-5xl">
                {tSearch("results")}
              </h4>
            </div>
          </div>
        </HeroSectionWrapper>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {tSearch("noQuery")}
            </h2>
            <p className="text-gray-600">{tSearch("noQueryDescription")}</p>
          </div>
        </div>
        <div className="h-[25px] bg-white" />
        <Footer />
      </>
    );
  }

  return (
    <>
      <HeroSectionWrapper>
        <div className="relative z-10 h-full w-full">
          <div className="pt-[80px] px-3 grid grid-cols-[1fr] md:grid-cols-[1fr] grid-rows-1 gap-2 h-full">
            <h4 className="flex items-center px-8 font-bold text-5xl">
              Search Results for "{query}"
            </h4>
          </div>
        </div>
      </HeroSectionWrapper>

      <div className="container mx-auto px-4 py-8">
        {/* Services Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="bg-amber-600 text-white px-3 py-1 mx-2 rounded-full text-lg mr-3">
              {services.length}
            </span>
            {tSearch("services")}
          </h2>

          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
              <div className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
              <div className="bg-gray-200 animate-pulse rounded-lg h-32"></div>
            </div>
          ) : servicesError ? (
            <div className="text-red-600 text-center py-8">
              Error loading services: {servicesError.message}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {tSearch("noResultsDescription")} "{query}"
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service: Service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
                >
                  <h3 className="text-xl font-semibold text-brand-primary mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {service.describe}
                  </p>
                  <NavigationLink
                    href={{
                      pathname: "/services/[serviceId]",
                      params: { serviceId: service.documentId.toString() },
                    }}
                    className="inline-block bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
                  >
                    {tSearch("viewDetails")}
                  </NavigationLink>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-lg mr-3">
              {team.length}
            </span>
            {tSearch("teamMembers")}
          </h2>

          {teamLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-200 animate-pulse rounded-lg h-48"></div>
              <div className="bg-gray-200 animate-pulse rounded-lg h-48"></div>
              <div className="bg-gray-200 animate-pulse rounded-lg h-48"></div>
            </div>
          ) : teamError ? (
            <div className="text-red-600 text-center py-8">
              Error loading team members: {teamError.message}
            </div>
          ) : team.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              {tSearch("noResultsDescription")} "{query}"
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member: Member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>

        {/* No Results Message */}
        {!servicesLoading &&
          !teamLoading &&
          services.length === 0 &&
          team.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {tSearch("noResults")}
              </h3>
              <p className="text-gray-600 mb-6">
                {tSearch("noResultsDescription")} "{query}".
              </p>
              <div className="space-x-4">
                <NavigationLink
                  href="/services"
                  className="inline-block bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors"
                >
                  {tSearch("browseAllServices")}
                </NavigationLink>
                <NavigationLink
                  href="/team"
                  className="inline-block bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
                >
                  {tSearch("meetOurTeam")}
                </NavigationLink>
              </div>
            </div>
          )}
      </div>
      <div className="h-[25px] bg-white" />
      <Footer />
    </>
  );
};

export default SearchPage;


import BackButton from "@/common/components/BackButton";
import Footer from "@/common/components/Footer";
import HeroSectionWrapper from "@/components/HeroSectionWrapper";

import { getService } from "@/lib/api/services/services";


const page = async ({
  params,
}: {
  params: {
    serviceId: string;
  };
}) => {
  const serviceId = await params.serviceId;
  const service = await getService(serviceId);

  return (
    <>
      <HeroSectionWrapper>
        <div className="relative z-10 h-full w-full">
          <div className="pt-[80px] px-3 grid grid-cols-[1fr] md:grid-cols-[1fr] grid-rows-1 gap-2 h-full ">
            <h4 className="flex items-center px-8 font-bold text-5xl">
              {service.data.name}
            </h4>
          </div>
        </div>
      </HeroSectionWrapper>
      <div className="h-[50vh] flex items-start p-8 flex-col gap-5 bg-white text-center text-black">
        <BackButton />
        <h1 className="text-4xl font-bold text-brand-primary">
          {service.data.name}
        </h1>
        <p className="text-md text-gray-500">{service.data.describe}</p>
        <div className="text-sm text-black">
          <p>Created: {service.data.createdAt}</p>
          <p>Updated: {service.data.updatedAt}</p>
        </div>
      </div>
      <div className="h-[25px] bg-white" />
      <Footer />
    </>
  );
};

export default page;

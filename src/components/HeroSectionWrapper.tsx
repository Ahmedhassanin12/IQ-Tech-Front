import Image from "next/image";
import type { ReactNode } from "react";
import heroSection from "../../public/heroSection.jpg";

const HeroSectionWrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="relative  h-screen w-full bg-[linear-gradient(271.47deg,rgba(75,38,21,0.28)_1.2%,rgba(75,38,21,0.68)_86.38%)] overflow-hidden">
      <Image
        src={heroSection.src}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="z-[-1]"
      />
      {children}
    </div>
  );
};

export default HeroSectionWrapper;

import Image from "next/image";
import { MdEmail, MdOutlinePhonePaused, MdWhatsapp } from "react-icons/md";
import type { Member } from "../types/member.type";

const TeamMemberCard = ({ member }: { member: Member }) => {


  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  return (
    <div className="min-w-[300px] max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm  dark:border-gray-200">
      <Image
        width={274}
        height={254}
        className="rounded-t-lg w-full max-h-[254px] min-w-full object-cover"
        src={`${API_URL}${member.userImage.url}`}
        alt={member.name}
      />

      <div className="p-5 py-3">
        <h5 className="mb-0.5 text-2xl font-bold tracking-tight text-gray-900 capitalize">
          {member.name}
        </h5>

        <p className="mb-3 font-normal text-[#1e1e1e] capitalize">
          {member.email}
        </p>
        <div className="flex items-center gap-1.5 px-1 py-2 text-sm font-medium text-center text-white  ">
          <MdWhatsapp className=" text-green-300  text-2xl" />
          <a href={`mailto:${member.email}`} rel="noopener noreferrer" target="_blank">
            <MdEmail className="text-gray-950 text-2xl" />
          </a>
          <a href={`tel:${member.phoneNumber}`} rel="noopener noreferrer" target="_blank">
            <MdOutlinePhonePaused className="text-gray-950 text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;

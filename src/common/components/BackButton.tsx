"use client";

import { useTranslations } from "next-intl";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "@/i18n/routing";

const BackButton = () => {
  const router = useRouter();
  const tHomePage = useTranslations("HomePage");

  return (
    <button
      onClick={() => router.back()}
      type="button"
      className="flex items-center gap-2 cursor-pointer text-brand-primary hover:text-amber-600"
    >
      <MdArrowBack />
      <span>{tHomePage("back")}</span>
    </button>
  );
};

export default BackButton;

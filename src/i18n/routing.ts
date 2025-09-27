import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/services": {
      en: "/services",
      ar: "/الخدمات",
    },
    "/team": {
      en: "/team",
      ar: "/الغريق",
    },
    "/services/[serviceId]": {
      en: "/services/[serviceId]",
      ar: "/الخدمات/[serviceId]",
    },
    "/search": {
      en: "/search",
      ar: "/البحث",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

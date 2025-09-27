"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  MdMenu,
  MdOutlineArrowDownward,
  MdOutlineArrowUpward,
  MdSearch,
} from "react-icons/md";
import LocaleSwitcher from "@/common/components/LocaleSwitcher";
import ServicesMenu from "@/components/ServicesMenu";
import { useRouter } from "@/i18n/routing";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setSearchValue,
  toggleMobileMenu,
  toggleSearch,
  toggleService,
} from "@/store/mainAppSlice";
import NavigationLink from "./NavigationLink";

const HeaderNavigation = () => {
  const t = useTranslations("Navigation");
  const tSearch = useTranslations("Search");
  const dispatch = useAppDispatch();
  const { isServicesOpen, isMobileMenuOpen, isSearchOpen, search } =
    useAppSelector((state) => state.app);

  const router = useRouter();
  const local = useLocale();
  const isRtl = local === "ar";
  const [isScrolled, setIsScrolled] = useState(false);

  // Debug: Log state changes
  useEffect(() => {
    console.log('isScrolled state changed to:', isScrolled);
  }, [isScrolled]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push({
        pathname: "/search",
        query: { q: search.trim() },
      });
      dispatch(toggleSearch());
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  const searchRef = useRef<HTMLDivElement>(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const shouldBeScrolled = scrollTop > 100;
      console.log('Scroll position:', scrollTop, 'Should be scrolled:', shouldBeScrolled);
      setIsScrolled(shouldBeScrolled);
    };

    // Set initial state
    handleScroll();

    // Add scroll listener with multiple event types
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Search and keyboard effects
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        if (isSearchOpen) {
          dispatch(toggleSearch());
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isSearchOpen) {
        dispatch(toggleSearch());
      }
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        dispatch(toggleSearch());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen, dispatch]);

  return (
    <header
      className={`${isServicesOpen
        ? "bg-gradient-to-r from-amber-800 via-amber-800 to-amber-800 shadow-2xl"
        : isScrolled
          ? "bg-red-500 shadow-2xl backdrop-blur-md border-b border-red-600"
          : "bg-[linear-gradient(271.47deg,rgba(75,38,21,0.28)_1.2%,rgba(75,38,21,0.68)_86.38%)] shadow-2xl"
        } backdrop-blur-sm fixed w-full top-0 z-50 transition-all duration-300 ease-in-out ${isRtl ? "rtl" : ""}`}
    >
      <div className={`container mx-auto px-4 transition-all duration-300 ease-in-out ${isScrolled ? "py-3" : "py-4"
        }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => dispatch(toggleMobileMenu())}
            className="lg:hidden cursor-pointer text-white p-2 hover:bg-amber-800/30 rounded-lg"
          >
            {isMobileMenuOpen ? (
              <IoMdClose className="w-6 h-6" />
            ) : (
              <MdMenu className="w-6 h-6" />
            )}
          </button>
          <div className="text-2xl font-bold text-white flex items-center">
            logo
            {isScrolled && <span className="ml-2 text-xs bg-white text-amber-800 px-2 py-1 rounded">SCROLLED</span>}
          </div>

          {/* Desktop Navigation */}
          <nav
            className={`hidden lg:flex items-center space-x-8 ${isRtl ? "space-x-reverse" : ""}`}
          >
            <NavigationLink
              href={`/`}
              className="text-white hover:text-amber-300 transition-colors font-medium"
            >
              {t("home")}
            </NavigationLink>
            <a
              href="#about"
              className="text-white hover:text-amber-300 transition-colors font-medium"
            >
              {t("about")}
            </a>

            {/* Services Dropdown */}
            <div className="group">
              <button
                type="button"
                className="text-white cursor-pointer hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium"
                aria-haspopup="menu"
                aria-expanded={isServicesOpen}
                onMouseEnter={() => dispatch(toggleService(true))}
                onFocus={() => dispatch(toggleService(true))}
                onClick={() => router.push("/services")}
              >
                {t("services")}
                {isServicesOpen ? (
                  <MdOutlineArrowUpward />
                ) : (
                  <MdOutlineArrowDownward />
                )}
              </button>

              {isServicesOpen ? (
                <ServicesMenu isServicesOpen={isServicesOpen} />
              ) : null}
            </div>
            <a
              href="#about"
              className="text-white hover:text-amber-300 transition-colors font-medium"
            >
              {t("blog")}
            </a>

            <NavigationLink
              href="/team"
              className="text-white hover:text-amber-300 transition-colors font-medium"
            >
              {t("ourTeam")}
            </NavigationLink>
            <a
              href="#about"
              className="text-white hover:text-amber-300 transition-colors font-medium"
            >
              {t("contact")}
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon and Input */}
            <div className="relative" ref={searchRef}>
              <button
                type="button"
                onClick={() => dispatch(toggleSearch())}
                className="cursor-pointer text-white hover:text-amber-300 transition-colors p-2 relative group"
                aria-label="Search"
                title="Search (Ctrl+K)"
              >
                <MdSearch className="w-6 h-6" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Ctrl+K
                </span>
              </button>

              {isSearchOpen && (
                <div className="w-fit absolute right-0 top-full mt-2  bg-white rounded-lg shadow-lg z-50">
                  <form onSubmit={handleSearchSubmit} className="p-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder={tSearch("placeholder")}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                      >
                        {tSearch("search")}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <button
              type="button"
              className="focus:outline-none cursor-pointer text-white border-slate-100   font-medium rounded-lg text-sm px-5 py-2.5 me-2 "
            >
              Book Appointment
            </button>
            {/* Search */}
            <LocaleSwitcher />
          </div>
        </div>
        {isMobileMenuOpen ? (
          <div className="lg:hidden mt-4 bg-amber-800/50 backdrop-blur-sm rounded-lg border border-amber-700">
            <NavigationLink
              href="/"
              className="block px-4 py-3 text-white hover:bg-amber-700/50 transition-colors"
            >
              {t("home")}
            </NavigationLink>
            <a
              href="#about"
              className="block px-4 py-3 text-white hover:bg-amber-700/50 transition-colors"
            >
              {t("about")}
            </a>
            <NavigationLink
              href="/services"
              className="block px-4 py-3 text-white hover:bg-amber-700/50 transition-colors"
            >
              {t("services")}
            </NavigationLink>
            <a
              href="#blog"
              className="block px-4 py-3 text-white hover:bg-amber-700/50 transition-colors"
            >
              {t("blog")}
            </a>
            <NavigationLink
              href="/team"
              className="block px-4 py-3 text-white hover:bg-amber-700/50 transition-colors"
            >
              {t("contact")}
            </NavigationLink>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default HeaderNavigation;

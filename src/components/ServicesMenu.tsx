import { useQuery } from "@tanstack/react-query";


import NavigationLink from "@/common/components/NavigationLink";
import { getServices } from "@/lib/api/services/services";
import { useAppDispatch } from "@/store/hook";
import { toggleService } from "@/store/mainAppSlice";

const ServicesMenu = ({ isServicesOpen }: { isServicesOpen: boolean }) => {
  const dispatch = useAppDispatch();


  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["SERVICES", isServicesOpen],
    enabled: isServicesOpen,
    queryFn: async () => {
      const response = await getServices(1);
      return response.data;
    },
  });

  return (
    <div
      className={`absolute top-full left-0 right-0 transition-all duration-300 ease-in-out ${isServicesOpen
        ? "opacity-85 translate-y-0 visible"
        : "opacity-0 -translate-y-4 invisible"
        } w-full px-6`}
      onMouseEnter={() => dispatch(toggleService(true))}
      onMouseLeave={() => dispatch(toggleService(false))}
      role="menu"
      tabIndex={-1}
    >
      <div className="rounded-xl shadow-xl bg-amber-900/95 ring-1 ring-white/10 overflow-hidden">
        {isLoading ? (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }, (_, index) => (
                <div
                  key={`skeleton-card-${Math.random()}-${index}`}
                  className="animate-pulse"
                >
                  <div className="p-4 rounded-lg bg-amber-800/40 ring-1 ring-white/10">
                    <div className="h-4 bg-amber-700/50 rounded mb-2 w-3/4"></div>
                    <div className="h-3 bg-amber-700/30 rounded w-full"></div>
                    <div className="h-3 bg-amber-700/30 rounded w-2/3 mt-1"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <div className="text-red-300 mb-2">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="Error icon"
              >
                <title>Error loading services</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <p className="text-red-300 font-medium mb-2">
              Failed to load services
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-white/70 text-sm"
            >
              Please try again later
            </button>
          </div>
        ) : data && data.length > 0 ? (
          <div className="p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {data.map((service) => (
                <div key={service.id} className="group">
                  <NavigationLink
                    href={`/services/${service.documentId}` as "/services"}
                    className="block p-2 rounded-lg w-fit hover:underline"
                  >
                    <h5 className="text-white font-medium text-sm  transition-colors duration-200">
                      {service.name}
                    </h5>
                  </NavigationLink>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="text-amber-300 mb-2">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="No services icon"
              >
                <title>No services available</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.571M15 6H9a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V8a2 2 0 00-2-2z"
                />
              </svg>
            </div>
            <p className="text-amber-300 font-medium mb-2">
              No services available
            </p>
            <p className="text-white/70 text-sm">
              Check back later for updates
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesMenu;

import api from "@/axios_instance";
import type { Service } from "@/common/types/service.type";

export const getServices = async (pageNumber: number): Promise<{ data: Service[] }> => {
  const response = await api.get<{ data: Service[] }>(
    `/services?_pageSize=10&_page=${pageNumber}`,
  );
  return response.data;
};

export const getService = async (id: number | string): Promise<{ data: Service }> => {
  const response = await api.get<{ data: Service }>(`/services/${id}`);
  return response.data;
};

export const addService = async (
  data: Pick<Service, "name" | "describe">,
): Promise<Service[]> => {
  const response = await api.post<Service[]>("/services", { ...data, });
  return response.data;
};

export const editService = async (
  id: number,
  data: Partial<Service>,
): Promise<Service> => {
  const response = await api.put<Service>(`/services/${id}`, data);
  return response.data;
};

export const deleteService = async (id: number): Promise<Service> => {
  const response = await api.delete<Service>(`/services/${id}`);
  return response.data;
};

export const searchServices = async (query: string): Promise<{ data: Service[] }> => {
  const response = await api.get<{ data: Service[] }>(
    `/services?filters[name][$containsi]=${encodeURIComponent(query)}&_pageSize=50`,
  );
  return response.data;
};
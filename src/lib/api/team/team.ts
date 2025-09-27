import api from "@/axios_instance";
import type { Member } from "@/common/types/member.type";

export const getTeam = async (
  pageNumber?: number,
): Promise<{ data: Member[] }> => {
  const response = await api.get<{ data: Member[] }>(
    `/teams/?populate=*`,
  );
  return response.data;
};

export const getTeamMember = async (id: number): Promise<{ data: Member }> => {
  const response = await api.get<{ data: Member }>(`/teams/${id}`);
  return response.data;
};

export const addMember = async (
  data: Pick<Member, "name" | "email">,
): Promise<{ data: Member }> => {
  const response = await api.post<{ data: Member }>("/teams", {
    ...data,
    userId: 1,
  });
  return response.data;
};

export const editMember = async (
  id: number,
  data: Partial<{ data: Member }>,
): Promise<{ data: Member }> => {
  const response = await api.patch<{ data: Member }>(`/teams/${id}`, data);
  return response.data;
};

export const deleteMember = async (id: number): Promise<{ data: Member }> => {
  const response = await api.delete<{ data: Member }>(`/teams/${id}`);
  return response.data;
};

export const searchTeam = async (query: string): Promise<{ data: Member[] }> => {
  const response = await api.get<{ data: Member[] }>(
    `/teams?filters[name][$containsi]=${encodeURIComponent(query)}&populate=*&_pageSize=50`,
  );
  return response.data;
};
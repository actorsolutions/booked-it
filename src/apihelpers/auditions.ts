import { AuditionsResponse, CreateAuditionData } from "@/types";

// Get Auditions from server, gets userId from session in server
export const getAuditions = async (): Promise<AuditionsResponse> => {
  const response = await fetch(`/api/auditions`, {
    method: "GET",
  });
  return await response.json();
};

export const createAudition = async (data: CreateAuditionData) => {
  return await fetch("/api/auditions", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

import { Audition, AuditionsResponse, CreateAuditionData } from "@/types";

// Get Auditions from server, gets userId from session in server
export const getAuditions = async (): Promise<AuditionsResponse> => {
  const response = await fetch(`/api/auditions`, {
    method: "GET",
  });
  if (response.status !== 200) {
    throw Error("Failed to get auditions.")
  }
  return await response.json();
};

export const createAudition = async (data: CreateAuditionData) => {
  // This division makes it work nice with the backend.
  data.date = data.date / 1000;
  return await fetch("/api/auditions", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((data) => {
    return data.json();
  });
};

export const updateAudition = async (data: Audition) => {
  const response = await fetch(`/api/auditions/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deleteAudition = async (data: Audition) => {
  return await fetch(`/api/auditions/${data.id}`, {
    method: "DELETE",
  }).then((data) => {
    return data.json();
  });
};

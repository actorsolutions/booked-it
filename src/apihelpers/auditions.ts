import { AuditionData, AuditionsResponse, CreateAuditionData } from "@/types";
import RESPONSE_MESSAGES from "@/support/response_messages";

// Get Auditions from server, gets userId from session in server
export const getAuditions = async (): Promise<AuditionsResponse> => {
  const response = await fetch(`/api/auditions`, {
    method: "GET",
  });
  if (response.status !== 200) {
    throw Error(RESPONSE_MESSAGES.AUDITION_MESSAGES.GET_AUDITIONS_FAILURE);
  }
  return await response.json();
};

export const createAudition = async (data: CreateAuditionData) => {
  // This division makes it work nicely with the backend.
  data.date = data.date / 1000;
  return await fetch("/api/auditions", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw Error(
          RESPONSE_MESSAGES.AUDITION_MESSAGES.AUDITION_CREATE_FAILURE
        );
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      throw Error(RESPONSE_MESSAGES.AUDITION_MESSAGES.AUDITION_CREATE_FAILURE);
    });
};

export const updateAudition = async (data: AuditionData) => {
  const response = await fetch(`/api/auditions/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (response.status !== 200) {
    throw Error(RESPONSE_MESSAGES.AUDITION_MESSAGES.AUDITION_UPDATE_FAILURE);
  }
  return await response.json();
};

export const deleteAudition = async (data: AuditionData) => {
  return await fetch(`/api/auditions/${data.id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status !== 200) {
        throw Error(
          RESPONSE_MESSAGES.AUDITION_MESSAGES.AUDITION_DELETE_FAILURE
        );
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      throw Error(RESPONSE_MESSAGES.AUDITION_MESSAGES.AUDITION_DELETE_FAILURE);
    });
};

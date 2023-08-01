import RESPONSE_MESSAGES from "@/support/response_messages";
// Get Auditions from server, gets userId from session in server
export const scrapeAuditions = async () => {
  const response = await fetch(`/api/actorsaccess`, {
    method: "GET",
  });
  if (response.status !== 200) {
    throw Error(RESPONSE_MESSAGES.AUDITION_MESSAGES.GET_AUDITIONS_FAILURE);
  }
  return await response.json();
};

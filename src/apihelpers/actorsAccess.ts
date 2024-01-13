import RESPONSE_MESSAGES from "@/support/response_messages";
// Get Auditions from server, gets userId from session in server
export const scrapeAuditions = async (userName: string, password: string) => {
  const data = { userName, password };
  const response = await fetch(`/api/actorsaccess`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (response.status !== 200) {
    throw Error(RESPONSE_MESSAGES.AUDITION_MESSAGES.GET_AUDITIONS_FAILURE);
  }
  return await response.json();
};
export const checkAA = async (userName: string, password: string) => {
  const data = { userName, password };
  const response = await fetch(`/api/actorsaccess/checkpassword`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (response.status !== 200) {
    return false;
  }
  return response.json();
};

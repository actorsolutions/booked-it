import RESPONSE_MESSAGES from "@/support/response_messages";
import { mockSession } from "next-auth/client/__tests__/helpers/mocks";
import user = mockSession.user;
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

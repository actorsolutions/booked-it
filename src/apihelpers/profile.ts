import RESPONSE_MESSAGES from "@/support/response_messages";
import { UpdateUserData } from "@/types/users";

/**
 * Update's a user's profile information
 * @param props
 */

export const updateProfile = async (props: UpdateUserData) => {
  console.log(props);
  const response = await fetch(`/api/profile`, {
    method: "PUT",
    body: JSON.stringify(props),
  });
  if (response.status !== 200) {
    throw Error(RESPONSE_MESSAGES.PROFILE_MESSAGES.SAVE_ERROR);
  }
  return await response.json();
};

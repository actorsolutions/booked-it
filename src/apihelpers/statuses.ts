import RESPONSE_MESSAGES from "@/support/response_messages";

export const deleteStatus = async (id: number) => {
  return await fetch(`/api/statuses/${id}`, {
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

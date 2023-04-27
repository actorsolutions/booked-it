// Get Auditions from server, gets userId from session in server
export const getAuditions = async () => {
  const response = await fetch(`/api/auditions`, {
    method: "GET",
  });
  return await response.json();
};

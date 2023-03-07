export const getAuditionsByUserId = async (userId: string) => {
  const userIdParams = new URLSearchParams({ userId });
  const response = await fetch(`/api/auditions?${userIdParams}`, {
    method: "GET",
  });
  return await response.json();
};

export const getAuditionsByEmail = async (userId: string) => {
  const userIdParams = new URLSearchParams({ userId });
  const response = await fetch(`/api/auditions?${userIdParams}`, {
    method: "GET",
  });
  return await response.json();
};

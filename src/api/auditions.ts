interface createData {
  id: number;
  userId: number;
  date: number;
  project: string;
  company: string;
  notes: string;
  type: string;
  callBackDate?: number;
}

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

export const createAudition = async (data: createData) => {
  return await fetch("/api/auditions", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

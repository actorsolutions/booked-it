interface createData {
  id: number;
  userId: number;
  date: number;
  project: string;
  company: string;
  notes: string;
  type: string;
  callBackDate?: number;
  status: string;
  archived: boolean;
}

// Get Auditions from server, gets userId from session in server
export const getAuditions = async () => {
  const response = await fetch(`/api/auditions`, {
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

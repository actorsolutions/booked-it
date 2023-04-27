import {
  handleAuth,
  handleProfile,
  getSession,
  Session,
} from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

const afterRefetch = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const newSession = getSession(req, res);
  if (newSession) {
    return newSession as Promise<Session>;
  }
  return session;
};
export default handleAuth({
  profile: async function (req, res) {
    try {
      await handleProfile(req, res, {
        refetch: true,
        afterRefetch, // added afterRefetch Function
      });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
});

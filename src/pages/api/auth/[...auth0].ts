import {
  handleAuth,
  handleProfile,
  getSession,
  Session,
} from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

/**
 *  Handles the Authentication from Auth0 with custom handleProfile logic to create a new session
 * - /apiCalls/auth/login: log the user in to your app by redirecting them to your identity provider.
 * - /apiCalls/auth/callback: The page that your identity provider will redirect the user back to on login.
 * - /apiCalls/auth/logout: log the user out of your app.
 * - /apiCalls/auth/me: View the user profile JSON (used by the UseUser hook).
 * - /apiCalls/auth/unauthorized: Returns a 401 for use by WithMiddlewareAuthRequired when protecting API routes.
 *
 * For more information https://auth0.github.io/nextjs-auth0/types/handlers_auth.HandleAuth.html
 */
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

// Creates session
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

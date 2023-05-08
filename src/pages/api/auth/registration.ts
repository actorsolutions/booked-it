import { NextApiRequest, NextApiResponse } from "next";
import { Users } from "@/models/Users";
import { getSession, updateSession } from "@auth0/nextjs-auth0";
import { prisma } from "../../../utils/prisma";

interface UserParams {
  email: string;
  sid: string;
}

/**
 * Registers a user/ Signs in an already registered user and adds localDB.user.id to the session data.
 * @param req
 * @param res
 * @constructor
 */
const Registration = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  if (req.method === "POST" && session) {
    const { sid, email } = session?.user as UserParams;
    const users = new Users(prisma.user);
    const user = await Users.signUpOrSignIn({ email, sid });
    await updateSession(req, res, {
      ...session,
      user: { ...session?.user, id: user.id },
    });
    res.status(200).json({ user });
  }
};

export default Registration;

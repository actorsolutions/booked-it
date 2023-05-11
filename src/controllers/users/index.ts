import {NextApiRequest, NextApiResponse} from "next";
import {getSession, updateSession} from "@auth0/nextjs-auth0";
import {prisma} from "@/utils/prisma";
import {Users} from "@/models/Users";

/**
 * Gets User based on email and returns it
 * @param req
 * @param res
 * @param db
 */
export const getUserByEmail = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.user
) => {
  const session = await getSession(req, res);
  const email = session?.user.email;
  const user = await Users.findByEmail(email, db);
  if (!user) {
    return res.status(500).send({ message: "No User with that email." });
  }
  return res.status(200).send(user);
};

/**
 * Gets User based on ID and returns it
 * @param req
 * @param res
 * @param db
 */
export const getUserById = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.user
) => {
  const { id } = req.query;
  const user = await Users.findById(parseInt(id as string), db);
  if (!user) {
    return res.status(500).send({ message: "No User found" });
  }
  return res.status(200).send(user);
};

/**
 * Checks for existence of user in db and signs that user in, if it exists and adds DB.id to session
 * If that user does not yet exist in db, creates it.
 * @param req
 * @param res
 * @param db
 */
export const registerOrSignInUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.user
) => {
  const session = await getSession(req, res);
  if (!session) {
    res.status(500).send({ message: "Please sign in" });
  } else {
    const { email, sid } = session.user;
    const registeredUser = await Users.signUpOrSignIn({ email, sid }, db);
    await updateSession(req, res, {
      ...session,
      user: { ...session?.user, id: registeredUser.id },
    });
    res.status(200).send(registeredUser);
  }
};

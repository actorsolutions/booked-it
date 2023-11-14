import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";
import { getSession, updateSession } from "@auth0/nextjs-auth0";
import { Users } from "@/models/Users";

/**
 * Checks for existence of user in db and signs that user in, if it exists and adds DB.id to session
 * If that user does not yet exist in db, creates it.
 * @param req
 * @param res
 * @param db
 */
export const updateUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.user
) => {
  const session = await getSession(req, res);
  if (!session) {
    res.status(500).send({ message: "Please sign in" });
  } else {
    const updateData = JSON.parse(req.body);
    if (updateData.id != session.user.id) {
      res
        .status(500)
        .send({ message: "There was a problem with your request" });
    }
    const userProfile = await Users.update(session.user.id, updateData, db);
    await updateSession(req, res, {
      ...session,
      user: { ...session.user, ...userProfile },
    });
    res.status(200).send(userProfile);
  }
};

/**
 * Checks for existence of user in db and signs that user in, if it exists and adds DB.id to session
 * If that user does not yet exist in db, creates it.
 * @param req
 * @param res
 * @param db
 */
export const getProfile = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.user
) => {
  const session = await getSession(req, res);
  if (!session) {
    res.status(500).send({ message: "Please sign in" });
  } else {
    const updateData = JSON.parse(req.body);
    if (updateData.id != session.user.id) {
      res
        .status(500)
        .send({ message: "There was a problem with your request" });
    }
    const userProfile = await Users.update(session.user.id, updateData, db);
    await updateSession(req, res, {
      ...session,
      user: { ...session.user, ...userProfile },
    });
    res.status(200).send(userProfile);
  }
};

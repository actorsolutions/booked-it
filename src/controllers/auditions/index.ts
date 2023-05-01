import { NextApiRequest, NextApiResponse } from "next";
import { Audition } from "../../models/Auditions";
import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "../../utils/prisma";

/**
 * Gets all Auditions based on UserID and sends them
 * @param req
 * @param res
 * @param db
 */

export const getAuditions = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.audition
) => {
  const session = await getSession(req, res);
  const userId = parseInt(session?.user.id);
  const auditions = await Audition.findByUserId(userId, db);
  if (auditions) {
    res.status(200).send({ auditions });
  } else {
    res.status(500).send({ error: "No Auditions" });
  }
};

/**
 * Adds Audition
 * @param req
 * @param res
 * @param db
 */
export const addAudition = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.audition
) => {
  const session = await getSession(req, res);
  const userId = parseInt(session?.user.id);
  const { date, project, company, casting, notes, type, callBackDate } =
    req.body;
  const auditionData = {
    userId,
    date,
    project,
    company,
    casting: casting || [],
    notes,
    type,
    callBackDate,
  };
  const createdAudition = await Audition.create(auditionData, db);
  res.status(200).send(createdAudition);
};

export const getAudition = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.audition
) => {
  const session = await getSession(req, res);
  const userId = parseInt(session?.user.id);
  const { id } = req.query;
  if (req.body.userId != userId) {
    res.status(401).send({ message: "Unauthorized" });
  }
  const audition = await Audition.findById(parseInt(id as string), userId, db);
  res.status(200).send(audition);
};

export const updateAudition = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.audition
) => {
  const session = await getSession(req, res);
  const userId = parseInt(session?.user.id);
  const audition = new Audition(req.body);
  if (req.body.userId != userId) {
    return res.status(401).send({ message: "Unauthorized" });
  } else {
    await audition.save(db);
    return res.status(200).send(audition);
  }
};

export const deleteAudition = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.audition
) => {
  const session = await getSession(req, res);
  const userId = parseInt(session?.user.id);

  if (userId != req.body.userId) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const deletedAudition = await Audition.delete(req.body, db);
  res.status(200).send({ message: "Deleted!", deletedAudition });
};

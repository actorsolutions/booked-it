import { NextApiRequest, NextApiResponse } from "next";
import { Audition } from "@/models/Auditions";
import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "@/utils/prisma";
import { createStatusChange } from "@/utils/adapters";
import { FormattedStatus } from "@/types/statuschange";

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
  const {
    id,
    date,
    project,
    company,
    casting,
    notes,
    type,
    callBackDate,
    status,
    archived,
    statuses,
  } = JSON.parse(req.body);

  const statusChanges = statuses.map((status: FormattedStatus) => {
    return createStatusChange(status);
  });
  const createAuditionObject = {
    id,
    date,
    project,
    company,
    casting: casting || [],
    notes,
    type,
    callBackDate,
    status,
    archived,
    userId,
    statuses: {
      createMany: {
        data: statusChanges,
      },
    },
  };
  const createdAudition = await Audition.create(createAuditionObject, db);
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
  const audition = await Audition.getFormattedAuditionByUserId(
    parseInt(id as string),
    db
  );
  if (audition.userId != userId) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  return res.status(200).send(audition);
};

export const updateAudition = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.audition
) => {
  const session = await getSession(req, res);
  const sessionUserId = parseInt(session?.user.id);
  const {
    id,
    date,
    project,
    company,
    casting,
    callBackDate,
    notes,
    type,
    status,
    archived,
    statuses,
    userId,
  } = JSON.parse(req.body);
  const statusChanges = statuses.map((status: FormattedStatus) => {
    return createStatusChange(status);
  });
  const updateAuditionObject = {
    id,
    date,
    project,
    company,
    casting: casting || [],
    notes,
    type,
    callBackDate,
    status,
    archived,
    userId: sessionUserId,
    statuses: {
      createMany: {
        data: statusChanges,
      },
    },
  };
  if (userId !== sessionUserId) {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    await prisma.statusChange.deleteMany({ where: { auditionId: id } });
    const audition = await Audition.update(id, updateAuditionObject, db);
    res.status(200).send(audition);
  }
};

export const deleteAudition = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.audition
) => {
  const session = await getSession(req, res);
  const userId = parseInt(session?.user.id);
  const { id } = req.query;
  const deleteConfirmation = await Audition.delete(
    parseInt(id as string),
    userId,
    db
  );

  if (deleteConfirmation.count == 1) {
    return res.status(200).send({ message: "Deleted!" });
  } else {
    return res.status(500).send({ message: "Failed to delete" });
  }
};

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import { Audition } from "@/models/Auditions";

export const getReport = async (
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
  return res.status(200);
};

import { NextApiRequest, NextApiResponse } from "next";
import { Audition } from "../../../utils/models/Auditions";
import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "../../../utils/prisma";

const AuditionsController = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.audition
) => {
  const method = req.method;
  const session = await getSession(req, res);
  const userId = parseInt(session?.user.id);

  if (method === "GET" && session) {
    const auditions = await Audition.findByUserId(userId, db);
    if (auditions) {
      res.status(200).send({ auditions });
    } else {
      res.status(500).send({ error: "No Audition" });
    }
  }
  if (method === "POST" && session) {
    const session = await getSession(req, res);
    const userId = parseInt(session?.user.id);
    const { id, date, project, company, casting, notes, type, callBackDate } =
      req.body;
    const auditionData = {
      id,
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
  }
};

export default AuditionsController;

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Audition } from "../../../utils/models/Auditions";
import { getSession } from "@auth0/nextjs-auth0";

const AuditionsController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const method = req.method;
  if (method === "GET") {
  const session = await getSession(req, res);
  if (req.method === "GET") {
    const prisma = new PrismaClient();
    const userId = parseInt(session?.user.id);
    const auditions = await Audition.findByUserId(userId, prisma["audition"]);
    if (auditions) {
      console.log("Sending Auditions");
      res.status(200).json({ auditions });
    } else {
      res.status(200).json({ auditions: [] });
    }
  }
  if (method === "POST") {
    const prisma = new PrismaClient();
    const {
      id,
      userId,
      date,
      project,
      company,
      casting,
      notes,
      type,
      callBackDate,
    } = req.body;
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
    const createdAudition = await Audition.create(
      auditionData,
      prisma["audition"]
    );
    res.status(200).json({ createdAudition });
  }
};

export default AuditionsController;

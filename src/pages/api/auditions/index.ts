import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Audition } from "../../../utils/models/Auditions";
export const AuditionsController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "GET") {
    const prisma = new PrismaClient();
    console.log(req.query);
    const userId = parseInt(req.query.userId as string);

    const auditions = await Audition.findByUserId(userId, prisma["audition"]);
    if (auditions) {
      console.log("Sending Auditions");
      res.status(200).json({ auditions });
    } else {
      res.status(200).json({ auditions: [] });
    }
  }
};

export default AuditionsController;

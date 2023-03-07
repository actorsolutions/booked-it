import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Auditions } from "../../../utils/models/Auditions";
const AuditionsController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "GET") {
    const prisma = new PrismaClient();
    console.log(req.query.userId);
    const userId = parseInt(req.query.userId);
    console.log(userId);

    const auditions = await new Auditions(prisma.audition).findByUserId(userId);
    console.log(auditions);
    if (auditions) {
      console.log("Sending Auditions");
      res.status(200).json({ auditions });
    } else {
      res.status(200).json({ auditions: [] });
    }
  }
};

export default AuditionsController;

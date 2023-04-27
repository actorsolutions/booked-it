import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Audition } from "../../../utils/models/Auditions";
import { getSession } from "@auth0/nextjs-auth0";
const AuditionsController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession(req, res);
  if (req.method === "GET") {
    const prisma = new PrismaClient();
    const userId = parseInt(session?.user.id);
    const auditions = await Audition.findByUserId(userId, prisma["audition"]);
    if (auditions) {
      console.log("Sending Auditions");
      console.log(auditions);
      res.status(200).json({ auditions });
    } else {
      res.status(200).json({ auditions: [] });
    }
  }
};

export default AuditionsController;

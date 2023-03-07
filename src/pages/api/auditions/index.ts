import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const AuditionsController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "GET") {
    const prisma = new PrismaClient();
    const auditions = await prisma.audition.findMany({
      where: {
        userId: 8,
      },
    });
    if (auditions) {
      console.log("Sending Auditions");
      res.status(200).json({ auditions });
    } else {
      res.status(200).json({ auditions: [] });
    }
  }
};

export default AuditionsController;

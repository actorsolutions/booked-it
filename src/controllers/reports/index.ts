import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import { Report } from "@/models/Report";

export const getReport = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma.audition
) => {
  const session = await getSession(req, res);
  const userId = parseInt(session?.user.id);
  try {
    const reports = await Report.getReportsByUserId(userId, db);
    return res.status(200).send(reports);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};

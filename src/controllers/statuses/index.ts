import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import { StatusChange } from "@/models/StatusChanges";

export const deleteStatus = async (
  req: NextApiRequest,
  res: NextApiResponse,
  db = prisma
) => {
  const session = await getSession(req, res);
  if (session) {
    const { id } = req.query;
    const deleteConfirmation = await StatusChange.delete(
      parseInt(id as string),
      db
    );

    if (deleteConfirmation) {
      return res.status(200).send({ message: "Deleted!" });
    } else {
      return res.status(500).send({ message: "Failed to delete" });
    }
  }
};

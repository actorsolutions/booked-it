import { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "@/middleware/handlers";
import { addAuditions } from "@/controllers";
import { getSession } from "@auth0/nextjs-auth0";

/**
 * Controller for root route of /api/auditions
 * @param req
 * @param res
 * @constructor
 */
const AuditionsController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession(req, res);
  if (!session) {
    return res.status(500).send({ message: "No Session" });
  }
  await RouteHandler(req, res, {
    POST: addAuditions,
  });
};

export default AuditionsController;

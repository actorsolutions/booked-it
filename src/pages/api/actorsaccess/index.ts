import { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "@/middleware/handlers";
import { getSession } from "@auth0/nextjs-auth0";
import { getActorAccessSubmissions } from "@/controllers";

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
  await RouteHandler(req, res, {
    GET: getActorAccessSubmissions,
  });
};

export default AuditionsController;

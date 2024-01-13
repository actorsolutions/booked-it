import { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "@/middleware/handlers";
import { checkAALogin } from "@/controllers";

/**
 * Controller for root route of /api/auditions
 * @param req
 * @param res
 * @constructor
 */
const ActorsAccessController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await RouteHandler(req, res, {
    POST: checkAALogin,
  });
};

export default ActorsAccessController;

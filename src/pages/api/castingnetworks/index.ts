import { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "@/middleware/handlers";
import { getCastingNetworksSubmissions } from "@/controllers";

/**
 * Controller for root route of /api/auditions
 * @param req
 * @param res
 * @constructor
 */
const CastingNetworksController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await RouteHandler(req, res, {
    POST: getCastingNetworksSubmissions,
  });
};

export default CastingNetworksController;

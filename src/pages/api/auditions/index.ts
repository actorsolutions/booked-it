import { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "../../../middleware/handlers";
import { getAuditions, addAudition } from "../../../controllers";

/**
 * Controller for root route of /apiCalls/auditions
 * @param req
 * @param res
 * @constructor
 */
const AuditionsController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await RouteHandler(req, res, {
    GET: getAuditions,
    POST: addAudition,
  });
};

export default AuditionsController;

import { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "@/middleware/handlers";
import {
  getAudition,
  updateAudition,
  deleteAudition,
} from "@/controllers";

/**
 * Controller for a dynamic route that using a specific audition [id]
 * @param req
 * @param res
 * @constructor
 */

const AuditionController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await RouteHandler(req, res, {
    GET: getAudition,
    PUT: updateAudition,
    DELETE: deleteAudition,
  });
};

export default AuditionController;

import { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "@/middleware/handlers";
import { deleteStatus } from "@/controllers/statuses";

/**
 * Controller for a dynamic route that using a specific audition [id]
 * @param req
 * @param res
 * @constructor
 */

const StatusesController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await RouteHandler(req, res, {
    DELETE: deleteStatus,
  });
};

export default StatusesController;

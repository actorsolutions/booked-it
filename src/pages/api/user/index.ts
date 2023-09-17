import { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "@/middleware/handlers";
import { updateUser } from "@/controllers/users";

/**
 * Controller for root route of /api/auditions
 * @param req
 * @param res
 * @constructor
 */
const UserController = async (req: NextApiRequest, res: NextApiResponse) => {
  await RouteHandler(req, res, {
    PUT: updateUser,
  });
};

export default UserController;

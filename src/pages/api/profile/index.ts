import { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "@/middleware/handlers";
import { updateUser, getProfile } from "@/controllers/profile";

/**
 * Controller for root route of /api/auditions
 * @param req
 * @param res
 * @constructor
 */
const UserController = async (req: NextApiRequest, res: NextApiResponse) => {
  await RouteHandler(req, res, {
    PUT: updateUser,
    GET: getProfile,
  });
};

export default UserController;

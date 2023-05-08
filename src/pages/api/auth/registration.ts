import { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "../../../middleware/handlers";
import { registerOrSignInUser } from '../../../controllers/index';

/**
 * Registers a user/signs in an already registered user and adds localDB.user.id to the session data.
 * @param req
 * @param res
 * @constructor
 */
const RegistrationController = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    await RouteHandler(req, res, {
        POST: registerOrSignInUser
    });
};

export default RegistrationController;

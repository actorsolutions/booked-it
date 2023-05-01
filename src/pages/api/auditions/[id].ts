import { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "../../../middleware/handlers";
import {
  deleteAudition,
  getAudition,
  updateAudition,
} from "@/controllers/auditions";

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

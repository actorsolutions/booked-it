import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export const getCastingNetworksSubmissions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const castingNetworksGraphQL =
    "https://app.castingnetworks.com/api-gw/graphql";

  // How do I format a graphql query in a POST request?
  console.log(res);

  res.status(200).send({
    message: "success",
  });
};

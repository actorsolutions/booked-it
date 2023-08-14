import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import CN_SUPPORT from "@/support/casting_networks_support";

const { CN_GRAPHQL_ENDPOINT, QUERIES } = CN_SUPPORT;

/**
 * Sends user account info for authentication, sets bearer token, sends second request for user's list of auditions
 * @param req
 * @param res
 */
export const getCastingNetworksSubmissions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const authHeaders = {
    "content-type": "application/json",
  };

  const authQuery = {
    query: QUERIES.CN_AUTH_QUERY,
  };

  const authenticateAndGetAccessToken = async () => {
    const response = await axios({
      url: CN_GRAPHQL_ENDPOINT,
      method: "post",
      headers: authHeaders,
      data: authQuery,
    });

    return response.data.data.verifyAccount.token.access;
  };

  const accessToken = await authenticateAndGetAccessToken();

  console.log(accessToken);

  const fetchHeaders = {
    "content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const fetchQuery = {
    query: QUERIES.CN_FETCH_AUDITIONS_QUERY,
  };

  const getAuditionInfo = async () => {
    const response = await axios({
      url: CN_GRAPHQL_ENDPOINT,
      method: "post",
      headers: fetchHeaders,
      data: fetchQuery,
    });

    return response.data.data;
  };

  const myAuditions = await getAuditionInfo();

  console.log(myAuditions);

  res.status(200).send({
    message: "Account information acquired",
    data: myAuditions,
  });
};

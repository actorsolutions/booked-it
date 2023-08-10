import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import * as process from "process";

const castingNetworksGraphQL = "https://app.castingnetworks.com/api-gw/graphql";

export const getCastingNetworksSubmissions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const authHeaders = {
    "content-type": "application/json",
  };

  const authQuery = {
    query: `query VerifyAccount {
    verifyAccount(input: {name: "${process.env.CN_USERNAME}", password: "${process.env.CN_PASSWORD}"})
}`,
  };

  try {
    const authenticateAndGetAccessToken = async () => {
      const response = await axios({
        url: castingNetworksGraphQL,
        method: "post",
        headers: authHeaders,
        data: authQuery,
      });

      return response.data.data.verifyAccount.token.access;
    };

    const accessToken = await authenticateAndGetAccessToken();

    console.log(accessToken);

    res.status(200).send({
      message: "Token received",
      data: accessToken,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

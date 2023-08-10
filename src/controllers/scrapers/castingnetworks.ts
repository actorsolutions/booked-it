import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import * as process from "process";

const CN_USERNAME = process.env.CN_USERNAME;
const CN_PASSWORD = process.env.CN_PASSWORD;

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
    verifyAccount(input: {name: "${CN_USERNAME}", password: "${CN_PASSWORD}")
}`,
  };

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

  const fetchHeaders = {
    "content-type": "application/json",
    Authorization: accessToken,
    // Host: "app.castingnetworks.com",
  };

  const fetchQuery = {
    operationName: "YOUR_AUDITIONS",
    variables: {
      page: {
        after: null,
        pageSize: 10,
      },
      sortOptions: {
        orderColumn: "updatedAt",
        orderDirection: "DESC",
      },
    },
    query: `query YOUR_AUDITIONS($page: SearchPageInputWf, $sortOptions: [AuditionsSearchSortOptionsInput!]) {\n  auditions(searchPage: $page, sortOptions: $sortOptions) {\n    __typename\n    page\n    totalCount\n    totalPages\n    after\n    isBasic\n    data {\n      __typename\n      id\n      status\n      repliedAt\n      project {\n        __typename\n        name\n        castingCompany\n      }\n      role {\n        __typename\n        name\n        description\n      }\n      dueDateTimeZone {\n        __typename\n        id\n        abbreviation\n        standardName\n      }\n      profile {\n        __typename\n        isRepresented\n        isPersonal\n        email\n        phone\n        profileMainOrganization {\n          __typename\n          id\n          name\n        }\n        profileMainDivision {\n          __typename\n          id\n          name\n        }\n        profileStatus {\n          __typename\n          code\n        }\n      }\n      mediaList {\n        __typename\n        id\n        isAdditional\n        media {\n          __typename\n          ...WorkflowMedia\n        }\n        __typename\n      }\n    }\n  }\n}\n\nfragment WorkflowMedia on WfMedia {\n  __typename\n  ...BaseWorkflowMedia\n  thumbnail {\n    __typename\n    ...BaseWorkflowMedia\n  }\n}\n\nfragment BaseWorkflowMedia on WfMedia {\n  __typename\n  id: mediaId\n  guid\n  mediaId\n  fileKey\n  thumbnailUrl\n  name\n  url\n  tag\n  mediaStorageStatus {\n    __typename\n    id\n    code\n  }\n  fileType {\n    __typename\n    id\n    code\n    name\n  }\n  mediaType {\n    __typename\n    id\n    code\n  }\n  mediaStatus {\n    __typename\n    id\n    code\n  }\n  transformation {\n    __typename\n    xAxis\n    yAxis\n    width\n    height\n    rotate\n  }\n}`,
  };

  const getUserAuditions = async () => {
    const response = await axios({
      url: castingNetworksGraphQL,
      method: "post",
      headers: fetchHeaders,
      data: fetchQuery,
    });

    console.log(response.data.errors);

    return response.data.data;
  };

  const auditions = await getUserAuditions();

  res.status(200).send({
    message: "got those damn auditions",
    data: auditions,
  });
};

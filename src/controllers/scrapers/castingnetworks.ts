import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import * as process from "process";

const castingNetworksGraphQL = "https://app.castingnetworks.com/api-gw/graphql";

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
    query: `query VerifyAccount {
    verifyAccount(input: {name: "${process.env.CN_USERNAME}", password: "${process.env.CN_PASSWORD}"})
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
    Authorization: `Bearer ${accessToken}`,
  };

  const fetchQuery = {
    query: `query YOUR_AUDITIONS($page: SearchPageInputWf, $sortOptions: [AuditionsSearchSortOptionsInput!]) {
  auditions(searchPage: $page, sortOptions: $sortOptions) {
    __typename
    page
    totalCount
    totalPages
    after
    isBasic
    data {
      __typename
      id
      status
      repliedAt
      project {
        __typename
        name
        castingCompany
      }
      role {
        __typename
        name
        description
      }
      dueDateTimeZone {
        __typename
        id
        abbreviation
        standardName
      }
      profile {
        __typename
        isRepresented
        isPersonal
        email
        phone
        profileMainOrganization {
          __typename
          id
          name
        }
        profileMainDivision {
          __typename
          id
          name
        }
        profileStatus {
          __typename
          code
        }
      }
      mediaList {
        __typename
        id
        isAdditional
        media {
          __typename
          ...WorkflowMedia
        }
        __typename
      }
    }
  }
}

fragment WorkflowMedia on WfMedia {
  __typename
  ...BaseWorkflowMedia
  thumbnail {
    __typename
    ...BaseWorkflowMedia
  }
}

fragment BaseWorkflowMedia on WfMedia {
  __typename
  id: mediaId
  guid
  mediaId
  fileKey
  thumbnailUrl
  name
  url
  tag
  mediaStorageStatus {
    __typename
    id
    code
  }
  fileType {
    __typename
    id
    code
    name
  }
  mediaType {
    __typename
    id
    code
  }
  mediaStatus {
    __typename
    id
    code
  }
  transformation {
    __typename
    xAxis
    yAxis
    width
    height
    rotate
  }
}`,
  };

  const getAuditionInfo = async () => {
    const response = await axios({
      url: castingNetworksGraphQL,
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

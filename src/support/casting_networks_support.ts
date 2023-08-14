import * as process from "process";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  CN_GRAPHQL_ENDPOINT: "https://app.castingnetworks.com/api-gw/graphql",
  QUERIES: {
    CN_AUTH_QUERY: `query VerifyAccount {
    verifyAccount(input: {name: "${process.env.CN_USERNAME}", password: "${process.env.CN_PASSWORD}"})
}`,
    CN_FETCH_AUDITIONS_QUERY: `query YOUR_AUDITIONS($page: SearchPageInputWf, $sortOptions: [AuditionsSearchSortOptionsInput!]) {
  auditions(searchPage: $page, sortOptions: $sortOptions) {
    page
    totalCount
    totalPages
    data {
      id
      repliedAt
      project {
        name
        castingCompany
      }
      role {
        name
        description
      }
      profile {
        profileMainOrganization {
          id
          name
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
  id: mediaId
  guid
  mediaId
  fileKey
  name
  url
}`,
  },
};

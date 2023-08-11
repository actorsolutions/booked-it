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
    Authorization: `"${accessToken}"`,
    Host: "",
  };

  const fetchQuery = {
    query: `query MyAccount {
    myAccount {
        accountOrganizationDivisionsAccessCount
        accountStatusId
        countryId
        created
        email
        emailResetToken
        emailToReset
        firstName
        former
        id
        isAccountIPC
        isAdmin
        isCCD
        isInPCContext
        isIPC
        languageLocaleId
        lastArtistId
        lastLogin
        lastName
        legacyEmail
        legacyInstance
        legacyLogin
        linkedAccountDivisionCount
        linkedOrganization
        linkedToAccountId
        loginAttemptCount
        loginAttemptFailedAt
        organizationDivisionsCount
        passwordHash
        phone
        rosterInvitationToken
        systemRoles
        systemRolesIds
        termsOfUse
        updated
    }
}`,
  };

  const getAccountInfo = async () => {
    const response = await axios({
      url: castingNetworksGraphQL,
      method: "post",
      headers: fetchHeaders,
      data: fetchQuery,
    });

    return response.data.data.myAccount;
  };

  const myAccount = await getAccountInfo();

  console.log(myAccount);

  res.status(200).send({
    message: "Account information acquired",
    data: myAccount,
  });
};

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

/**
 * Generates a session cookie and spoofs login with Auth0
 */
export const login = () => {
  cy.intercept("GET", "/api/auth/me", {
    statusCode: 200,
    body: {
      nickname: "test.user",
      name: "test.user@email.com",
      picture:
        "https://s.gravatar.com/avatar/5a86c4f810671cfc74c8a2b562f99a74?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
      updated_at: "2023-05-14T05:45:49.525Z",
      email: "test.user@email.com",
      email_verified: false,
      sub: "auth0|63f5c556c8c54d340a113d29",
      sid: "1MRVj_nf2Gy4RSjaNjTIaUZWX3Djf0w-",
      id: 3,
    },
  }).as("Auth0");

  cy.intercept("GET", "/api/auth/me", {
    statusCode: 200,
    body: {
      nickname: "test.user",
      name: "test.user@email.com",
      picture:
        "https://s.gravatar.com/avatar/5a86c4f810671cfc74c8a2b562f99a74?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
      updated_at: "2023-05-14T05:45:49.525Z",
      email: "test.user@email.com",
      email_verified: false,
      sub: "auth0|63f5c556c8c54d340a113d29",
      sid: "1MRVj_nf2Gy4RSjaNjTIaUZWX3Djf0w-",
      id: 3,
    },
  }).as("Auth0");
  cy.intercept("GET", "/api/auditions").as("getAuditions");
  cy.intercept("PUT", "/api/auditions/**").as("updateAudition");
  cy.intercept("POST", "/api/auditions").as("createAudition");
  cy.intercept("POST", "/api/auditions/createmany").as("createMany");
  cy.generateSession().then((data: string) => {
    cy.setCookie("appSession", data);
  });
};

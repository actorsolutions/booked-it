/// <reference types="cypress" />
import { CY_TAGS } from "../../src/types/cypress_tags";
export const cyTag = (str: string) => `[data-cy='${str}']`;

describe("Fire up", () => {
  it("should land on the login page", () => {
    cy.visit("/");
    cy.get(cyTag(CY_TAGS.LOG_IN_BUTTON)).should("be.visible");
    cy.get(cyTag(CY_TAGS.LOG_IN_BUTTON)).click();
  });
  it("should login", () => {
    cy.task("db:seed");
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
    });
    cy.generateSession().then((data: string) => {
      cy.setCookie("appSession", data);
    });

    cy.visit("/");
    cy.get(cyTag(CY_TAGS.LOG_IN_BUTTON)).should("not.exist");
  });
});

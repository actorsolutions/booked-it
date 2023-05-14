/// <reference types="cypress" />
import { CY_TAGS } from "../../src/types/cypress_tags";
import { audition_statuses, audition_types } from "@/types";

export const cyTag = (str: string) => `[data-cy='${str}']`;

describe("Fire up", () => {
  it("should land on the login page", () => {
    cy.visit("/");
    cy.get(cyTag(CY_TAGS.LOG_IN_BUTTON)).should("be.visible");
    cy.get(cyTag(CY_TAGS.LOG_IN_BUTTON)).click();
  });
  it.only("should login", () => {
    // cy.intercept("POST", "/api/auth/registration", {
    //   statusCode: 200,
    //   body: {
    //     createdAt: "00000",
    //     email: "test.user@email.com",
    //     id: 3,
    //     sid: "whofuckingcares",
    //   },
    // });
    // cy.intercept("GET", "/api/auth/me", {
    //   statusCode: 200,
    //   body: {
    //     nickname: "test.user",
    //     name: "test.user@email.com",
    //     picture:
    //       "https://s.gravatar.com/avatar/5a86c4f810671cfc74c8a2b562f99a74?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
    //     updated_at: "2023-05-14T05:45:49.525Z",
    //     email: "test.user@email.com",
    //     email_verified: false,
    //     sub: "auth0|63f5c556c8c54d340a113d29",
    //     sid: "1MRVj_nf2Gy4RSjaNjTIaUZWX3Djf0w-",
    //     id: 3,
    //   },
    // });
    // cy.intercept("GET", "/api/auditions", {
    //   statusCode: 200,
    //   body: {
    //     auditions: [
    //       {
    //         id: 1,
    //         userId: 1,
    //         date: new Date("01/01/23").getTime(),
    //         project: "Star Wars 10",
    //         casting: [],
    //         company: "Disney",
    //         notes: "really apprehensive about this one",
    //         type: "film",
    //         status: "scheduled",
    //         archived: false,
    //         createdAt: 0,
    //       },
    //       {
    //         id: 2,
    //         userId: 1,
    //         date: new Date("02/02/23").getTime(),
    //         casting: [],
    //         project: "Bounce",
    //         company: "Denardi Studios",
    //         notes: "Hilarious startup sitcom",
    //         type: "television",
    //         status: "callback",
    //         archived: false,
    //         createdAt: 0,
    //       },
    //     ],
    //   },
    // });
    cy.intercept("GET", "api/auth/login", {
      statusCode: 200,
    });

    cy.generateSession().then((data) => {
      cy.log(data);
    });
    cy.visit("/").reload();
  });
});

/// <reference types="cypress" />
import CY_TAGS from "../../src/support/cypress_tags";
import { cyTag, login } from "../support/e2e";

const { LANDING_PAGE, AUDITIONS_SECTION } = CY_TAGS;

describe("Landing Page E2E Tests", () => {
  it("should land on the login page", () => {
    cy.visit("/");
    cy.get(cyTag(LANDING_PAGE.BUTTONS.LOG_IN)).should("be.visible");
  });
  it("should login", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.get(cyTag(LANDING_PAGE.BUTTONS.LOG_IN)).should("not.exist");
  });
  it("should show one Audition Row", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");
    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).should(
      "be.visible"
    );
  });
});

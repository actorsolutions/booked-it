/// <reference types="cypress" />
import CY_TAGS from "../../src/support/cypress_tags";
import { login, shouldBeVisible, shouldNotExist } from "../support/e2e";

const { LANDING_PAGE, AUDITIONS_SECTION } = CY_TAGS;

describe("Landing Page E2E Tests", () => {
  it("should land on the login page", () => {
    cy.visit("/");
    shouldBeVisible(LANDING_PAGE.BUTTONS.LOG_IN);
  });
  it("should login", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    shouldNotExist(LANDING_PAGE.BUTTONS.LOG_IN);
    shouldBeVisible(CY_TAGS.NAV_BAR.CONTAINER.NAV_BAR);
    shouldBeVisible(CY_TAGS.NAV_BAR.BUTTONS.LOGOUT);
  });
  it("should show one Audition Row", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");
    shouldBeVisible(AUDITIONS_SECTION.CONTAINERS.AUDITIONS_CONTAINER);
    shouldBeVisible(LANDING_PAGE.GRAPH.PIE_CHART);
    shouldBeVisible(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0");
  });
});

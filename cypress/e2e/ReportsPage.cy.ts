/// <reference types="cypress" />
import CY_TAGS from "../../src/support/cypress_tags";
import { login } from "../support/e2e";
import { findAndClick, shouldBeVisible } from "../support/helperFunctions";

const { NAV_BAR, REPORTS } = CY_TAGS;

describe("Reports Page E2E tests", () => {
  it("should show links for Dashboard and Reports on landing page", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");
    shouldBeVisible(NAV_BAR.CONTAINER.NAV_BAR);
    shouldBeVisible(NAV_BAR.BUTTONS.DASHBOARD);
    shouldBeVisible(NAV_BAR.BUTTONS.REPORTS);
  });
  it("should navigate to Reports page when link is clicked", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");
    findAndClick(NAV_BAR.BUTTONS.REPORTS);
    shouldBeVisible(REPORTS.TITLE);
  });
});

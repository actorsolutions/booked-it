/// <reference types="cypress" />
import CY_TAGS from "../../src/support/cypress_tags";
import {findAndClick, login, shouldBeVisible, shouldNotExist, cyTag} from "../support/e2e";

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
  it("audition row item should expand and collapse", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");
    shouldBeVisible(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0");
    findAndClick(AUDITIONS_SECTION.BUTTONS.EXPAND_MORE);
    shouldBeVisible(AUDITIONS_SECTION.CONTAINERS.ACCORDION_DETAILS);
    shouldBeVisible(AUDITIONS_SECTION.BUTTONS.DELETE_AUDITION);
    findAndClick(AUDITIONS_SECTION.BUTTONS.EXPAND_MORE);
    shouldNotExist(AUDITIONS_SECTION.CONTAINERS.ACCORDION_DETAILS);
    shouldNotExist(AUDITIONS_SECTION.BUTTONS.DELETE_AUDITION);
  });
  it("should archive an audition and update audition list", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).within(() => {
      findAndClick(AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION)
    })

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).should(
        "have.attr",
        "data-cy",
        `${AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW}0`
    );

    cy.get(cyTag(AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION)).click();

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).should(
        "not.have.attr",
        "data-cy",
        `${AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW}0`
      );
  });
  // it should archive, check to make sure its archived, reload the page, make sure it's still archived
  // unarchive it, make sure tha it's unarchived, reload, make sure it is still unarchived
  // it("should delete an audition and update audition list");
});

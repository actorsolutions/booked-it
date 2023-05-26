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
  it("audition row item should expand and collapse", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");
    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).within(() => {
      cy.get(cyTag(AUDITIONS_SECTION.BUTTONS.EXPAND_MORE)).click();
      cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.ACCORDION_DETAILS)).should(
          "be.visible"
      );
      cy.get(cyTag(AUDITIONS_SECTION.BUTTONS.DELETE_AUDITION)).should(
          "be.visible"
      );
      cy.get(cyTag(AUDITIONS_SECTION.BUTTONS.EXPAND_MORE)).click();
    });
    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.ACCORDION_DETAILS)).should(
        "not.exist"
    );
    cy.get(cyTag(AUDITIONS_SECTION.BUTTONS.DELETE_AUDITION)).should(
        "not.exist"
    );
  });
  it("should archive an audition and update audition list", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).within(() => {
      cy.get(cyTag(AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION)).click()
    })

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).should(
          "have.attr",
          "data-cy",
          `${AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW}0.archived`
      );

    cy.get(cyTag(AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION)).click();

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).should(
          "not.have.attr",
          "data-cy",
          `${AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW}0.archived`
      );
  });
  // it should archive, check to make sure its archived, reload the page, make sure it's still archived
  // unarchive it, make sure tha it's unarchived, reload, make sure it is still unarchived
  // it("should delete an audition and update audition list");
});

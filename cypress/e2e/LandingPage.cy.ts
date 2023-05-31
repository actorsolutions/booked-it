/// <reference types="cypress" />
import CY_TAGS from "../../src/support/cypress_tags";
import {
  findAndClick,
  login,
  shouldBeVisible,
  shouldNotExist,
  shouldContainText,
  cyTag,
} from "../support/e2e";

const { LANDING_PAGE, AUDITIONS_SECTION, NEEDS_ATTENTION_SECTION } = CY_TAGS;

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

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).within(
      () => {
        shouldContainText(
          AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION,
          "Archive"
        );
        findAndClick(AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION);
        shouldContainText(
          AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION,
          "Unarchive"
        );
      }
    );
  });
  it("should archive an audition, confirm it is archived, reload the page, confirm archive has persisted", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).within(
      () => {
        shouldContainText(
          AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION,
          "Archive"
        );
        findAndClick(AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION);
        shouldContainText(
          AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION,
          "Unarchive"
        );
      }
    );

    cy.reload();

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).within(
      () => {
        shouldContainText(
          AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION,
          "Unarchive"
        );
      }
    );
  });
  it("should unarchive unarchive an audition, confirm it is unarchived, reload, confirm unarchive persisted", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).within(
      () => {
        shouldContainText(
          AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION,
          "Archive"
        );
        findAndClick(AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION);
        shouldContainText(
          AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION,
          "Unarchive"
        );
        findAndClick(AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION);
        shouldContainText(
          AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION,
          "Archive"
        );
      }
    );

    cy.reload();

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).within(
      () => {
        shouldContainText(
          AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION,
          "Archive"
        );
      }
    );
  });
  it("should delete an audition and update audition list", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).within(
      () => {
        cy.get("div").contains("Project:").invoke("text").as("projectName");
        findAndClick(AUDITIONS_SECTION.BUTTONS.EXPAND_MORE);
        findAndClick(AUDITIONS_SECTION.BUTTONS.DELETE_AUDITION);
      }
    );

    cy.contains("@projectName").should("not.exist");

    cy.reload();

    cy.contains("@projectName").should("not.exist");
  });
  it("should show the needs attention section", () => {
    cy.task("db:seed");
    login();

    cy.visit("/");
    cy.wait("@Auth0");
    cy.wait("@getAuditions");

    shouldBeVisible(
      NEEDS_ATTENTION_SECTION.CONTAINER.NEEDS_ATTENTION_CONTAINER
    );
  });
  it("should show click the archive button and update main list, and remove from needs attention", () => {
    cy.task("db:seed");
    login();

    cy.visit("/");
    cy.wait("@Auth0");
    cy.wait("@getAuditions");

    shouldBeVisible(
      NEEDS_ATTENTION_SECTION.CONTAINER.NEEDS_ATTENTION_CONTAINER
    );
    findAndClick(NEEDS_ATTENTION_SECTION.BUTTONS.ARCHIVE_AUDITION);
    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "0")).within(
      () => {
        shouldContainText(
          AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION,
          "Unarchive"
        );
      }
    );
  });
});

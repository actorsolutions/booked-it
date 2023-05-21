/// <reference types="cypress" />
import CY_TAGS from "../../src/support/cypress_tags";
import {
  login,
  cyTag,
  findAndClick,
  addToInput,
  addSelectItem,
} from "../support/e2e";

const { AUDITIONS_SECTION, AUDITION_FORM } = CY_TAGS;
describe("Add Auditions Form E2E Tests", () => {
  beforeEach(() => {
    // setUp();
  });
  it("Should not show add audition button while not logged in", () => {
    cy.task("db:seed");
    cy.visit("/");
    // cy.get(cyTag(LANDING_PAGE.BUTTONS.LOG_IN)).should("be.visible");
  });

  it("Should add one audition and show on list", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");

    findAndClick(AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION);

    cy.get(cyTag(AUDITION_FORM.CONTAINERS.FORM_CONTAINER)).should("be.visible");

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get(cyTag(AUDITION_FORM.PICKERS.DATE)).click().type("01012023");

    addSelectItem(
      AUDITION_FORM.DROPDOWNS.TYPE,
      AUDITION_FORM.DROPDOWNS.OPTIONS.TYPE,
      "Television"
    );
    addSelectItem(
      AUDITION_FORM.DROPDOWNS.STATUS,
      AUDITION_FORM.DROPDOWNS.OPTIONS.STATUS,
      "Booked"
    );

    addToInput(AUDITION_FORM.INPUTS.PROJECT, "WallyWorld");
    addToInput(AUDITION_FORM.INPUTS.COMPANY, "WallyCorp");
    addToInput(AUDITION_FORM.TEXT_AREA.NOTES, "Wally is a good boy");
    findAndClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    cy.get(cyTag(AUDITION_FORM.CONTAINERS.FORM_CONTAINER)).should("not.exist");

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "1")).should(
      "be.visible"
    );
  });

  it("should exit out of form if clicked out of form", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");
    findAndClick(AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION);

    cy.get(cyTag(AUDITION_FORM.CONTAINERS.FORM_CONTAINER)).should("be.visible");
    cy.get("body").click(0, 0);
    cy.get(cyTag(AUDITION_FORM.CONTAINERS.FORM_CONTAINER)).should("not.exist");
  });
});

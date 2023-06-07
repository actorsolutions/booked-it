/// <reference types="cypress" />
import CY_TAGS from "../../src/support/cypress_tags";
import {
  login,
  cyTag,
  findAndClick,
  addToInput,
  addSelectItem,
  shouldBeVisible,
  shouldNotExist,
} from "../support/e2e";

const { AUDITIONS_SECTION, AUDITION_FORM } = CY_TAGS;
describe("Add Auditions Form E2E Tests", () => {
  it("Should not show add audition button while not logged in", () => {
    cy.task("db:seed");
    cy.visit("/");
  });

  it("Should add one audition and show on list", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");

    findAndClick(AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION);

    cy.get(cyTag(AUDITION_FORM.CONTAINERS.FORM_CONTAINER)).should("be.visible");

    //TODO: (BI-59) Better Datepicker Logic
    //eslint-disable-next-line cypress/unsafe-to-chain-command
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
    shouldNotExist(AUDITION_FORM.CONTAINERS.FORM_CONTAINER);

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
    shouldNotExist(AUDITION_FORM.CONTAINERS.FORM_CONTAINER);
  });

  it("Should show errors on each form that is invalid", () => {
    const errorsArray = [
      AUDITION_FORM.ERRORS.STATUS,
      AUDITION_FORM.ERRORS.TYPE,
      AUDITION_FORM.ERRORS.DATE,
      AUDITION_FORM.ERRORS.COMPANY,
      AUDITION_FORM.ERRORS.PROJECT,
    ];
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");

    findAndClick(AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION);

    cy.get(cyTag(AUDITION_FORM.CONTAINERS.FORM_CONTAINER)).should("be.visible");
    findAndClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    errorsArray.forEach((tag) => {
      shouldBeVisible(tag);
    });

    //TODO: (BI-59) Better Datepicker Logic
    //eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get(cyTag(AUDITION_FORM.PICKERS.DATE)).click().type("01012023");
    findAndClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.DATE);

    addSelectItem(
      AUDITION_FORM.DROPDOWNS.TYPE,
      AUDITION_FORM.DROPDOWNS.OPTIONS.TYPE,
      "Television"
    );
    findAndClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.TYPE);

    addSelectItem(
      AUDITION_FORM.DROPDOWNS.STATUS,
      AUDITION_FORM.DROPDOWNS.OPTIONS.STATUS,
      "Booked"
    );
    findAndClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.STATUS);

    addToInput(AUDITION_FORM.INPUTS.PROJECT, "WallyWorld");
    findAndClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.PROJECT);

    addToInput(AUDITION_FORM.INPUTS.COMPANY, "WallyCorp");

    addToInput(AUDITION_FORM.TEXT_AREA.NOTES, "Wally is a good boy");

    findAndClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.COMPANY);

    cy.get(cyTag(AUDITION_FORM.CONTAINERS.FORM_CONTAINER)).should("not.exist");

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "1")).should(
      "be.visible"
    );
  });
  it("Should show success Snackbar message when audition is created", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");

    findAndClick(AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION);

    cy.get(cyTag(AUDITION_FORM.CONTAINERS.FORM_CONTAINER)).should("be.visible");

    //TODO: (BI-59) Better Datepicker Logic
    //eslint-disable-next-line cypress/unsafe-to-chain-command
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
    shouldNotExist(AUDITION_FORM.CONTAINERS.FORM_CONTAINER);

    cy.contains("Audition created successfully. Woo!").should("be.visible");
  });
  it("Should show error Snackbar message when audition fails to create", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");

    findAndClick(AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION);

    cy.get(cyTag(AUDITION_FORM.CONTAINERS.FORM_CONTAINER)).should("be.visible");

    //TODO: (BI-59) Better Datepicker Logic
    //eslint-disable-next-line cypress/unsafe-to-chain-command
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

    cy.intercept("POST", "/api/auditions", {
      statusCode: 500,
      body: "Failed to create audition",
    }).as("createAudition");

    findAndClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);

    cy.contains("Encountered a problem trying to create that audition. Please contact Zach and Tyler.").should("be.visible");
  });
});

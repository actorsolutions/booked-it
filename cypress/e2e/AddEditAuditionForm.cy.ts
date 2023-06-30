/// <reference types="cypress" />
import CY_TAGS from "../../src/support/cypress_tags";
import {
  login,
  cyTag,
  findAndClick,
  addToInput,
  selectItem,
  shouldNotExist,
  clickCalendarDate,
  shouldContainText,
  checkNestedInput,
  clearNestedInput,
  scrollAndFind,
  scrollFindClick,
} from "../support/e2e";

const { AUDITIONS_SECTION, LANDING_PAGE, AUDITION_FORM } = CY_TAGS;
const today = new Date();
today.setHours(0, 0, 0, 0);

describe("Add Auditions Form E2E Tests", () => {
  // Note : Keeping this in because I'd like to utilize it in the future.
  // beforeEach(() => {
  //   cy.clock(Date.UTC(2023, 5, 1), ["Date"]);
  // });
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

    clickCalendarDate(today.valueOf().toString());

    addToInput(AUDITION_FORM.INPUTS.PROJECT, "WallyWorld");
    selectItem(
      AUDITION_FORM.DROPDOWNS.TYPE,
      AUDITION_FORM.DROPDOWNS.OPTIONS.TYPE,
      "Television"
    );
    selectItem(
      AUDITION_FORM.DROPDOWNS.STATUS,
      AUDITION_FORM.DROPDOWNS.OPTIONS.STATUS,
      "Booked"
    );

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
    scrollFindClick(AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION);

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
    scrollFindClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    errorsArray.forEach((tag) => {
      scrollAndFind(tag);
    });

    clickCalendarDate(today.valueOf().toString());

    scrollFindClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.DATE);

    selectItem(
      AUDITION_FORM.DROPDOWNS.TYPE,
      AUDITION_FORM.DROPDOWNS.OPTIONS.TYPE,
      "Television"
    );
    scrollFindClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.TYPE);

    selectItem(
      AUDITION_FORM.DROPDOWNS.STATUS,
      AUDITION_FORM.DROPDOWNS.OPTIONS.STATUS,
      "Booked"
    );
    findAndClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.STATUS);

    addToInput(AUDITION_FORM.INPUTS.PROJECT, "WallyWorld");
    scrollFindClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.PROJECT);

    addToInput(AUDITION_FORM.INPUTS.COMPANY, "WallyCorp");

    addToInput(AUDITION_FORM.TEXT_AREA.NOTES, "Wally is a good boy");

    scrollFindClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.COMPANY);

    cy.get(cyTag(AUDITION_FORM.CONTAINERS.FORM_CONTAINER)).should("not.exist");

    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "1")).should(
      "be.visible"
    );
  });

  it("Should edit an audition entry", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");
    findAndClick(AUDITIONS_SECTION.BUTTONS.EXPAND_MORE);
    findAndClick(AUDITIONS_SECTION.BUTTONS.EDIT_AUDITION);
    shouldContainText(AUDITION_FORM.TITLE, "Edit Audition");
    checkNestedInput(AUDITION_FORM.PICKERS.DATE, "05/01/2023");
    shouldContainText(AUDITION_FORM.DROPDOWNS.STATUS, "Scheduled");
    shouldContainText(AUDITION_FORM.DROPDOWNS.TYPE, "Television");
    checkNestedInput(AUDITION_FORM.INPUTS.PROJECT, "Test Project");
    selectItem(
      AUDITION_FORM.DROPDOWNS.STATUS,
      AUDITION_FORM.DROPDOWNS.OPTIONS.STATUS,
      "Booked"
    );
    clearNestedInput(AUDITION_FORM.INPUTS.PROJECT);
    findAndClick(AUDITION_FORM.INPUTS.PROJECT);
    addToInput(AUDITION_FORM.INPUTS.PROJECT, "Updated");
    scrollFindClick(AUDITION_FORM.BUTTONS.EDIT_AUDITION);
    findAndClick(AUDITIONS_SECTION.BUTTONS.EDIT_AUDITION);
    shouldContainText(AUDITION_FORM.DROPDOWNS.STATUS, "Booked");
    checkNestedInput(AUDITION_FORM.INPUTS.PROJECT, "Updated");
  });
  it("Should show success Snackbar message when audition is created", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");

    findAndClick(AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION);

    cy.get(cyTag(AUDITION_FORM.CONTAINERS.FORM_CONTAINER)).should("be.visible");

    clickCalendarDate(today.valueOf().toString());

    addToInput(AUDITION_FORM.INPUTS.PROJECT, "WallyWorld");

    selectItem(
      AUDITION_FORM.DROPDOWNS.TYPE,
      AUDITION_FORM.DROPDOWNS.OPTIONS.TYPE,
      "Television"
    );
    selectItem(
      AUDITION_FORM.DROPDOWNS.STATUS,
      AUDITION_FORM.DROPDOWNS.OPTIONS.STATUS,
      "Booked"
    );

    addToInput(AUDITION_FORM.INPUTS.COMPANY, "WallyCorp");
    addToInput(AUDITION_FORM.TEXT_AREA.NOTES, "Wally is a good boy");
    scrollFindClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.CONTAINERS.FORM_CONTAINER);

    cy.get(cyTag(LANDING_PAGE.CONTAINERS.SNACKBAR_CONTAINER)).within(() => {
      cy.contains("Audition created successfully. Woo!").should("be.visible");
    });
  });
  it("Should show error Snackbar message when audition fails to create", () => {
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");

    findAndClick(AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION);

    cy.get(cyTag(AUDITION_FORM.CONTAINERS.FORM_CONTAINER)).should("be.visible");

    clickCalendarDate(today.valueOf().toString());
    addToInput(AUDITION_FORM.INPUTS.PROJECT, "WallyWorld");
    selectItem(
      AUDITION_FORM.DROPDOWNS.TYPE,
      AUDITION_FORM.DROPDOWNS.OPTIONS.TYPE,
      "Television"
    );
    selectItem(
      AUDITION_FORM.DROPDOWNS.STATUS,
      AUDITION_FORM.DROPDOWNS.OPTIONS.STATUS,
      "Booked"
    );

    addToInput(AUDITION_FORM.INPUTS.COMPANY, "WallyCorp");
    addToInput(AUDITION_FORM.TEXT_AREA.NOTES, "Wally is a good boy");

    cy.intercept("POST", "/api/auditions", {
      statusCode: 500,
      body: "Failed to create audition",
    }).as("createAudition");

    scrollFindClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);

    cy.get(cyTag(LANDING_PAGE.CONTAINERS.SNACKBAR_CONTAINER)).within(() => {
      cy.contains(
        "Encountered a problem trying to create that audition. Please contact Zach and Tyler."
      ).should("be.visible");
    });
  });
});

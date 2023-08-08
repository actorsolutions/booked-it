/// <reference types="cypress" />
import CY_TAGS from "../../src/support/cypress_tags";
import {
  addToInput,
  shouldBeVisible,
  validateInputValue,
  findAndClick,
  mockRequest,
  validateCellText,
  cyTag,
  checkTextInSnackbar,
} from "../support/helperFunctions";
import { login } from "../support/e2e";
import {
  successfulIntegration,
  unsuccessfullIntegration,
  noAuditions,
} from "../support/mockData/mockActorsAccess";
import RESPONSE_MESSAGES from "../../src/support/response_messages";
const { ACTORS_ACCESS_IMPORT, AUDITIONS_SECTION } = CY_TAGS;

describe("Actors Access Link", () => {
  beforeEach(() => {
    cy.task("db:seed");
  });
  afterEach(() => {
    cy.task("db:sanitize");
  });
  it("should navigate to the Actors Access Link page", () => {
    cy.visit("/actorsaccess");
    login();
    shouldBeVisible(ACTORS_ACCESS_IMPORT.TITLE);
  });
  it("should link to AA endpoint and table should populate and add two auditions to auditions container", () => {
    login();
    mockRequest(
      "POST",
      "/api/actorsaccess",
      successfulIntegration,
      "linkActorsAccess"
    );
    cy.visit("/actorsaccess");
    const expectedValues = {
      userName: "username",
      password: "password",
    };
    shouldBeVisible(ACTORS_ACCESS_IMPORT.TITLE);
    addToInput(
      ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.USERNAME_INPUT,
      expectedValues.userName
    );
    addToInput(
      ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.PASSWORD_INPUT,
      expectedValues.password
    );
    validateInputValue(
      ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.USERNAME_INPUT,
      expectedValues.userName
    );
    validateInputValue(
      ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.PASSWORD_INPUT,
      expectedValues.password
    );
    findAndClick(ACTORS_ACCESS_IMPORT.BUTTONS.LINK_BUTTON);
    shouldBeVisible(ACTORS_ACCESS_IMPORT.LOADING_CIRCLE);

    cy.wait("@linkActorsAccess");

    validateCellText(0, "project", successfulIntegration.data[0].project);
    validateCellText(0, "role", successfulIntegration.data[0].role);
    validateCellText(0, "casting", successfulIntegration.data[0].casting);
    validateCellText(
      0,
      "date",
      new Date(successfulIntegration.data[0].date).toLocaleDateString("en-US")
    );

    validateCellText(1, "project", successfulIntegration.data[1].project);
    validateCellText(1, "role", successfulIntegration.data[1].role);
    validateCellText(1, "casting", successfulIntegration.data[1].casting);
    validateCellText(
      1,
      "date",
      new Date(successfulIntegration.data[1].date).toLocaleDateString("en-US")
    );

    findAndClick(ACTORS_ACCESS_IMPORT.BUTTONS.IMPORT_BUTTON);
    shouldBeVisible(AUDITIONS_SECTION.CONTAINERS.AUDITIONS_CONTAINER);

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "1"))
      .scrollIntoView()
      .should("be.visible");

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "2"))
      .scrollIntoView()
      .should("be.visible");
  });
  it("should show a snackbar message when AA fails to link", () => {
    login();
    mockRequest(
      "POST",
      "/api/actorsaccess",
      unsuccessfullIntegration,
      "linkActorsAccess"
    );
    cy.visit("/actorsaccess");

    shouldBeVisible(ACTORS_ACCESS_IMPORT.TITLE);
    addToInput(
      ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.USERNAME_INPUT,
      "username"
    );
    addToInput(
      ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.PASSWORD_INPUT,
      "password"
    );

    findAndClick(ACTORS_ACCESS_IMPORT.BUTTONS.LINK_BUTTON);
    shouldBeVisible(ACTORS_ACCESS_IMPORT.LOADING_CIRCLE);
    cy.wait("@linkActorsAccess");
    checkTextInSnackbar(RESPONSE_MESSAGES.ACTORS_ACCESS_MESSAGES.LOGIN_FAILURE);
  });
  it("should show a snackbar message when api returns no auditions", () => {
    login();
    mockRequest("POST", "/api/actorsaccess", noAuditions, "linkActorsAccess");
    cy.visit("/actorsaccess");

    shouldBeVisible(ACTORS_ACCESS_IMPORT.TITLE);
    addToInput(
      ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.USERNAME_INPUT,
      "username"
    );
    addToInput(
      ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.PASSWORD_INPUT,
      "password"
    );

    findAndClick(ACTORS_ACCESS_IMPORT.BUTTONS.LINK_BUTTON);
    shouldBeVisible(ACTORS_ACCESS_IMPORT.LOADING_CIRCLE);
    cy.wait("@linkActorsAccess");
    checkTextInSnackbar(RESPONSE_MESSAGES.ACTORS_ACCESS_MESSAGES.NO_AUDITIONS);
  });
  it("should fire off submit with enter key", () => {
    login();
    mockRequest(
      "POST",
      "/api/actorsaccess",
      successfulIntegration,
      "linkActorsAccess"
    );
    cy.visit("/actorsaccess");
    const expectedValues = {
      userName: "username",
      password: "password",
    };
    shouldBeVisible(ACTORS_ACCESS_IMPORT.TITLE);
    addToInput(
      ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.USERNAME_INPUT,
      expectedValues.userName
    );
    addToInput(
      ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.PASSWORD_INPUT,
      expectedValues.password + "{enter}"
    );
    validateInputValue(
      ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.USERNAME_INPUT,
      expectedValues.userName
    );
    validateInputValue(
      ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.PASSWORD_INPUT,
      expectedValues.password
    );
    findAndClick(ACTORS_ACCESS_IMPORT.USER_FORM.INPUTS.PASSWORD_INPUT);
    shouldBeVisible(ACTORS_ACCESS_IMPORT.LOADING_CIRCLE);
    cy.wait("@linkActorsAccess");
    validateCellText(0, "project", successfulIntegration.data[0].project);
    validateCellText(0, "role", successfulIntegration.data[0].role);
    validateCellText(0, "casting", successfulIntegration.data[0].casting);
    validateCellText(
      0,
      "date",
      new Date(successfulIntegration.data[0].date).toLocaleDateString("en-US")
    );

    validateCellText(1, "project", successfulIntegration.data[1].project);
    validateCellText(1, "role", successfulIntegration.data[1].role);
    validateCellText(1, "casting", successfulIntegration.data[1].casting);
    validateCellText(
      1,
      "date",
      new Date(successfulIntegration.data[1].date).toLocaleDateString("en-US")
    );
  });
});

/// <reference types="cypress" />
import CY_TAGS from "../../src/support/cypress_tags";
import {
  addToInput,
  shouldBeVisible,
  validateInputValue,
  findAndClick,
  mockRequest,
  validateCellText,
} from "../support/helperFunctions";
import { login } from "../support/e2e";
import { successfulIntegration } from "../support/mockData/mockActorsAccess";
const { ACTORS_ACCESS_IMPORT } = CY_TAGS;

describe("Actors Access Link", () => {
  it("should navigate to the Actors Access Link page", () => {
    cy.visit("/actorsaccess");
    shouldBeVisible(ACTORS_ACCESS_IMPORT.TITLE);
  });
  it("should add a username and password into the inputs and hit correct API", () => {
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
    findAndClick(ACTORS_ACCESS_IMPORT.BUTTON);
    cy.wait("@linkActorsAccess");
    const expectedCellValues = {
      project: successfulIntegration.data[0].project,
      role: successfulIntegration.data[0].role,
      casting: successfulIntegration.data[0].casting,
      date: "12/31/1969",
    };
    validateCellText(0, "project", expectedCellValues.project);
    validateCellText(0, "role", expectedCellValues.role);
    validateCellText(0, "casting", expectedCellValues.casting);
    validateCellText(0, "date", expectedCellValues.date);
  });
});

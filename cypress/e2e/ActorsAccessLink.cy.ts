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
  it("should link to AA endpoint and table should populate", () => {
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
      date: "12/31/1969",
    };
    validateCellText(0, "project", successfulIntegration.data[0].project);
    validateCellText(0, "role", successfulIntegration.data[0].role);
    validateCellText(0, "casting", successfulIntegration.data[0].casting);
    validateCellText(0, "date", expectedCellValues.date);

    validateCellText(1, "project", successfulIntegration.data[1].project);
    validateCellText(1, "role", successfulIntegration.data[1].role);
    validateCellText(1, "casting", successfulIntegration.data[1].casting);
    validateCellText(1, "date", expectedCellValues.date);
  });
});

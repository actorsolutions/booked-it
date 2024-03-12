/// <reference types="cypress" />
import CY_TAGS from "../../src/support/cypress_tags";
import { login } from "../support/e2e";
import {
  addToInput,
  cyTag,
  findAndClick,
  shouldBeVisible,
  shouldNotExist,
  validateInputValue,
} from "../support/helperFunctions";

const { NAV_BAR, PROFILE_FORM } = CY_TAGS;

describe("Profile Modal E2E tests", () => {
  it("Should fill out the profile form, ", () => {
    const expected = {
      FIRST_NAME: "Test",
      LAST_NAME: "Name",
      AA_UN: "Username",
      AA_PW: "Password",
    };
    cy.task("db:seed");

    login();
    cy.visit("/");
    cy.wait("@Auth0");
    shouldBeVisible(NAV_BAR.CONTAINER.NAV_BAR);
    shouldBeVisible(NAV_BAR.BUTTONS.DASHBOARD);
    shouldBeVisible(NAV_BAR.BUTTONS.PROFILE);
    findAndClick(NAV_BAR.BUTTONS.PROFILE);

    addToInput(PROFILE_FORM.INPUT.FIRST_NAME, expected.FIRST_NAME);
    addToInput(PROFILE_FORM.INPUT.LAST_NAME, expected.LAST_NAME);
    addToInput(PROFILE_FORM.INPUT.AA_UN, expected.AA_UN);
    addToInput(PROFILE_FORM.INPUT.AA_PW, expected.AA_PW);

    findAndClick(PROFILE_FORM.BUTTON.SAVE_BUTTON);

    findAndClick(NAV_BAR.BUTTONS.PROFILE);

    validateInputValue(PROFILE_FORM.INPUT.FIRST_NAME, expected.FIRST_NAME);
    validateInputValue(PROFILE_FORM.INPUT.LAST_NAME, expected.LAST_NAME);
    validateInputValue(PROFILE_FORM.INPUT.AA_UN, expected.AA_UN);
    validateInputValue(PROFILE_FORM.INPUT.AA_PW, expected.AA_PW);
  });
  it("Should show the UN validation ", () => {
    cy.intercept("POST", "/api/actorsaccess/checkpassword", {
      statusCode: 200,
      body: {
        message: "success",
      },
    }).as("checkAA");
    const fakeUser = {
      AA_UN: "Username",
      AA_PW: "Password",
    };
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");
    shouldBeVisible(NAV_BAR.CONTAINER.NAV_BAR);

    findAndClick(NAV_BAR.BUTTONS.PROFILE);

    addToInput(PROFILE_FORM.INPUT.AA_UN, fakeUser.AA_UN);
    addToInput(PROFILE_FORM.INPUT.AA_PW, fakeUser.AA_PW);
    // Forces blur
    cy.get(cyTag(PROFILE_FORM.TITLE)).click();
    shouldBeVisible(PROFILE_FORM.AA_CHECK);
  });
  it("Doesn't show the UN validation ", () => {
    cy.intercept("POST", "/api/actorsaccess/checkpassword", {
      statusCode: 401,
      body: {
        message: "error",
      },
    }).as("checkAA");
    const fakeUser = {
      AA_UN: "Username",
      AA_PW: "Password",
    };
    cy.task("db:seed");
    login();
    cy.visit("/");
    cy.wait("@Auth0");
    shouldBeVisible(NAV_BAR.CONTAINER.NAV_BAR);

    findAndClick(NAV_BAR.BUTTONS.PROFILE);

    addToInput(PROFILE_FORM.INPUT.AA_UN, fakeUser.AA_UN);
    addToInput(PROFILE_FORM.INPUT.AA_PW, fakeUser.AA_PW);
    // Forces blur
    cy.get(cyTag(PROFILE_FORM.TITLE)).click();
    shouldNotExist(PROFILE_FORM.AA_CHECK);
  });
});

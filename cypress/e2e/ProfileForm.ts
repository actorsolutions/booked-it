/// <reference types="cypress" />
import CY_TAGS from "../../src/support/cypress_tags";
import { login } from "../support/e2e";
import {
  addToInput,
  findAndClick,
  shouldBeVisible,
  validateInputValue,
} from "../support/helperFunctions";

const { NAV_BAR, PROFILE_FORM } = CY_TAGS;

describe("Profile Modal E2E tests", () => {
  it("Should show the Profile form, ", () => {
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
});

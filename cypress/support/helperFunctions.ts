// Import commands.js using ES2015 syntax:
import "./commands";
import CY_TAGS from "../../src/support/cypress_tags";

/*
  Helper method to make getting cyTags easier
 */
export const cyTag = (str: string) => `[data-cy='${str}']`;

export const findAndClick = (tag: string) => {
  // eslint-disable-next-line cypress/unsafe-to-chain-command
  cy.get(cyTag(tag)).scrollIntoView().should("be.visible").click();
};

export const scrollAndFind = (tag: string) => {
  cy.get(cyTag(tag)).scrollIntoView();
  cy.get(cyTag(tag)).should("be.visible");
};

export const scrollFindClick = (tag: string) => {
  cy.get(cyTag(tag)).scrollIntoView();
  cy.get(cyTag(tag)).should("be.visible").click();
};

/**
 * Adds Text to input fields
 * @param tag
 * @param textToAdd
 */
export const addToInput = (tag: string, textToAdd: string) => {
  findAndClick(tag);
  cy.get(cyTag(tag)).type(textToAdd);
};

/**
 * Selects dropdown items from dropdown
 * @param dropdownTag
 * @param tagOfItem
 * @param textOfSelect
 */
export const selectItem = (
  dropdownTag: string,
  tagOfItem: string,
  textOfSelect: string
) => {
  findAndClick(dropdownTag);
  cy.get(cyTag(tagOfItem)).contains(textOfSelect).click();
};

/*
  Checks to see if element is visible based on data-cy
 */
export const shouldBeVisible = (tag: string) => {
  cy.get(cyTag(tag)).should("be.visible");
};

/*
    Checks to see if element does not exist in dom
 */
export const shouldNotExist = (tag: string) => {
  cy.get(cyTag(tag)).should("not.exist");
};

/*
  Checks that component contains text
 */
export const shouldContainText = (tag: string, text: string) => {
  cy.get(cyTag(tag)).should("contain.text", text);
};

/**
  Selects date from MaterialUI Date Picker
  @param parentCyTag - Parent container that picker is in
  @param dataTimeStamp - Timestamp you want to pick (Located in Picker HTML)
 */
export const clickCalendarDate = (
  parentCyTag: string,
  dataTimeStamp: string
) => {
  // eslint-disable-next-line cypress/unsafe-to-chain-command
  cy.get(cyTag(parentCyTag))
    .scrollIntoView()
    .find(`[data-testid='CalendarIcon']`)
    .click();
  cy.get(`[data-timestamp="${dataTimeStamp}"]`).click();
};

/*
  Simplifies getting text from picker
 */
export const checkNestedInput = (pickerTag: string, text: string) => {
  cy.get(cyTag(pickerTag)).within(() => {
    cy.get("input").should("contain.value", text);
  });
};

/**
 * Clears Input
 * @param pickerTag
 */
export const clearNestedInput = (pickerTag: string) => {
  cy.get(cyTag(pickerTag)).within(() => {
    cy.get("input").clear();
  });
};

export const checkTextInSnackbar = (message: string) => {
  cy.get(cyTag(CY_TAGS.LANDING_PAGE.CONTAINERS.SNACKBAR_CONTAINER)).within(
    () => {
      cy.contains(message).should("be.visible");
    }
  );
};
/// <reference types="cypress" />
import CY_TAGS from "../../src/support/cypress_tags";
import {
    login,
    cyTag,
    findAndClick,
    addToInput,
    addSelectItem,
    shouldBeVisible,
    shouldContainText, shouldNotExist,
} from "../support/e2e";

const { AUDITIONS_SECTION, AUDITION_FORM, CASTING_FORM } = CY_TAGS;

describe("Add Casting Form E2E tests", () => {
    it("Should add one Casting Row entry and show on Add Audition form", () => {
        cy.task("db:seed");
        login();
        cy.visit("/");
        cy.wait("@Auth0");

        findAndClick(AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION);
        shouldBeVisible(AUDITION_FORM.CONTAINERS.FORM_CONTAINER);
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

        findAndClick(AUDITION_FORM.BUTTONS.ADD_CASTING);
        shouldBeVisible(CASTING_FORM.CONTAINERS.CASTING_CONTAINER);
        addToInput(CASTING_FORM.INPUTS.FIRST_NAME, "Ned");
        addToInput(CASTING_FORM.INPUTS.LAST_NAME, "Flanders");
        findAndClick(CASTING_FORM.BUTTONS.ADD_PERSON);

        shouldBeVisible(AUDITION_FORM.CONTAINERS.FORM_CONTAINER);
        shouldBeVisible(AUDITION_FORM.CASTING.CASTING_LIST);
        shouldBeVisible(AUDITION_FORM.CASTING.CASTING_ROW + "0");
    });
    it("Should successfully persist added Casting Row entry", () => {
        cy.task("db:seed");
        login();
        cy.visit("/");
        cy.wait("@Auth0");

        findAndClick(AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION);
        shouldBeVisible(AUDITION_FORM.CONTAINERS.FORM_CONTAINER);
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

        findAndClick(AUDITION_FORM.BUTTONS.ADD_CASTING);
        cy.get(cyTag(CASTING_FORM.CONTAINERS.CASTING_CONTAINER)).within(
            () => {
                shouldBeVisible(CASTING_FORM.INPUTS.LABELS.FIRST_NAME);
                addToInput(CASTING_FORM.INPUTS.FIRST_NAME, "Ned");
                shouldBeVisible(CASTING_FORM.INPUTS.LABELS.LAST_NAME);
                addToInput(CASTING_FORM.INPUTS.LAST_NAME, "Flanders");
                findAndClick(CASTING_FORM.BUTTONS.ADD_PERSON);
            }
        );

        shouldBeVisible(AUDITION_FORM.CONTAINERS.FORM_CONTAINER);
        shouldBeVisible(AUDITION_FORM.CASTING.CASTING_LIST);
        shouldBeVisible(AUDITION_FORM.CASTING.CASTING_ROW + "0");

        findAndClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);

        cy.get(cyTag(AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW + "1")).within(
            () => {
                findAndClick(AUDITIONS_SECTION.BUTTONS.EXPAND_MORE);
                shouldBeVisible(AUDITIONS_SECTION.CONTAINERS.ACCORDION_DETAILS);
                shouldBeVisible(AUDITIONS_SECTION.CONTAINERS.CASTING_INFO);
                shouldContainText(AUDITIONS_SECTION.CONTAINERS.CASTING_INFO, "Ned Flanders")
            }
        );
    });
    it("Should limit addable Casting Rows to (2) by removing Add Casting button", () => {
        cy.task("db:seed");
        login();
        cy.visit("/");
        cy.wait("@Auth0");

        findAndClick(AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION);
        shouldBeVisible(AUDITION_FORM.CONTAINERS.FORM_CONTAINER);

        findAndClick(AUDITION_FORM.BUTTONS.ADD_CASTING);
        cy.get(cyTag(CASTING_FORM.CONTAINERS.CASTING_CONTAINER)).within(
            () => {
                shouldBeVisible(CASTING_FORM.INPUTS.LABELS.FIRST_NAME);
                addToInput(CASTING_FORM.INPUTS.FIRST_NAME, "Ned");
                shouldBeVisible(CASTING_FORM.INPUTS.LABELS.LAST_NAME);
                addToInput(CASTING_FORM.INPUTS.LAST_NAME, "Flanders");
                findAndClick(CASTING_FORM.BUTTONS.ADD_PERSON);
            }
        );

        shouldBeVisible(AUDITION_FORM.CONTAINERS.FORM_CONTAINER);
        shouldBeVisible(AUDITION_FORM.CASTING.CASTING_LIST);
        shouldContainText(AUDITION_FORM.CASTING.CASTING_ROW + "0", "Ned Flanders");

        findAndClick(AUDITION_FORM.BUTTONS.ADD_CASTING);
        cy.get(cyTag(CASTING_FORM.CONTAINERS.CASTING_CONTAINER)).within(
            () => {
                shouldBeVisible(CASTING_FORM.INPUTS.LABELS.FIRST_NAME);
                addToInput(CASTING_FORM.INPUTS.FIRST_NAME, "Chef");
                shouldBeVisible(CASTING_FORM.INPUTS.LABELS.LAST_NAME);
                addToInput(CASTING_FORM.INPUTS.LAST_NAME, "Boyardee");
                findAndClick(CASTING_FORM.BUTTONS.ADD_PERSON);
            }
        );

        shouldBeVisible(AUDITION_FORM.CONTAINERS.FORM_CONTAINER);
        shouldBeVisible(AUDITION_FORM.CASTING.CASTING_LIST);
        shouldContainText(AUDITION_FORM.CASTING.CASTING_ROW + "1", "Chef Boyardee");

        shouldNotExist(AUDITION_FORM.BUTTONS.ADD_CASTING);
    });
    it("Should allow user to delete an added Casting Row from the Audition Form", () => {
        cy.task("db:seed");
        login();
        cy.visit("/");
        cy.wait("@Auth0");

        findAndClick(AUDITIONS_SECTION.BUTTONS.CREATE_AUDITION);
        shouldBeVisible(AUDITION_FORM.CONTAINERS.FORM_CONTAINER);

        findAndClick(AUDITION_FORM.BUTTONS.ADD_CASTING);
        cy.get(cyTag(CASTING_FORM.CONTAINERS.CASTING_CONTAINER)).within(
            () => {
                shouldBeVisible(CASTING_FORM.INPUTS.LABELS.FIRST_NAME);
                addToInput(CASTING_FORM.INPUTS.FIRST_NAME, "Ned");
                shouldBeVisible(CASTING_FORM.INPUTS.LABELS.LAST_NAME);
                addToInput(CASTING_FORM.INPUTS.LAST_NAME, "Flanders");
                findAndClick(CASTING_FORM.BUTTONS.ADD_PERSON);
            }
        );

        shouldBeVisible(AUDITION_FORM.CONTAINERS.FORM_CONTAINER);
        shouldBeVisible(AUDITION_FORM.CASTING.CASTING_LIST);
        cy.get(cyTag(AUDITION_FORM.CASTING.CASTING_ROW + "0")).within(
            () => {
                findAndClick(AUDITION_FORM.BUTTONS.DELETE_CASTING)
            }
        );

        shouldNotExist(AUDITION_FORM.CASTING.CASTING_ROW + "0");
    })

})
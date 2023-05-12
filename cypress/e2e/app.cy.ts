/// <reference types="cypress" />
import { CY_TAGS } from "@/types/cypress_tags";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";
import { SESSION_DATA} from "@/utils/testSetup";

export const cyTag = (str: string) => `[data-cy='${str}']`;

describe('Fire up', () => {
    it('should land on the login page', () => {
        cy.visit('/');
        cy.get(cyTag(CY_TAGS.LOG_IN_BUTTON)).should('be.visible');
        cy.get(cyTag(CY_TAGS.LOG_IN_BUTTON)).click()
    });
    it.only('should login',() => {
        cy.setCookie('appSession', generateSessionCookie(SESSION_DATA, {
            secret: '1234567',
        }) )
        cy.visit('/');



    })

})
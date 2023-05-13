/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            generateSession(): Chainable<void>;
        }
    }
}
Cypress.Commands.add('generateSession',() => {
    let sessionData = {
        user: {
            name: "Test User",
            sid: "0000000",
            email: "test@test.com",
            id: "0",
        },
        accessToken: "somanytokens",
        accessTokenScope: "openid profile email",
        idToken: "tokeeeens",
        token_type: "Bearer",
    };
        cy.then(() => generateSessionCookie(sessionData, { secret: 'testsecret' })).then((data) => {
            cy.setCookie("appSession", data);
        });
})
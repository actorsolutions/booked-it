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
  // eslint-disable-next-line no-unused-vars
  namespace Cypress {
    interface Chainable {
      generateSession(): Chainable<any>;
    }
  }
}
Cypress.Commands.add("generateSession", () => {
  let sessionData = {
    user: {
      name: "Test User",
      sid: "0000000",
      email: "test@test.com",
      id: "0",
    },
    accessToken:
      "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYtbW5lbXVwN3NqYXVjYXNzei51cy5hdXRoMC5jb20vIn0..RTVICDvedsf0dmwz.TQ6silblYpQpt-XN_q95QEa6bpehSUPx76hB-0Xg7OWajXy-6py30kV2ZP-fuW8tNOZKnFwE7gVlLu9RQDW6xlMUz-WJBbihNWmsQ3JSMA0pNp9aLDQjodazhgCHY6-Znze_rXlkVybjIxtaj1kQ_kpSYRz0Qrc6dp_W4ArDG34VQcCC91GzOpf2i7xneihLOAMcAtsvpiPDAQpLRAe3nUO1zN5SWThOBY9yeSRfijm165kKFvtaqddyNnaoJ6x0X-Q4nf0WtiQqI4yK9LjnrVFPD_KTD5XiDoaR1RoWb4mve2DLrV339Sq9I9MeN4NiEAjTa01FDyy18hlYVEN81HYAlCCFX-8.jxaVMBlpTrqI_ifQnSRGBQ",
    accessTokenScope: "openid profile email",
    accessTokenExpiresAt: 1684128474,
    idToken:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ii13aGc1UWw4Q2RlaERiSVZ5Qk9heSJ9.eyJnaXZlbl9uYW1lIjoiWmFjaGFyeSIsImZhbWlseV9uYW1lIjoiRGUgTmFyZGkiLCJuaWNrbmFtZSI6InpkZW5hcmRpIiwibmFtZSI6IlphY2hhcnkgRGUgTmFyZGkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YWJKYkxFd3BTWlJjSTZha3ZvZnJwcHNtLThNTTc4MjN4OUlqNkNEX009czk2LWMiLCJsb2NhbGUiOiJlbiIsInVwZGF0ZWRfYXQiOiIyMDIzLTA1LTE0VDA1OjI3OjU0LjEwM1oiLCJlbWFpbCI6InpkZW5hcmRpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1tbmVtdXA3c2phdWNhc3N6LnVzLmF1dGgwLmNvbS8iLCJhdWQiOiIxMWdIbGRUbmdYUFZyYzlxZ1FuMmFMUEQxeGVOOEdTNyIsImlhdCI6MTY4NDA0MjA3NCwiZXhwIjoxNjg0MDc4MDc0LCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODU0NDU3NzIwMzI5MDQ4ODg4MSIsInNpZCI6IlZGWUxPWUJheGNrWE54VEk0UnR5YlpETVVCa2JVMno1Iiwibm9uY2UiOiJSZGVUcmlPZGFrbkY0S05aS29TMllNa2lJZE8wUk16TFZBUDdOQTdDLV9nIn0.Pj-bg393hpqZ-fbKMpaiQma4aOI9JheD9Csc0QwNs1leaS7ImSShPOpCwepfIEeQ9HqNUC04INQD0PBRfxZNNqoZARxzAalkX2YzaKKgWse3td2zrFkUoM7MKMtX8UxLziC79m8UVbCPFLipsQDTR7gK--6tOOLqia1jtB1kdMWR3Oj4OYwlCzN32e-TOfQzk5_g1YwrGpmqgnSi4koqH-aw1M-EzgJ2BPYrveNhHHrgUg-AldF47ljWD1s7TZ57M9TRvHFh8Lguv7X5kmq601TDrG73NAVycv9-m6JahtCAN9AxQmgyNTf8MfUFD4CJTckRIJmIUJi2TcYL4CMfqw",

    token_type: "Bearer",
  };

  return generateSessionCookie(sessionData, {
    secret: `${Cypress.env("AUTH0_SECRET")}`,
  }).then((data) => {
    document.cookie = `appSession=${data}`;
    return data;
  });
});

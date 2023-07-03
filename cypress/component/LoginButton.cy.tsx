import React from "react";
import "@/app/setup";
import { LoginButton } from "@/components/Auth/LoginButton";

describe("<LoginButton />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoginButton />);
  });
});

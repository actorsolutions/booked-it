import React from "react";
import "@/app/setup";
import { CastingForm } from "@/components/AuditionForm/components/CastingForm";

describe("<CastingForm />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CastingForm />);
  });
});

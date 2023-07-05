import React from "react";
import { setupApp } from "@/app/setup";
import { CastingForm } from "@/components/AuditionForm/components/CastingForm";
import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";

describe("<CastingForm />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      setupApp(
        <DashboardWrapper>
          <CastingForm />
        </DashboardWrapper>
      )
    );
  });
});

import React from "react";
import { setupApp } from "@/app/setup";
import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";
import { LoginButton } from "@/components/Auth/LoginButton";

describe("<LoginButton />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      setupApp(
        <DashboardWrapper>
          <LoginButton />
        </DashboardWrapper>
      )
    );
  });
});

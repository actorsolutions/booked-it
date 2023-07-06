import React from "react";
import { setupApp } from "@/app/setup";
import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";
import { LoginButton } from "@/components/Auth/LoginButton";
import CY_TAGS from "@/support/cypress_tags";
import { shouldBeVisible } from "../support/helperFunctions";

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
  it("should show the login button", () => {
    cy.mount(
      setupApp(
        <DashboardWrapper>
          <LoginButton />
        </DashboardWrapper>
      )
    );
    shouldBeVisible(CY_TAGS.COMMON.BUTTONS.LOGIN);
  });
});

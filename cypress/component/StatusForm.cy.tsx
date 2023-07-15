import React from "react";
import { setupApp } from "@/app/setup";
import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";
import { StatusChangeForm } from "@/components/AuditionForm/components/StatusChange/StatusChange.form";
import CY_TAGS from "@/support/cypress_tags";
import { shouldBeVisible } from "../support/helperFunctions";

describe("<LoginButton />", () => {
  it("should render the login button", () => {
    const setStatuses = (auditions: any) => {
      console.log(auditions);
    };
    const statuses = [
      {
        id: 0,
        statusId: 0,
        auditionId: 0,
        type: "scheduled",
        date: 0,
      },
    ];
    cy.mount(
      setupApp(
        <DashboardWrapper>
          <StatusChangeForm setStatuses={setStatuses} statuses={statuses} />
        </DashboardWrapper>
      )
    );
    shouldBeVisible(CY_TAGS.AUDITION_FORM.CONTAINERS.STATUS_CHANGE);
  });
});

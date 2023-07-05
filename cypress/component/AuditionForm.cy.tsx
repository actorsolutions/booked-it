import React, { Dispatch, SetStateAction } from "react";
import { setupApp } from "@/app/setup";
import { AuditionForm } from "@/components/AuditionForm";
import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";
import { AuditionData } from "@/types";
import {
  addToInput,
  checkNestedInput,
  clearNestedInput,
  clickCalendarDate,
  cyTag,
  findAndClick,
  scrollAndFind,
  scrollFindClick,
  selectItem,
  shouldContainText,
  shouldNotExist,
} from "../support/helperFunctions";
import CY_TAGS from "../../src/support/cypress_tags";
import { audition_statuses, audition_types } from "@prisma/client";

const { AUDITION_FORM } = CY_TAGS;
const today = new Date();
today.setHours(0, 0, 0, 0);

const fakeSetAuditions = () => {
  console.log("Auditions set");
};
const handleClose = () => {
  console.log("Should close");
};

describe("<AuditionForm />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      setupApp(
        <DashboardWrapper>
          <AuditionForm
            auditions={[]}
            setAuditions={
              fakeSetAuditions as Dispatch<SetStateAction<AuditionData[]>>
            }
            handleClose={handleClose}
          />
        </DashboardWrapper>
      )
    );
  });
  it("should show errors for each unvalidated input", () => {
    const errorsArray = [
      AUDITION_FORM.ERRORS.STATUS,
      AUDITION_FORM.ERRORS.TYPE,
      AUDITION_FORM.ERRORS.DATE,
      AUDITION_FORM.ERRORS.COMPANY,
      AUDITION_FORM.ERRORS.PROJECT,
    ];

    cy.mount(
      setupApp(
        <DashboardWrapper>
          <AuditionForm
            auditions={[]}
            setAuditions={
              fakeSetAuditions as Dispatch<SetStateAction<AuditionData[]>>
            }
            handleClose={handleClose}
          />
        </DashboardWrapper>
      )
    );

    cy.get(cyTag(AUDITION_FORM.CONTAINERS.FORM_CONTAINER)).should("be.visible");
    scrollFindClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    errorsArray.forEach((tag) => {
      scrollAndFind(tag);
    });

    clickCalendarDate(today.valueOf().toString());

    scrollFindClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.DATE);

    selectItem(
      AUDITION_FORM.DROPDOWNS.TYPE,
      AUDITION_FORM.DROPDOWNS.OPTIONS.TYPE,
      "Television"
    );

    scrollFindClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.TYPE);

    selectItem(
      AUDITION_FORM.DROPDOWNS.STATUS,
      AUDITION_FORM.DROPDOWNS.OPTIONS.STATUS,
      "Booked"
    );

    findAndClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.STATUS);

    addToInput(AUDITION_FORM.INPUTS.PROJECT, "WallyWorld");

    scrollFindClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.PROJECT);

    addToInput(AUDITION_FORM.INPUTS.COMPANY, "WallyCorp");

    scrollFindClick(AUDITION_FORM.BUTTONS.ADD_AUDITION);
    shouldNotExist(AUDITION_FORM.ERRORS.COMPANY);
  });

  it("should allow user to edit an existing audition", () => {
    const TEST_AUDITION = {
      date: 1682924400,
      id: 0,
      notes: "Here is a note",
      project: "Test Project",
      type: "television" as audition_types,
      userId: 0,
      company: "Test Company",
      createdAt: today,
      status: "scheduled" as audition_statuses,
      archived: false,
      statuses: [
        {
          auditionId: 0,
          date: 0,
          id: 2,
          statusId: 0,
          type: "submitted",
        },
      ],
    };

    cy.mount(
      setupApp(
        <DashboardWrapper>
          <AuditionForm
            auditions={[]}
            setAuditions={
              fakeSetAuditions as Dispatch<SetStateAction<AuditionData[]>>
            }
            audition={TEST_AUDITION}
            handleClose={handleClose}
          />
        </DashboardWrapper>
      )
    );

    scrollAndFind(AUDITION_FORM.BUTTONS.EDIT_AUDITION);
    shouldContainText(AUDITION_FORM.DROPDOWNS.STATUS, "Scheduled");
    shouldContainText(AUDITION_FORM.DROPDOWNS.TYPE, "Television");
    checkNestedInput(AUDITION_FORM.INPUTS.PROJECT, "Test Project");

    selectItem(
      AUDITION_FORM.DROPDOWNS.STATUS,
      AUDITION_FORM.DROPDOWNS.OPTIONS.STATUS,
      "Booked"
    );
    clearNestedInput(AUDITION_FORM.INPUTS.PROJECT);
    findAndClick(AUDITION_FORM.INPUTS.PROJECT);
    addToInput(AUDITION_FORM.INPUTS.PROJECT, "Updated");

    shouldContainText(AUDITION_FORM.DROPDOWNS.STATUS, "Booked");
    checkNestedInput(AUDITION_FORM.INPUTS.PROJECT, "Updated");
  });
});

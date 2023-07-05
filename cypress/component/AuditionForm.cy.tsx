import React, { Dispatch, SetStateAction } from "react";
import { setupApp } from "@/app/setup";
import { AuditionForm } from "@/components/AuditionForm";
import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";
import { AuditionData } from "@/types";
import {
  addToInput,
  clickCalendarDate,
  cyTag,
  findAndClick,
  scrollAndFind,
  scrollFindClick,
  selectItem,
  shouldNotExist,
} from "../support/helperFunctions";
import CY_TAGS from "../../src/support/cypress_tags";

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
});

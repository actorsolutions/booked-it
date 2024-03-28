import { setupApp } from "@/app/setup";
import { AuditionList } from "@/components/Dashboard/AuditionList";
import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";
import { shouldBeVisible } from "../support/helperFunctions";
import CY_TAGS from "@/support/cypress_tags";

describe("<AuditionList />", () => {
  it("should render a message when there are no auditions", () => {
    const auditions = [];

    cy.mount(
      setupApp(
        <DashboardWrapper>
          <AuditionList auditions={auditions} />
        </DashboardWrapper>
      )
    );

    shouldBeVisible(CY_TAGS.AUDITIONS_SECTION.MESSAGES.NO_AUDITIONS);
  });
  it("should render the AuditionList container when there are auditions", () => {
    const auditions = [
      {
        date: 0,
        id: 0,
        notes: "Here is a note",
        project: "Test Project",
        type: "television",
        userId: 0,
        company: "Test Company",
        createdAt: "2023-04-28T21:50:11.638Z",
        archived: false,
      },
    ];

    cy.mount(
      setupApp(
        <DashboardWrapper>
          <AuditionList auditions={auditions} />
        </DashboardWrapper>
      )
    );

    shouldBeVisible(CY_TAGS.AUDITIONS_SECTION.CONTAINERS.AUDITIONS_CONTAINER);
  });
});

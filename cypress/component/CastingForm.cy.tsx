import { setupApp } from "@/app/setup";
import { CastingForm } from "@/components/AuditionForm/components/CastingForm";
import { DashboardWrapper } from "@/components/common/Layout/DashboardWrapper";
import { shouldBeVisible } from "../support/helperFunctions";
import CY_TAGS from "@/support/cypress_tags";

describe("<CastingForm />", () => {
  it("should render the Casting Form container", () => {
    cy.mount(
      setupApp(
        <DashboardWrapper>
          <CastingForm />
        </DashboardWrapper>
      )
    );
    shouldBeVisible(CY_TAGS.CASTING_FORM.CONTAINERS.CASTING_CONTAINER);
  });
});

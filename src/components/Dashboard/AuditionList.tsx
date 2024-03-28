import { AuditionData } from "@/types";
import { SwipeableRow } from "@/components/SwipeableRow";
import { AuditionRow } from "@/components/AuditionRow";
import { Stack } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { Container } from "@mui/system";
import CY_TAGS from "@/support/cypress_tags";

interface AuditionListProps {
  auditions: AuditionData[];
  setAuditions: Dispatch<SetStateAction<AuditionData[]>>;
  listCyTag: string;
  rowCyTag: string;
  buttonPrefix: string;
}

export const AuditionList = ({
  auditions,
  setAuditions,
  listCyTag,
  rowCyTag,
  buttonPrefix,
}: AuditionListProps) => {
  return (
    <Container
      sx={{ m: 0, p: 0, maxHeight: "20rem", overflow: "auto" }}
      data-cy={CY_TAGS.AUDITIONS_SECTION.CONTAINERS.AUDITIONS_CONTAINER}
    >
      <Stack rowGap={3} data-cy={listCyTag}>
        {auditions.length === 0 ? (
          <p data-cy={CY_TAGS.AUDITIONS_SECTION.MESSAGES.NO_AUDITIONS}>
            No Auditions Added
          </p>
        ) : (
          auditions.map((audition: AuditionData, index: number) => {
            return (
              <SwipeableRow key={audition.id}>
                <AuditionRow
                  audition={audition}
                  index={index}
                  auditions={auditions}
                  setAuditions={setAuditions}
                  rowCyTag={rowCyTag}
                  buttonPrefix={buttonPrefix}
                />
              </SwipeableRow>
            );
          })
        )}
      </Stack>
    </Container>
  );
};

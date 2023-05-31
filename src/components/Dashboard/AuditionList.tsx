import { Audition } from "@/types";
import { SwipeableRow } from "@/components/SwipeableRow";
import { AuditionRow } from "@/components/AuditionRow";
import { Stack } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

interface AuditionListProps {
  auditions: Audition[];
  setAuditions: Dispatch<SetStateAction<Audition[]>>;
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
    <Stack rowGap={3} data-cy={listCyTag}>
      {auditions.length === 0 ? (
        <p>No Auditions Added</p>
      ) : (
        auditions.map((audition: Audition, index: number) => {
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
  );
};

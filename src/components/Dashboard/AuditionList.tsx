import {Audition} from "@/types";
import {SwipeableRow} from "@/components/SwipeableRow";
import {AuditionRow} from "@/components/AuditionRow";
import {Stack} from "@mui/material";
import React, {Dispatch, SetStateAction} from "react";
import CY_TAGS from "@/support/cypress_tags";

interface AuditionListProps {
  auditions: Audition[];
  setAuditions: Dispatch<SetStateAction<Audition[]>>;
}

export const AuditionList = ({ auditions, setAuditions }: AuditionListProps) => {
  const { AUDITIONS_SECTION } = CY_TAGS;

  return (
      <Stack
          rowGap={3}
          data-cy={AUDITIONS_SECTION.CONTAINERS.AUDITIONS_CONTAINER}
      >
        {auditions.length === 0 ? (
            <p>No Auditions Added</p>
        ) : (
            auditions.map((audition: Audition, index: number) => {
              return (
                  <SwipeableRow key={audition.id}>
                    <AuditionRow audition={audition} index={index} auditions={auditions} setAuditions={setAuditions}/>
                  </SwipeableRow>
              );
            })
        )}
      </Stack>

  )
}

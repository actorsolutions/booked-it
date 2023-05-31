import { useEffect, useState } from "react";
import { Audition } from "@/types";
import { AuditionList } from "./AuditionList";
import CY_TAGS from "@/support/cypress_tags";
import React, { Dispatch, SetStateAction } from "react";
import { Typography } from "@mui/material";
interface Props {
  auditions: Audition[];
  setAuditions: Dispatch<SetStateAction<Audition[]>>;
}
export const NeedsAttention = ({ auditions, setAuditions }: Props) => {
  const [needsAttention, setNeedsAttention] = useState<Audition[]>(auditions);
  const { NEEDS_ATTENTION_SECTION } = CY_TAGS;

  const weekAgo = Date.now() - 1684537224;
  const filteredArray = auditions.filter((audition: Audition) => {
    if (audition.date < weekAgo / 1000 && !audition.archived) {
      return audition;
    }
  });

  useEffect(() => {
    const merged = auditions.map((t1) => ({
      ...t1,
      ...needsAttention.find((t2) => t2.id === t1.id),
    }));
    setAuditions(merged);
  }, [needsAttention]);

  return (
    <>
      <Typography variant="overline" display="block" gutterBottom>
        Needs Attention
      </Typography>
      {filteredArray.length < 1 ? (
        <Typography variant="body1" display="block" gutterBottom>
          All Caught Up!
        </Typography>
      ) : (
        <AuditionList
          buttonPrefix={NEEDS_ATTENTION_SECTION.BUTTONS.PREFIX}
          auditions={filteredArray}
          setAuditions={setNeedsAttention}
          rowCyTag={NEEDS_ATTENTION_SECTION.CONTAINER.NEEDS_ATTENTION_ROW}
          listCyTag={
            NEEDS_ATTENTION_SECTION.CONTAINER.NEEDS_ATTENTION_CONTAINER
          }
        />
      )}
    </>
  );
};

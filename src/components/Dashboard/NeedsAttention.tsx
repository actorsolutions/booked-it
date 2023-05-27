import { Audition } from "@/types";
import { SwipeableRow } from "@/components/SwipeableRow";
import { AuditionRow } from "@/components/AuditionRow";
import { Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";

interface Props {
  auditions: Audition[];
}
export const NeedsAttention = ({ auditions }: Props) => {
  const weekAgo = Date.now() - 1684537224;
  const needsAttention = auditions.filter((audition: Audition) => {
    if (audition.date < weekAgo / 1000 && !audition.archived) {
      return audition;
    }
  });
  return (
    <Container>
      <Stack rowGap={3} data-cy={"test"}>
        <Typography variant="overline">Needs Attention</Typography>

        {needsAttention.length === 0 ? (
          <p>All Caught up!</p>
        ) : (
          needsAttention.map((audition: Audition, index: number) => {
            return (
              <SwipeableRow key={audition.id}>
                <AuditionRow audition={audition} index={index} />
              </SwipeableRow>
            );
          })
        )}
      </Stack>
    </Container>
  );
};

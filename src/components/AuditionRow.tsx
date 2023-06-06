import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import {
  Card,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import LensIcon from "@mui/icons-material/Lens";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Audition, Casting } from "@/types";
import CY_TAGS from "@/support/cypress_tags";
import { deleteAudition, updateAudition } from "@/apihelpers/auditions";
import { LoadingCircle } from "@/components/common/LoadingCircle";

interface AuditionRowProps {
  audition: Audition;
  index: number;
  auditions: Audition[];
  setAuditions: Dispatch<SetStateAction<Audition[]>>;
  rowCyTag: string;
  buttonPrefix: string;
}

export const AuditionRow = ({
  audition,
  index,
  auditions,
  setAuditions,
  rowCyTag,
  buttonPrefix,
}: AuditionRowProps) => {
  const { AUDITIONS_SECTION } = CY_TAGS;
  const statusColor = (
    status: string
  ): "info" | "secondary" | "warning" | "error" | "success" | "disabled" => {
    switch (status) {
      case "submitted":
        return "info";
      case "scheduled":
        return "secondary";
      case "auditioned":
        return "warning";
      case "callback":
        return "error";
      case "booked":
        return "success";
      default:
        return "disabled";
    }
  };
  const casting = audition.casting ? (audition.casting as Array<Casting>) : [];

  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    try {
      await deleteAudition(audition);
      const updatedAuditions = auditions.filter(
        (auditionEntry) => auditionEntry !== audition
      );
      setAuditions(updatedAuditions);
    } catch (error) {
      new Error("Failed to delete.");
    }
  };

  // TODO: BI-47 - implement try/catch for archiving error and leverage filter pattern from handleDelete
  const handleArchiveClick = async (event: MouseEvent) => {
    setLoading(true);
    event.stopPropagation();
    audition.archived = !audition.archived;
    const updatedAudition = await updateAudition(audition);
    const auditionIndex = auditions.findIndex(
      (audition) => audition.id == updatedAudition.id
    );
    auditions[auditionIndex] = updatedAudition;
    setAuditions(auditions);
    setLoading(false);
  };

  const formattedDate = new Date(audition.date * 1000).toLocaleDateString(
    "en",
    {
      dateStyle: "short",
    }
  );
  if (loading) {
    return <LoadingCircle />;
  }

  return (
    <Card
      sx={{
        alignItems: "center",
        pl: "0.2rem",
        backgroundColor: audition.archived ? "#f5f5f5" : "white",
        display: "flex",
        mb: "0.5rem",
        pt: "0.5rem",
        justifyContent: "center",
        opacity: audition.archived ? 0.5 : 1,
      }}
      key={audition.id}
      data-cy={`${rowCyTag}${index}`}
    >
      <Grid container spacing={2} id={"grid-container"}>
        <Accordion
          expanded={expanded}
          onChange={handleAccordionChange}
          sx={{ width: "100%" }}
          id={"accordion-container"}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon data-cy={`${buttonPrefix}expand-more-button`} />
            }
            id="accordion-header"
            sx={{ display: { sm: "flex" }, alignItems: "center" }}
          >
            <Grid
              sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
              item
              xs={2}
            >
              <LensIcon color={statusColor(audition.status)} fontSize="large" />
            </Grid>
            <Grid item xs={7}>
              <div> Project: {audition.project} </div>
            </Grid>
            <Grid item xs={3}>
              <Button
                sx={{ p: 0.5 }}
                variant="outlined"
                data-cy={`${buttonPrefix}archive-button`}
                onClick={handleArchiveClick}
              >
                {audition.archived ? "Unarchive" : "Archive"}
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Typography variant="body2">{formattedDate}</Typography>
            </Grid>
          </AccordionSummary>
          {expanded && (
            <AccordionDetails
              data-cy={`${AUDITIONS_SECTION.CONTAINERS.ACCORDION_DETAILS}`}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <div> Type: {audition.type} </div>
                </Grid>
                <Grid item xs={4}>
                  <div data-cy={AUDITIONS_SECTION.CONTAINERS.CASTING_INFO}>{casting.length > 0 ? casting[0].name : undefined}</div>
                </Grid>
                <Grid item xs={4}>
                  <div>Notes: {audition.notes}</div>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    data-cy={`${buttonPrefix}delete-button`}
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          )}
        </Accordion>
      </Grid>
    </Card>
  );
};

//

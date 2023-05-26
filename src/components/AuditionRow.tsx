import {Dispatch, MouseEvent, SetStateAction, useState} from "react";
import { Card, Grid, Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import LensIcon from "@mui/icons-material/Lens";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Audition, Casting } from "@/types";
import CY_TAGS from "@/support/cypress_tags";
import { deleteAudition, updateAudition } from "@/apihelpers/auditions";

interface AuditionRowProps {
    audition: Audition;
    index: number;
    auditions: Audition[];
    setAuditions: Dispatch<SetStateAction<Audition[]>>;
}

export const AuditionRow = ({ audition, index, auditions, setAuditions }: AuditionRowProps) => {
    const { AUDITIONS_SECTION } = CY_TAGS;
    const statusColor = (status: string): "info" | "secondary" | "warning" | "error" | "success" | "disabled" => {
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
                return "disabled"
        }
    }
    const casting = audition.casting ? (audition.casting as Array<Casting>) : [];

    const [expanded, setExpanded] = useState(false);
    const [archived, setArchived] = useState(audition.archived)

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };

    const handleDelete = async () => {
        try {
            await deleteAudition(audition);
            const updatedAuditions = auditions.filter((auditionEntry) => auditionEntry !== audition);
            setAuditions(updatedAuditions);
        } catch (error) {
           new Error("Failed to delete.");
        }
    };

    // TODO: BI-47 - implement try/catch for archiving error and leverage filter pattern from handleDelete
    const handleArchiveClick = async (event: MouseEvent) => {
        event.stopPropagation();
        audition.archived = !archived;
        await updateAudition(audition)
        setArchived(!archived);
    };

    return (
        <Card
            sx={{
                alignItems: "center",
                pl: "4px",
                backgroundColor: archived ? "#f5f5f5" : "white",
                display: "flex",
                mb: "3px",
                pt: "10px",
                justifyContent: "center",
                opacity: archived ? 0.5 : 1
            }}
            key={audition.id}
            data-cy={`${AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW}${index}`}
        >
            <Grid container spacing={2} id={'grid-container'}>
                <Accordion expanded={expanded} onChange={handleAccordionChange} sx={{ width: "100%" }} id={'accordion-container'}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon data-cy={`${AUDITIONS_SECTION.BUTTONS.EXPAND_MORE}`} />}
                        id="accordion-header"
                        sx={{ display: "flex", alignItems: 'center' }}
                    >
                        <Grid item xs={2}>
                            <LensIcon color={statusColor(audition.status)} fontSize="large" />
                        </Grid>
                        <Grid item xs={7}>
                            <div> Project: {audition.project} </div>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="outlined" data-cy={`${AUDITIONS_SECTION.BUTTONS.ARCHIVE_AUDITION}`} onClick={handleArchiveClick}>
                                {archived ? "Unarchive" : "Archive"}
                            </Button>
                        </Grid>
                        <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            {new Date(audition.date * 1000).toLocaleDateString("en", {
                                dateStyle: "short",
                            })}
                        </Grid>
                    </AccordionSummary>
                    {expanded && (
                        <AccordionDetails data-cy={`${AUDITIONS_SECTION.CONTAINERS.ACCORDION_DETAILS}`}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <div> Type: {audition.type} </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div>{casting.length > 0 ? casting[0].name : undefined}</div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div>Notes: {audition.notes}</div>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" data-cy={`${AUDITIONS_SECTION.BUTTONS.DELETE_AUDITION}`} onClick={() => {
                                        handleDelete()
                                    }}>Delete</Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    )}
                </Accordion>
            </Grid>
        </Card>
    );
};

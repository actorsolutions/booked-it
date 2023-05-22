import { useState } from "react";
import { Card, Grid } from "@mui/material";
import LensIcon from "@mui/icons-material/Lens";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Audition, Casting } from "@/types";
import CY_TAGS from "@/support/cypress_tags";

interface AuditionRowProps {
    audition: Audition;
    index: number;
}

export const AuditionRow = ({ audition, index }: AuditionRowProps) => {
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

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };

    return (
        <Card
            sx={{
                alignItems: "center",
                pl: "4px",
                backgroundColor: "white",
                display: "flex",
                minHeight: "4.5rem",
            }}
            key={audition.id}
            data-cy={`${AUDITIONS_SECTION.CONTAINERS.AUDITION_ROW}${index}`}
        >
            <Accordion expanded={expanded} onChange={handleAccordionChange}>
            <Grid container spacing={2}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="accordion-header"
                    sx={{ width: "100%" }}
                >
                <Grid item xs={2}>
                    <LensIcon color={statusColor(audition.status)} fontSize="large" />
                </Grid>
                <Grid item xs={7}>
                    <div> Project: {audition.project} </div>
                </Grid>
                </AccordionSummary>
                <AccordionDetails sx={{ width: "100%" }} >
                <Grid item xs={2}>
                    <div> Type: {audition.type} </div>
                </Grid>
                <Grid item md={3}>
                    <div>{casting.length > 0 ? casting[0].name : undefined}</div>
                </Grid>
                <Grid item md={3}>
                    <div>Notes: {audition.notes}</div>
                </Grid>
                <Grid item xs={2}>
                    <div style={{ justifyContent: "flex-end" }}>
                        {new Date(audition.date * 1000).toLocaleDateString("en", {
                            dateStyle: "short",
                        })}
                    </div>
                </Grid>
                </AccordionDetails>
            </Grid>
            </Accordion>
        </Card>

    );
};

// <Grid>
//     <Accordion>
//         <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             id="accordion-header"
//         >
//             Test Accordion
//         </AccordionSummary>
//         <AccordionDetails>
//             Test test test
//         </AccordionDetails>
//     </Accordion>
// </Grid>
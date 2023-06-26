import React from "react";
import {Typography} from "@mui/material";

interface Props {
    errorCyTag: string
}

export const ValidationRequiredMessage = (props: Props) => {
    const { errorCyTag } = props
    return (
        <Typography data-cy={errorCyTag} variant="overline">
            Required!
        </Typography>
    )
}
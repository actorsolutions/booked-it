import React, {useState, useEffect, Dispatch, SetStateAction} from "react";
import { Snackbar, SnackbarContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
    message: string;
    setOpen: Dispatch<SetStateAction<string>>;
}

export const SnackbarMessage = (props: Props) => {
    const { message } = props;
    const [openState, setOpenState] = useState(true);

    useEffect(() => {
        setOpenState(message !== null);
    }, [message]);

    const handleClose = () => {
        setOpenState(false);
    };

    return (
        <Snackbar open={openState} autoHideDuration={5000} onClose={handleClose}>
            <SnackbarContent
                message={message}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            />
        </Snackbar>
    );
};
import React, {createContext, useState, useContext} from "react";
import {Alert, Snackbar} from "@mui/material";

type SnackBarContextActions = {
    showSnackBar: (text: string) => void;
}

const SnackBarContext = createContext<SnackBarContextActions>(
    {} as SnackBarContextActions
);

interface SnackBarProviderProps {
    children: React.ReactNode;
}

const SnackBarProvider: React.FC<SnackBarProviderProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const showSnackBar = (text: string) => {
        setMessage(text);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <SnackBarContext.Provider value={{showSnackBar}}>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                onClose={handleClose}
            >
                <Alert onClose={handleClose}>
                    {message}
                </Alert>
            </Snackbar>
            {children}
        </SnackBarContext.Provider>
    );
};

const useSnackBar = (): SnackBarContextActions => {
    const context = useContext(SnackBarContext);

    if (!context) {
        throw new Error('useSnackBar must be used within an SnackBarProvider');
    }

    return context;
};

export { SnackBarProvider, useSnackBar };
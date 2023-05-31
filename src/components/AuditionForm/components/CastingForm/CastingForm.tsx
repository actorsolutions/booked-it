import { useForm } from "react-hook-form";
import { Button, Grid, Typography } from "@mui/material";

import { FirstNameInput } from "./FirstNameInput";
import { LastNameInput } from "./LastNameInput";
import { CompanyInput } from "./CompanyInput";
import { RoleInput } from "./RoleInput";
import { FormValues, FormProps } from "./index";
import React from "react";
import { AuditionFormData } from "@/components/AuditionForm";

export const CastingForm = (props: FormProps<AuditionFormData>) => {
    const { initialCastingList, setCasting, handleClose } = props;
    const {
        control,
        formState: { errors },
        clearErrors,
        getValues,
        trigger,
        register,
    } = useForm<FormValues>({
        defaultValues: {
            casting: initialCastingList,
        },
    });

    const customValidation = async (arrayOfFields: fields[]) => {
        return trigger(arrayOfFields as fields[], { shouldFocus: true });
    };

    type fields = "fName" | "lName" | "company" | "role";

    const requiredFields = ["fName", "lName"];

    const handleClick = async () => {
        const { company, fName, lName, role, casting} = getValues();
        const name = fName + " " + lName;
        if (await customValidation(requiredFields as fields[]) && casting.length < 3 ) {
            setCasting([
                {
                    name: name,
                    role: role,
                    company: company,
                },
            ]);
            handleClose();
        }
    };

    return (
        <Grid container direction="column">
            <Grid item>
                <FirstNameInput control={control} register={register} />
                {errors.fName && (
                    <Typography variant="overline">First Name is required!</Typography>
                )}
            </Grid>
            <Grid item>
                <LastNameInput control={control} register={register} />
                {errors.lName && (
                    <Typography variant="overline">Last Name is required!</Typography>
                )}
            </Grid>
            <Grid item>
                <CompanyInput control={control} />
            </Grid>
            <Grid item>
                <RoleInput control={control} />
            </Grid>
            <Grid item>
                <Button
                    onClick={() => {
                        clearErrors();
                        handleClick();
                    }}
                >
                    Add Person
                </Button>
            </Grid>
        </Grid>
    );
};

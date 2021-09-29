import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Backdrop as MUIBackdrop, Box, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
    },
}));

export default function Backdrop({ open, message, progress }) {
    const classes = useStyles();
    return (
        <MUIBackdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
            <Box textAlign="center" px={2} pt={5} fontWeight="fontWeightMedium" fontSize="h6.fontSize">
                {message}
            </Box>
            <Box pt={2} fontWeight="fontWeightBold" fontSize="h4.fontSize">
                {progress} %
            </Box>
        </MUIBackdrop>
    );
}

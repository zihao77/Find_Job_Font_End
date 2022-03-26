import React from "react";
import AppBar from '@mui/material/AppBar';
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "@mui/material";

export default function (props) {
    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `2px solid ${theme.palette.divider}` }}
        >
            <Grid container>
                <Grid item xs={10}>
                    <Typography variant="h6" sx={{ paddingLeft: 4 }}>
                        {props.title}
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "right", paddingRight: 2, paddingTop: 1 }}>
                    <Link underline="hover" onClick={props.logout}>log out</Link>
                </Grid>
            </Grid>
        </AppBar>
    );
}
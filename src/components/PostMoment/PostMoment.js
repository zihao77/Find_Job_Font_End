import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { CardContent, Grid, TextField, Button } from "@mui/material";
import TopNavBar from "../TopNavBar/TopNavBar";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


export default function (props) {
    let navigate = useNavigate();

    useEffect(function () {

    });

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <TopNavBar title="Post Moment" logout={props.logout} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
                        <Grid item xs={6}>
                            <Card>
                                <CardContent sx={{ height: 300 }} >
                                    <TextField fullWidth multiline rows={10} label="Say something..." variant="filled" />
                                </CardContent>
                                <CardActions>
                                    <Button sx={{ marginLeft: "auto", marginRight: 1 }} variant="contained" endIcon={<SendIcon />}>
                                        Post
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    );
}
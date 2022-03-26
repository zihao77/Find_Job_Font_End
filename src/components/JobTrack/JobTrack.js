import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import TopNavBar from "../TopNavBar/TopNavBar";
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function (props) {
    let navigate = useNavigate();

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <TopNavBar title="Job Track" logout={props.logout} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
                        <Grid item xs={8}>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <Card sx={{ height: 275, overflowX: "hidden", overflowY: "auto" }}>
                                        <CardContent>
                                            <Typography>
                                                Word of the Day
                                            </Typography>
                                            <Typography>
                                                Word of the Day
                                            </Typography>
                                            <Typography>
                                                Word of the Day
                                            </Typography>
                                            <Typography>
                                                Word of the Day
                                            </Typography>
                                            <Typography>
                                                Word of the Day
                                            </Typography>
                                            <Typography>
                                                Word of the Day
                                            </Typography>
                                            <Typography>
                                                Word of the Day
                                            </Typography>
                                            <Typography>
                                                Word of the Day
                                            </Typography>
                                            <Typography>
                                                Word of the Day
                                            </Typography>
                                            <Typography>
                                                Word of the Day
                                            </Typography>
                                            <Typography>
                                                Word of the Day
                                            </Typography>
                                            <Typography>
                                                Word of the Day
                                            </Typography>
                                            <Typography>
                                                Word of the Day
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ height: 275 }}>
                                        <CardContent>
                                            Word of the Day
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ height: 275 }}>
                                        <CardContent>
                                            Word of the Day
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
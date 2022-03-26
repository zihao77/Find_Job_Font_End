import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Grid } from "@mui/material";
import TopNavBar from "../TopNavBar/TopNavBar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function (props) {
    let navigate = useNavigate();

    useEffect(function () {

    });

    return (

        <div>
            <Grid container>
                <Grid item xs={12}>
                    <TopNavBar logout={props.logout} title="Message Box" />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item xs={8} sx={{ marginTop: 8 }}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>
                                        Jack
                                        <Typography variant="caption" sx={{ color: "gray", marginLeft: 1 }}>
                                            1997-7-10
                                        </Typography>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Hello. This is a leave message.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>
                                        Jack
                                        <Typography variant="caption" sx={{ color: "gray", marginLeft: 1 }}>
                                            1997-7-10
                                        </Typography>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Hello. This is a leave message.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>
                                        Jack
                                        <Typography variant="caption" sx={{ color: "gray", marginLeft: 1 }}>
                                            1997-7-10
                                        </Typography>
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Hello. This is a leave message.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
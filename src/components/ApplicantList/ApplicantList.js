import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Grid } from "@mui/material";
import TopNavBar from "../TopNavBar/TopNavBar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

async function getApplicantList(content) {
    return await fetch("http://18.117.128.141:5000/application/list", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    })
        .then(res => res.json())
}

function Applicant(props) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>
                    User:
                    {/* {props.item.from_uid} */}
                    <Typography variant="caption" sx={{ color: "gray", marginLeft: 1 }}>
                        {/* {props.item.date} */}
                    </Typography>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {/* {props.item.content} */}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default function ApplicantList(props) {
    const [applicantList, setApplicantList] = useState({ "data": [] });
    const [jid, setJid] = useState("");
    let { state } = useLocation();

    useEffect(() => {
        let { jid } = state;
        setJid(jid);
    }, [])

    useEffect(async () => {
        let data = await getApplicantList({
            "uid": props.uid,
            "token": props.token,
            "jid": jid
        })
        console.log(data);
        console.log(111111111)
        if (data["code"] == 200) {
            setApplicantList({
                "data": data["data"]
            })
        } else {
            alert("Get applicant List fail!");
        }
    })

    const applicants = applicantList.data.map((item, key) => {
        return (<Applicant key={key} item={item} />);
    })
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <TopNavBar logout={props.logout} title="Message Box" />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item xs={8} sx={{ marginTop: 8 }}>
                            {applicants}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
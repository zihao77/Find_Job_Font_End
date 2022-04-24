import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TopNavBar from "../TopNavBar/TopNavBar";
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";

async function getJobList(content) {
    return await fetch("http://18.117.128.141:5000/jobs/list", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(res => res.json())
}

function JobCard(props) {
    let navigate = useNavigate();
    function clickCheck() {
        navigate("/ApplicantList", {
            state: {
                "jid": props.parameter.jid
            }
        });
    }

    return (
        <Card sx={{ height: 275, overflowX: "hidden", overflowY: "auto" }}>
            <CardContent>
                <Typography>
                    Title: {props.parameter.title}
                </Typography>
                <Typography>
                    Description: {props.parameter.description}
                </Typography>
                <Typography>
                    Salary: {props.parameter.salary}
                </Typography>
            </CardContent>
            <CardActions sx={{ paddingTop: 5 }}>
                <Button onClick={clickCheck} size="small" variant="contained">Check Applicant List</Button>
            </CardActions>
        </Card >
    );
}

export default function JobList(props) {
    const [jobs, setJobs] = useState({ "data": [] });

    useEffect(async () => {
        const data = await getJobList({
            "uid": props.uid,
            "token": props.token
        });
        if (data["code"] == 200) {
            if (JSON.stringify(data["data"]) != "{}")
                setJobs({
                    "data": data["data"]
                })
        }
    }, [])

    const jobcards = jobs.data.map((item, key) => {
        return (
            <Grid key={key} item xs={4}>
                <JobCard parameter={item} uid={props.uid} token={props.token} />
            </Grid>)
    })

    return (
        <Grid>
            <Grid item xs={12}>
                <TopNavBar title="Job List" logout={props.logout} />
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
                    <Grid item xs={8}>
                        <Grid container spacing={1}>
                            {jobcards}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TopNavBar from "../TopNavBar/TopNavBar";
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

async function getJobLists(content) {
    return await fetch("http://3.142.51.105:5000/jobs/search", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(res => res.json())
}

function JobCard(props) {
    return (
        <Card sx={{ height: 275, overflowX: "hidden", overflowY: "auto" }}>
            <CardContent>
                <Typography>
                    Title: {props.parameter.title}
                </Typography>
                <Typography>
                    Company: {props.parameter.company_name}
                </Typography>
                <Typography>
                    Salary: {props.parameter.salary}
                </Typography>
                <Typography>
                    Description: {props.parameter.desc}
                </Typography>
            </CardContent>
        </Card >
    );
}

export default function (props) {
    const [jobs, setJobs] = useState({ "data": [] });

    useEffect(async () => {
        const data = await getJobLists({
            "uid": props.uid,
            "token": props.token,
            "title": "",
            "liked": "false",
            "applied": "false"
        });
        console.log(data);
        setJobs({
            "data": data["data"]
        });
    }, [])

    const jobcards = jobs.data.map((item, key) => {
        if (item.applied == true) {
            return (
                <Grid key={key} item xs={4}>
                    <JobCard parameter={item} uid={props.uid} token={props.token} />
                </Grid>)
        }
    })

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
                                {jobcards}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
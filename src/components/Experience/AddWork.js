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

async function addWork(content) {
    return fetch("http://18.117.128.141:5000/experience/work/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(res => res.json());
}

export default function AddWork(props) {
    const [employerName, setEmployerName] = useState("");
    const [description, setDescription] = useState("");
    const [field, setField] = useState("");
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    let navigate = useNavigate();

    function handleEmployerNameChange(e) {
        setEmployerName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleFieldChange(e) {
        setField(e.target.value);
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleStartTimeChange(e) {
        setStartTime(e.target.value);
    }

    function handleEndTimeChange(e) {
        setEndTime(e.target.value);
    }

    async function handleAddWork() {
        let data = await addWork({
            "uid": props.uid,
            "token": props.token,
            "employer_name": employerName,
            "start_date": startTime,
            "end_date": endTime,
            "field": field,
            "desc": description,
            "title": title
        })

        if (data["code"] == 200) {
            navigate("/IndividualProfile", { replace: true });
        } else {
            alert("Add work fail!");
        }
    }

    return (
        <div>
            <Grid>
                <Grid item xs={12}>
                    <TopNavBar title="Add Work Experience" logout={props.logout} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField onChange={handleEmployerNameChange} sx={{ marginBottom: 1 }} fullWidth label="Employer name" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleDescriptionChange} sx={{ marginBottom: 1 }} fullWidth label="Description" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleFieldChange} sx={{ marginBottom: 1 }} fullWidth label="Field" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleTitleChange} sx={{ marginBottom: 1 }} fullWidth label="Title" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleStartTimeChange} sx={{ marginBottom: 1 }} fullWidth label="Start time" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleEndTimeChange} sx={{ marginBottom: 2 }} fullWidth label="End time" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button onClick={handleAddWork} fullWidth variant="contained" >Add Work</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import TopNavBar from "../TopNavBar/TopNavBar";
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";

async function updateWork(content) {
    return fetch("http://18.117.128.141:5000/experience/work/update", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(res => res.json());
}

export default function UpdateWork(props) {
    const [oldEmployerName, setOldEmployerName] = useState("");
    const [oldDescription, setOldDescription] = useState("");
    const [oldField, setOldField] = useState("");
    const [oldTitle, setOldTitle] = useState("");
    const [oldStartTime, setOldStartTime] = useState("");
    const [oldEndTime, setOldEndTime] = useState("");

    const [employerName, setEmployerName] = useState("");
    const [description, setDescription] = useState("");
    const [field, setField] = useState("");
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    let navigate = useNavigate();
    let { state } = useLocation();

    useEffect(() => {
        let { old_employer_name, old_start_date, old_end_date, old_field, old_title, old_description } = state;
        setOldEmployerName(old_employer_name);
        setOldStartTime(old_start_date);
        setOldEndTime(old_end_date);
        setOldDescription(old_description);
        setOldTitle(old_title);
        setOldField(old_field);
    }, [])

    useEffect(() => {
        console.log(oldEmployerName);
    }, [oldEmployerName])

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

    async function handleUpdateWork() {
        let data = await updateWork({
            "uid": props.uid,
            "token": props.token,
            "employer_name": oldEmployerName,
            "start_date": oldStartTime,
            "end_date": oldEndTime,
            "field": field,
            "desc": description,
            "title": title,
            "new_employer_name": employerName,
            "new_start_date": startTime,
            "new_end_date": endTime

        })

        if (data["code"] == 200) {
            navigate("/IndividualProfile", { replace: true });
        } else {
            alert("Update work fail!");
        }
    }

    return (
        <div>
            <Grid>
                <Grid item xs={12}>
                    <TopNavBar title="Update Work Experience" logout={props.logout} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField helperText={"old value:" + oldEmployerName} onChange={handleEmployerNameChange} sx={{ marginBottom: 1 }} fullWidth label="Employer name" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField helperText={"old value:" + oldDescription} onChange={handleDescriptionChange} sx={{ marginBottom: 1 }} fullWidth label="Description" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField helperText={"old value:" + oldField} onChange={handleFieldChange} sx={{ marginBottom: 1 }} fullWidth label="Field" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField helperText={"old value:" + oldTitle} onChange={handleTitleChange} sx={{ marginBottom: 1 }} fullWidth label="Title" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField helperText={"old value:" + oldStartTime} defaultValue={oldStartTime} onChange={handleStartTimeChange} sx={{ marginBottom: 1 }} fullWidth label="Start time" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField helperText={"old value:" + oldEndTime} onChange={handleEndTimeChange} sx={{ marginBottom: 2 }} fullWidth label="End time" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button onClick={handleUpdateWork} fullWidth variant="contained" >Update Work</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
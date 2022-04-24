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

async function addStudy(content) {
    return fetch("http://18.117.128.141:5000/experience/study/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(res => res.json());
}

export default function AddStudy(props) {
    const [collegeName, setCollegeName] = useState("");
    const [major, setMajor] = useState("");
    const [degree, setDegree] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    let navigate = useNavigate();

    function handleCollegeNameChange(e) {
        setCollegeName(e.target.value);
    }

    function handleMajorChange(e) {
        setMajor(e.target.value)
    }

    function handleDegreeChange(e) {
        setDegree(e.target.value);
    }

    function handleStartTimeChange(e) {
        setStartTime(e.target.value);
    }

    function handleEndTimeChange(e) {
        setEndTime(e.target.value);
    }

    async function handleAddStudy() {
        let data = await addStudy({
            "uid": props.uid,
            "token": props.token,
            "college_name": collegeName,
            "major": major,
            "degree": degree,
            "start_date": startTime,
            "end_date": endTime

        })

        if (data["code"] == 200) {
            navigate("/IndividualProfile", { replace: true });
        } else {
            alert("Add study fail!");
        }
    }

    return (
        <div>
            <Grid>
                <Grid item xs={12}>
                    <TopNavBar title="Add Study Experience" logout={props.logout} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField onChange={handleCollegeNameChange} sx={{ marginBottom: 1 }} fullWidth label="College name" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleMajorChange} sx={{ marginBottom: 1 }} fullWidth label="Major" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleDegreeChange} sx={{ marginBottom: 1 }} fullWidth label="Degree" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleStartTimeChange} sx={{ marginBottom: 1 }} fullWidth label="Start time" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleEndTimeChange} sx={{ marginBottom: 2 }} fullWidth label="End time" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button onClick={handleAddStudy} fullWidth variant="contained" >Add Study</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
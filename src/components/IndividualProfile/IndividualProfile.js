import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Grid } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import KeyIcon from '@mui/icons-material/Key';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TopNavBar from "../TopNavBar/TopNavBar";
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

async function getWorkExp(content) {
    return fetch("http://18.117.128.141:5000/experience/work/get", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(res => res.json());
}

async function getStudyExp(content) {
    return fetch("http://18.117.128.141:5000/experience/study/get", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(res => res.json());
}

async function deleteWorkExp(content) {
    return fetch("http://18.117.128.141:5000/experience/work/delete", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(res => res.json());
}

function WorkItem(props) {
    let navigate = useNavigate();

    function clickUpdateWork() {
        navigate("/UpdateWork", {
            state: {
                "old_employer_name": props.item.employer_name,
                "old_start_date": props.item.start_date,
                "old_end_date": props.item.end_date,
                "old_field": props.item.field,
                "old_title": props.item.title,
                "old_description": props.item.desc
            }
        });
    }

    async function clickDeleteWork() {
        let data = await deleteWorkExp({
            "uid": props.uid,
            "token": props.token,
            "employer_name": props.item.employer_name,
            "start_date": props.item.start_date,
            "end_date": props.item.end_date
        })

        if (data["code"] == 200) {
            navigate(0);
        } else {
            alert("delete work exp fail!");
        }
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h5">#{props.num}<BorderColorIcon sx={{ marginLeft: 1 }} fontSize="small" onClick={clickUpdateWork} /> <DeleteForeverIcon onClick={clickDeleteWork} sx={{ color: "red" }} /></Typography>
            </Grid>
            <Grid item xs={6}>
                employer_name: {props.item.college_name}
            </Grid>
            <Grid item xs={6}>
                start_date: {props.item.start_date}
            </Grid>
            <Grid item xs={6}>
                end_date: {props.item.end_date}
            </Grid>
            <Grid item xs={6}>
                field: {props.item.field}
            </Grid>
            <Grid item xs={6}>
                title: {props.item.title}
            </Grid>
            <Grid item xs={6}>
                description: {props.item.desc}
            </Grid>
        </Grid>
    );
}

function StudyItem(props) {
    let navigate = useNavigate();

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h5">#{props.num} </Typography>
            </Grid>
            <Grid item xs={6}>
                college_name: {props.item.college_name}
            </Grid>
            <Grid item xs={6}>
                start_date: {props.item.start_date}
            </Grid>
            <Grid item xs={6}>
                end_date: {props.item.end_date}
            </Grid>
            <Grid item xs={6}>
                major: {props.item.major}
            </Grid>
            <Grid item xs={6}>
                degree: {props.item.degree}
            </Grid>
        </Grid>
    );
}

export default function IndividualProfile(props) {
    const [workExps, setWorkExps] = useState({ "data": [] });
    const [studyExps, setStudyExps] = useState({ "data": [] });
    let navigate = useNavigate();

    useEffect(async () => {
        let data = await getWorkExp({
            "uid": props.uid,
            "token": props.token
        })
        setWorkExps({
            "data": data["data"]
        });
    }, []);

    useEffect(async () => {
        let data = await getStudyExp({
            "uid": props.uid,
            "token": props.token
        })
        setStudyExps({
            "data": data["data"]
        });
    }, [])

    function clickAddWork() {
        navigate("/AddWork");
    }

    function clickAddStudy() {
        navigate("/AddStudy");
    }



    const workItems = workExps.data.map((item, key) => {
        return (
            <WorkItem uid={props.uid} token={props.token} item={item} key={key} num={key} />
        )
    })

    const studyItems = studyExps.data.map((item, key) => {
        return (
            <StudyItem uid={props.uid} token={props.token} item={item} key={key} num={key} />
        )
    })

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <TopNavBar title="Profile" logout={props.logout} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
                        <Grid item xs={8} elevation={6}>
                            <Paper elevation={6} sx={{ padding: 3 }}>
                                <Grid container spacing={1} sx={{ marginBottom: 3 }}>
                                    <Grid item xs={12}>
                                        <Typography sx={{ marginBottom: 2 }} variant="h4">Work Experience <AddIcon onClick={clickAddWork} sx={{ color: "blueviolet" }} /></Typography>
                                    </Grid>
                                    {workItems}
                                </Grid>
                                <Grid container spacing={1} sx={{ marginBottom: 3 }}>
                                    <Grid item xs={12}>
                                        <Typography sx={{ marginBottom: 2 }} variant="h4">Study Experience <AddIcon onClick={clickAddStudy} sx={{ color: "blueviolet" }} /></Typography>
                                    </Grid>
                                    {studyItems}
                                </Grid>
                                <Grid container spacing={1} sx={{ marginBottom: 3 }}>
                                    <Grid item xs={12}>
                                        <Typography sx={{ marginBottom: 2 }} variant="h4">Project Experience <AddIcon sx={{ color: "blueviolet" }} /></Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} sx={{ marginBottom: 3 }}>
                                    <Grid item xs={12}>
                                        <Typography sx={{ marginBottom: 2 }} variant="h4">Skill Experience <AddIcon sx={{ color: "blueviolet" }} /></Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} sx={{ marginBottom: 3 }}>
                                    <Grid item xs={12}>
                                        <Typography sx={{ marginBottom: 2 }} variant="h4">Award Experience <AddIcon sx={{ color: "blueviolet" }} /></Typography>
                                    </Grid>
                                </Grid>
                            </Paper>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </div >
    );
}
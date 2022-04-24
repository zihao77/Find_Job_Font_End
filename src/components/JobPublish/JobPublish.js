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

async function publishJob(content) {
    return fetch("http://18.117.128.141:5000/jobs/publish", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(res => res.json());
}

export default function JobPublish(props) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [salary, setSalary] = useState("");
    const navigate = useNavigate();

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleDescChange(e) {
        setDesc(e.target.value)
    }

    function handleSalaryChange(e) {
        setSalary(e.target.value);
    }

    async function handleJobPublish() {
        let data = await publishJob({
            "uid": props.uid,
            "token": props.token,
            "title": title,
            "desc": desc,
            "salary": salary
        });
        if (data["code"] == 200) {
            navigate("/CompanyDashboard", { replace: true });
        } else {
            alert("Job publish fail!");
        }
    }

    return (
        <Grid>
            <Grid item xs={12}>
                <TopNavBar title="Publish Job" logout={props.logout} />
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField onChange={handleTitleChange} sx={{ marginBottom: 1 }} fullWidth label="Title" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleDescChange} sx={{ marginBottom: 1 }} fullWidth label="Description" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleSalaryChange} sx={{ marginBottom: 3 }} fullWidth label="Salary" variant="outlined" />
                            </Grid>


                            <Grid item xs={12}>
                                <Button onClick={handleJobPublish} fullWidth variant="contained" >Pubulish Job</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
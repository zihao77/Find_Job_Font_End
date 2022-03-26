import React, { useState } from "react";
import Box from '@mui/material/Box';
import { Grid } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";

async function userLogin(credentials) {
    return fetch("http://3.142.51.105:5000/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(res => res.json());
}

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    let handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    let handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    let handleSignin = async () => {
        const data = await userLogin({
            'email': username,
            'password': password
        });
        console.log(data["uid"]);
        props.setToken(data["token"]);
        props.setUid(data["uid"]);
        props.setRole(data["user_type"]);
        if (data["user_type"] == 0) {
            navigate("/UserDashboard", { replace: true });
        } else {
            navigate("/CompanyDashboard", { replace: true });
        }

    }

    return (
        <Box sx={
            {
                marginTop: 15
            }
        }>
            <Grid container justifyContent="center">
                <Grid item xs={3}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" sx={{ marginBottom: 2 }}>
                                <Avatar sx={{ backgroundColor: "#9c27b0" }}>
                                    <LockIcon />
                                </Avatar>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center">
                                <Typography sx={{ marginBottom: 3 }} variant="h5" gutterBottom component="div">
                                    Sign in
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: 1 }}>
                            <TextField fullWidth label="Username*" variant="outlined" onChange={handleUsernameChange} value={username} />
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: 5 }}>
                            <TextField fullWidth id="filled-basic" label="Password*" type="password" variant="outlined" onChange={handlePasswordChange} value={password} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleSignin} fullWidth variant="contained" >Sign In</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
                                <MaterialLink underline="hover" component={RouterLink} to="/Regist">
                                    Don't have an account? Sign Up
                                </MaterialLink>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    );
}
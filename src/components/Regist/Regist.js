import React, { useState } from "react";
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

async function userRegist(credentials) {
    return fetch("http://3.142.51.105:5000/user/register", {
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
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    let navigate = useNavigate();

    let handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    let handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    let handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    let handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    let handleSignup = async () => {
        const data = await userRegist({
            'email': username,
            'password': password,
            'confirm_password': confirmPassword,
            'user_type': role
        });
        props.setToken(data["token"]);
        props.setUid(data["uid"]);
        props.setRole(data["user_type"]);
        navigate("/UserDashboard", { replace: true });
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
                                    <KeyIcon />
                                </Avatar>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center">
                                <Typography sx={{ marginBottom: 3 }} variant="h5" gutterBottom component="div">
                                    Sign Up
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: 1 }}>
                            <TextField fullWidth label="Username*" variant="outlined" onChange={handleUsernameChange} value={username} />
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: 1 }}>
                            <TextField fullWidth id="filled-basic" label="Password*" type="password" variant="outlined" onChange={handlePasswordChange} value={password} />
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: 1 }}>
                            <TextField fullWidth id="filled-basic" label="Confirm Password*" type="password" variant="outlined" onChange={handleConfirmPasswordChange} value={confirmPassword} />
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: 5 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="Age"
                                    onChange={handleRoleChange}
                                >
                                    <MenuItem value={0}>User</MenuItem>
                                    <MenuItem value={1}>Company</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleSignup} fullWidth variant="contained" >Sign Up</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
                                <MaterialLink underline="hover" component={RouterLink} to="/Login">
                                    Already have an account? Sign In
                                </MaterialLink>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    );
}
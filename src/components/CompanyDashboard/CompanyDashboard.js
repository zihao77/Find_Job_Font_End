import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper, Avatar, MenuList, MenuItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails, CardHeader, Link } from "@mui/material";
import { deepOrange } from '@mui/material/colors';
import DraftsIcon from '@mui/icons-material/Drafts';
import StoreIcon from '@mui/icons-material/Store';
import SignpostIcon from '@mui/icons-material/Signpost';
import WorkIcon from '@mui/icons-material/Work';
import Post from '../Post/Post'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import Divider from '@mui/material/Divider';
import TopNavBar from "../TopNavBar/TopNavBar";
import { PropaneSharp } from "@mui/icons-material";
import { useNavigate } from "react-router";
import Pagination from '@mui/material/Pagination';

// Api: moment/list
async function getPosts(credentials) {
    return await fetch("http://18.117.128.141:5000/moment/list", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
}

async function getNumberOfPost() {
    return await fetch("http://18.117.128.141:5000/moment/count", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(res => res.json())
}

export default function CompanyDashboard(props) {
    const [posts, setPosts] = useState({ "post": [] });
    const [numberOfMoment, setNumberOfMoment] = useState(0);
    const [pageNum, setPageNum] = useState(0);
    let navigate = useNavigate();

    useEffect(async () => {
        console.log(props.uid);
        console.log(props.token);
        const data = await getPosts({
            "uid": props.uid,
            "token": props.token,
            "page": 0,
            "page_size": 5
        });
        setPosts({
            "post": data["data"]
        });
    }, []);

    useEffect(async () => {
        const data = await getNumberOfPost();
        setNumberOfMoment(data["data"]["num"]);
    }, [])

    useEffect(() => {
        setPageNum(Math.ceil(numberOfMoment / 5));
    }, [numberOfMoment])

    async function clickPagination(event, value) {
        const data = await getPosts({
            "uid": props.uid,
            "token": props.token,
            "page": (value - 1),
            "page_size": 5
        });
        setPosts({
            "post": data["data"]
        });
    }

    function logout() {
        props.logout();
    }

    // function clickAvatar() {
    //     navigate("/IndividualProfile");
    // }

    function handleClickMessageBox() {
        navigate('/Message');
    }

    function handleClickJobPublish() {
        navigate('/JobPublish');
    }

    function handleClickPostMoment() {
        navigate('/PostMoment');
    }

    function handleClickJobList() {
        navigate('/JobList');
    }

    let temp = posts["post"].map((item, key) => {
        return (<Post key={key} uid={props.uid} token={props.token} posts={item} />);
    });

    return (
        <div>

            <Grid container>
                <Grid item xs={12}>
                    <TopNavBar title="DashBoard" logout={logout} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
                        <Grid item xs={10} >
                            <Grid container spacing={3}>
                                {/* left */}
                                <Grid item xs={9}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Paper elevation={2}>
                                                {posts["post"].length > 0 && temp}
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container justifyContent="center">
                                                <Grid item sx={{ marginTop: "10px", marginBottom: "50px" }}>
                                                    <Pagination size="large" onChange={clickPagination} count={pageNum} shape="rounded" />
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* right side */}
                                <Grid item xs={3} >
                                    <Paper elevation={2}>
                                        <Grid container >
                                            <Grid item xs={12} >
                                                <Grid container justifyContent="center" sx={{ backgroundColor: "black" }}>
                                                    <Avatar sx={{ bgcolor: "gray", marginTop: 5, marginBottom: 5 }}>{props.uid}</Avatar>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MenuList>
                                                    <MenuItem onClick={handleClickMessageBox}>
                                                        <ListItemIcon>
                                                            <DraftsIcon />
                                                        </ListItemIcon>
                                                        <ListItemText>Message Box</ListItemText>
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClickPostMoment}>
                                                        <ListItemIcon>
                                                            <SignpostIcon />
                                                        </ListItemIcon>
                                                        <ListItemText>Post Moment</ListItemText>
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClickJobPublish}>
                                                        <ListItemIcon>
                                                            <StoreIcon />
                                                        </ListItemIcon>
                                                        <ListItemText>Job Publish</ListItemText>
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClickJobList}>
                                                        <ListItemIcon>
                                                            <TrackChangesIcon />
                                                        </ListItemIcon>
                                                        <ListItemText>Job List</ListItemText>
                                                    </MenuItem>
                                                </MenuList>
                                            </Grid>

                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid >
                </Grid>
            </Grid>
        </div >
    );
}
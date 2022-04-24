import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CardContent, Grid, TextField, Button } from "@mui/material";
import TopNavBar from "../TopNavBar/TopNavBar";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

async function postMoment(content) {
    return fetch("http://18.117.128.141:5000/moment/post", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(res => res.json());
}

export default function (props) {
    const [content, setContent] = useState();
    let navigate = useNavigate();

    async function handleClickPost() {
        let data = await postMoment({
            "uid": props.uid,
            "token": props.token,
            "content": content
        });

        if (data["code"] == 200) {
            if (props.role == 0) {
                navigate("/UserDashboard");
            } else {
                navigate("/CompanyDashboard");
            }
        } else {
            alert("Post fails");
        }

    }

    function inputChange(e) {
        setContent(e.target.value);
    }


    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <TopNavBar title="Post Moment" logout={props.logout} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
                        <Grid item xs={6}>
                            <Card>
                                <CardContent sx={{ height: 300 }} >
                                    <TextField onChange={inputChange} fullWidth multiline rows={10} label="Say something..." variant="filled" />
                                </CardContent>
                                <CardActions>
                                    <Button onClick={handleClickPost} sx={{ marginLeft: "auto", marginRight: 1 }} variant="contained" endIcon={<SendIcon />}>
                                        Post
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    );
}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Grid } from "@mui/material";
import TopNavBar from "../TopNavBar/TopNavBar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

async function getMessageList(content) {
    return await fetch("http://18.117.128.141:5000/message/list", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    })
        .then(res => res.json())
}

function Message(props) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>
                    User: {props.item.from_uid}
                    <Typography variant="caption" sx={{ color: "gray", marginLeft: 1 }}>
                        {props.item.date}
                    </Typography>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {props.item.content}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}


export default function (props) {
    const [messageList, setMessageList] = useState({ "data": [] });
    let navigate = useNavigate();

    useEffect(async () => {
        let data = await getMessageList({
            "uid": props.uid,
            "token": props.token,
            "peer_uid": "",
            "read": 0
        });

        if (data["code"] == 200) {
            if (JSON.stringify(data["data"]) != '{}') {
                setMessageList({ "data": data["data"] });
            }
        } else {
            alert("Get message list fail!");
        }
    }, []);

    const messages = messageList.data.map((item, key) => {
        return (<Message key={key} item={item} />);
    })

    return (

        <div>
            <Grid container>
                <Grid item xs={12}>
                    <TopNavBar logout={props.logout} title="Message Box" />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <Grid item xs={8} sx={{ marginTop: 8 }}>
                            {messages}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
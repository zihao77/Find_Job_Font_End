import React from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import Divider from '@mui/material/Divider';
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Comment from "../Comment/Comment";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    color: !expand ? 'black' : 'gray',
    backgroundColor: !expand ? 'white' : 'black',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function (props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const post = props.posts;
    const comments = props.posts.comment.map((item, key) => {
        return <Comment comment={item} key={key} />
    });

    return (
        <Card sx={{ marginBottom: 1 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    </Avatar>
                }
                title={post.name}
                subheader={post.date}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <CommentIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Divider variant="middle" />
                <CardContent>
                    <Grid container sx={{ marginBottom: 2 }}>
                        <Grid item xs={9}>
                            <TextField size="small" label="Say something..." fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={2} sx={{ marginLeft: "auto" }}>
                            <Button fullWidth variant="outlined">Post</Button>
                        </Grid>
                    </Grid>
                    {comments}
                </CardContent>
            </Collapse>
        </Card >
    );
}
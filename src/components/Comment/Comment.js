import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardHeader } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function (props) {
    const comment = props.comment;
    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" component="span">{comment.name}</Typography>
                    <Typography sx={{ marginLeft: 2 }} color="text.secondary" variant="h7" component="span">{comment.date}</Typography>
                    <Typography sx={{ marginTop: 2 }}>{comment.content}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
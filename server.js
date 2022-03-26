var express = require('express');
var cors = require('cors');

const app = express();

app.use(cors());

app.use('/login', (req, res) => {
    res.send({
        token: 'test123'
    });
});


app.use('/getMoments', (req, res) => {
    res.send({
        "post": [{
            "content": "Hello World",
            "date": "2022-3-10",
            "name": "Jake",
            "comment": [{
                "name": "cat",
                "date": "1997-9-0",
                "content": "nice!"
            }, {
                "name": "cat",
                "date": "1997-9-0",
                "content": "nice!"
            }]
        }, {
            "content": "Hello World",
            "date": "2022-3-11",
            "name": "jimmy",
            "comment": [{
                "name": "GG",
                "date": "2022-3-11",
                "content": "Good work!"
            }]
        }, {
            "content": "Hello World",
            "date": "2022-3-19",
            "name": "Frank",
            "comment": [{
                "name": "dog",
                "date": "2022-3-11",
                "content": "Amazing!"
            }]
        }, {
            "content": "Hello World",
            "date": "2022-3-19",
            "name": "Frank",
            "comment": [{
                "name": "dog",
                "date": "2022-3-11",
                "content": "Amazing!"
            }]
        }]
    })
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));
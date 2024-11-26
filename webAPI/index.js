const express = require('express');
const cors = require('cors');

/*
What to work on:

GET for all staff

GET for a specific staff

POST for staff (new staff)

PUT for staff

Example for using an id:

For URL params
/book/:bookid

let bid = req.params.bookid;


//Getting data from POST that was sent via BODY

let obj = req.body;

*/

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, function(){
    console.log("server now started")
});
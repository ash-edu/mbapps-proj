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

let staffData = [
    {
        id: 1,
        name: "John Smith",
        phone: "02",
        department: "",
        address: {
            street: "1 Code Lane",
            city: "Javaville",
            state: "NSW",
            postcode: "0100",
            country: "Australia"
        }
    },
    {
        id: 2,
        name: "Sue White",
        phone: "03 8899 2255",
        department: 2,
        address: {
            street: "16 Bit Way",
            city: "Byte Cove",
            state: "QLD",
            postcode: "1101",
            country: "Australia"
        }
    },
    {
        id: 3,
        name: "Bob O'Bits",
        phone: "05 7788 2255",
        department: 3,
        address: {
            street: "8 Silicon Road",
            city: "Cloud Hills",
            state: "VIC",
            postcode: "1001",
            country: "Australia"
        }
    },
    {
        id: 4,
        name: "Mary Blue",
        phone: "06 4455 9988",
        department: 2,
        address: {
            street: "4 Processor Boulevard",
            city: "Appletson",
            state: "NT",
            postcode: "1010",
            country: "Australia"
        }
    },
    {
        id: 5,
        name: "Mick Green",
        phone: "02 9988 1122",
        department: 3,
        address: {
            street: "700 Bandwidth Street",
            city: "Bufferland",
            state: "NSW",
            postcode: "0110",
            country: "Australia"
        }
    }
]

const departments = [
    { id: 0, name: "General"},
    { id:1, name: "Information Communications Technology" },
    { id: 2, name: "Finance" },
    { id: 3, name: "Marketing" },
    { id: 4, name: "Human Resources" }
]
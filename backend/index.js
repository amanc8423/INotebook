const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/inotebook");
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));

app.use('/api/notes',require('./routes/notes'));

app.listen(5000,()=>{console.log("server on")});


  


/*
The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. 
*/



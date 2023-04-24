const app = require('express')();

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/notebook");

app.use('/api/auth',require('./routes/auth'));

app.use('/api/notes',require('./routes/notes'));

app.listen(5000,()=>{console.log("server on")});





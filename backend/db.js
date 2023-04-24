const app = require('express')();

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/notebook");

// app.get('/',(req,res)=>{
//     res.send("hello aajay");
// });




app.listen(5000,()=>{console.log("server on")});





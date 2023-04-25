const express = require('express');

const {body,validationResult}= require('express-validator');

const router = express.Router();

const User =require("../models/User");

//create a user using : POST "/api/auth/" doesnt require auth
router.post('/',[

    body('name',"enter valid name").isLength({min:3}), // we can add validationlayer like enter valid name in all
    body('email').isEmail(),
    body('password').isLength({min:5}),


],(req,res)=>{


const errors = validationResult(req);
if(!errors.isEmpty()){
   return res.status(400).json({errors:errors.array()});
}

User.create({
    name:req.body.name,
    password:req.body.password,
    email:req.body.email,
}).then(user=>res.json(user)); // here user is newly created user return by promise based create fucntion


})

module.exports = router;











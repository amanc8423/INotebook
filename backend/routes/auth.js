const express = require('express');

const {body,validationResult}= require('express-validator');

const router = express.Router();

const User =require("../models/User");

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const JWT_SECRET = "amanisgoodboy"

//create a user using : POST "/api/auth/createuser" doesnt require auth  .No login required 
router.post('/createuser',[

    body('name',"enter valid name").isLength({min:3}), // we can add validationlayer like enter valid name in all
    body('email').isEmail(),
    body('password').isLength({min:5}),


],async (req,res)=>{
// if there are erros ,return bad request and errors

const errors = validationResult(req);
if(!errors.isEmpty()){
   return res.status(400).json({errors:errors.array()});
}

// chech whether the user with this email exist already

try{ 
let user = await User.findOne({email:req.body.email})

if(user){
    return res.status(400).json({error:"email already in use"})
}
const salt= await bcrypt.genSalt(10);
secPass = await bcrypt.hash(req.body.password,salt); 
//  we use bcrypt js to provide more security to password ,bcryptjs use hashing to store passwrof but it can get accessed by rainbow table so we also use salt 

// creating a new user
 user = await User.create({
    name:req.body.name,
    password:secPass,
    email:req.body.email,
});

//.then(user=>res.json(user)); // here user is newly created user return by promise based create fucntion

const data = {
     user:{
        id: user.id
     }
}

const  authtoken= jwt.sign(data,JWT_SECRET);
console.log(authtoken);
// res.json(user)
res.json({authtoken})

}
catch(error){
    console.error(error.message)
    res.status(500).json({error:"some error"})
}

})

module.exports = router;





// https://express-validator.github.io/docs/guides/getting-started/


//jwt io








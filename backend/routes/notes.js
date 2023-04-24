const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    
    obj = {
        a:'aman',
        number:45
    }
    res.send(obj)
})

module.exports = router;
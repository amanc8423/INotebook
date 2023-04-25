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
















/*
`express.Router()` is a class in the Express.js framework for Node.js that creates a new router object. This router object allows you to define a set of routes and corresponding HTTP methods (such as GET, POST, PUT, and DELETE) that are associated with those routes.

Here's a simple example of how to use `express.Router()`:

```javascript
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('This is the homepage!');
});

router.get('/about', function(req, res) {
  res.send('This is the about page!');
});

module.exports = router;
```

In this example, we create a new router object and define two routes: `/` and `/about`. We use the `router.get()` method to associate an HTTP GET request with each route, and provide a callback function that sends a response to the client.

Note that we export the router object at the end of the file using `module.exports`, which allows us to use the router in other parts of our application.

*/
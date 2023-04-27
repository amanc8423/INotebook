const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

// Route 1 : get all the notes  using : GET "/api/auth/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("internal server error1");
  }
});

// Route 2 : add a new note  using : POST "/api/auth/addnote". login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter valid title").isLength({ min: 3 }), // we can add validationlayer like enter valid name in all
    body("description", "Description must be atleast of length 5").isLength({
      min: 5
    })
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json("internal server error1");
    }
  }
);



router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
      // Create a newNote object
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      // Find the note to be updated and update it

    // let id = req.params.id;
    //   let n_id = id.trim();
      let note = await Note.findOneAndUpdate(req.params.id,{ $set: newNote }, { new: true });

       console.log(note);
      if (!note) { return res.status(404).send("Not Found") }

      if (note.user.toString() !== req.user.id) {
        console.log(note.user.toString(),req.user.id);
          return res.status(401).send("Not Allowed");
      }
     // note = await Note.findOneAndUpdate(req.params.id, { $set: newNote }, { new: true })// new true help to update
      res.json({ note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})


// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
      // Find the note to be delete and delete it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Note
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
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

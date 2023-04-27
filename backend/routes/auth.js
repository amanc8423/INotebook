const express = require("express");

const { body, validationResult } = require("express-validator");

const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "amanisgoodboy";

const fetchuser = require("../middleware/fetchuser");

//Route 1 : create a user using : POST "/api/auth/createuser" doesnt require auth  .No login required
router.post(
  "/createuser",
  [
    body("name", "enter valid name").isLength({ min: 3 }), // we can add validationlayer like enter valid name in all
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // if there are erros ,return bad request and errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // chech whether the user with this email exist already

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ success, error: "email already in use" });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      //  we use bcrypt js to provide more security to password ,bcryptjs use hashing to store passwrof but it can get accessed by rainbow table so we also use salt

      // creating a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      //.then(user=>res.json(user)); // here user is newly created user return by promise based create fucntion

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(success, authtoken);
      // res.json(user)
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json("internal server error1");
    }
  }
);

// Route 2 : authenticate  a user using : POST "/api/auth/login"   .No login required
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    // body('password').isLength({min:5}),

    body("password", "password cant be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "plz write corect credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "plz write corect credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json("internal server error");
    }
  }
);

// Route 3 : get logged in user details  using : POST "/api/auth/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("internal server error");
  }
});

router.put("/updateuser", fetchuser, async (req, res) => {
  let user = {};
  // distructuring req.body
  const { name, password } = req.body;
  //creating a newnote from updated data
  const newuser = {};
  if (name) {
    newuser.name = name;
  }

  if (password) {
    //passward hashing
    const salt = await bcrypt.genSalt(10);
    const SecPass = await bcrypt.hash(password, salt);
    newuser.password = SecPass;
  }

  //finding and updating note
  user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: newuser },
    { new: true }
  );
  res.json(user);
});

router.delete("/deleteuser", fetchuser, async (req, res) => {
  let success = false;
  //finding and deletings note
  let user = await User.findByIdAndDelete(req.user.id);

  if (!user) {
    // if note doesn't found by id show error
    return res.status(400).json(success);
  }
  success = true;
  res.json({ success });
});

module.exports = router;

// https://express-validator.github.io/docs/guides/getting-started/

//jwt io

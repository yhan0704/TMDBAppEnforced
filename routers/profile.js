const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

// @ route    GET api/profile/me
// @ desc     Get current users profile
// @ access   private
router.get("/me", auth, async (req, res) => {
  try {
    console.log(req.user);
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    // only populate if profile exists
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put(
  "/",
  check("email", "Email is required").notEmpty(),
  check("name", "Name is required").notEmpty(),
  auth,
  async (req, res) => {
    console.log(req.user.id);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userInfo = { name: req.body.name, email: req.body.email };
    const existUser = await User.findOne({ email: req.body.email });

    if (existUser) {
      return res.status(400).json({ errors: [{ msg: "Email is Taken" }] });
    }

    try {
      let user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: userInfo },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
      await user.save();
      return res.status(200).json([{ msg: "SUCCESS" }]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;

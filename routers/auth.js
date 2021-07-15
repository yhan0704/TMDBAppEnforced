const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

//middleware auth에서 JWT로 암호화된 user.id를
//해석해서 user.id를 가져온다
//req.user.id를 const user에다가 저장한다.
//그리고 findById로
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.post(
  "/",
  check("email", "Email is required").notEmpty(),
  check("password", "Password should be more than 6 characters").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

router.get("/:user_id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id }).select(
      "-password"
    );
    await user.save();
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.put(
  "/",
  check("email", "Email is required").notEmpty(),
  check("name", "Name is required").notEmpty(),
  auth,
  async (req, res) => {
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
        { _id: req.body._id },
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

router.post("/user/myMovies", auth, async (req, res) => {
  const { original_title, poster_path, movieId } = req.body;
  const favorite = { original_title, poster_path, movieId };
  try {
    const user = await User.findOne({ _id: req.user.id }).select("-password");
    user.favorites.unshift(favorite);
    user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.delete("/user/myMovies/:movie_id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select("-password");
    user.favorites = user.favorites.filter(
      (movie) => movie._id.toString() !== req.params.movie_id
    );
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

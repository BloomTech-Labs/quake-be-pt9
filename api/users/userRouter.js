const Users = require("./userModel");
const bcrypt = require("bcrypt");
const secrets = require("../../config/secrets");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

router.get("/all", (req, res) => {
  Users.getUsers()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "error getting the users." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "could not find that user" });
      }
    })
    .catch((err) => {
      res.status(500).json("could not get");
    });
});

router.post("/register", authReg, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  const token = genToken(user);

  Users.addUser(user)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/login", authLogin, (req, res) => {
  let { email, password } = req.body;
  Users.findBy({ email })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(200).json({
          message: `Welcome ${user.email}! `,
          user: {
            user_id: user.id,
            email: user.email,
            token: token,
            city: user.city,
            country: user.country,
          },
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: errror });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then((count) => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find that user" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete" });
    });
});

function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = { expiresIn: "1h" };

  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}

function authLogin(req, res, next) {
  const { email, password } = req.body;

  email && typeof email == "string"
    ? password && typeof password == "string"
      ? next()
      : res.status(400).json({
          message: "Missing password, or password is not a string",
        })
    : res.status(400).json({
        message: " Request is missing email or email is not a string.",
      });
}

function authReg(req, res, next) {
  const { email, password } = req.body;
  email && typeof email == "string"
    ? password && typeof password == "string"
      ? next()
      : res.status(400).json({
          message: "Missing password, or password is not a string",
        })
    : res.status(400).json({
        message: " Request is missing email or email is not a string.",
      });
}

function dupeEmailCheck(req, res, next) {
  const { email } = req.body;
  Users.findBy({ email })
    .then((user) => {
      if (user) {
        res.status(409).json({ message: "Username already in use" });
      } else {
        next();
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error checking for duplicate username" });
    });
}

module.exports = router;

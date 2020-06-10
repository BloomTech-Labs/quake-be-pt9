const router = require("express").Router();
const Users = require("./userModel");

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

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const apiRouter = require("./routes/apiRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api", apiRouter);

server.get("/", (req, res) => {
  res.send("Quake Online!");
});

module.exports = server;
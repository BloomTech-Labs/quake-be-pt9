require('dotenv').config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get("/", (req, res) => {
  res.send("Quake Online!");
});

module.exports = server;
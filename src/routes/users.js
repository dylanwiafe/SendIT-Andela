import express from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const saltRounds = 10;

const userRouter = express.Router();

function readUsers() {
  let users = fs.readFileSync(__dirname + "./../data/users.json", "utf8");
  return JSON.parse(users);
}

function writeUserToFile(data) {
  fs.writeFileSync(__dirname + "./../data/users.json", data);
}

const getAllUser = (req, res) => {
  const users = readUsers();

  return res.json(users);
};

const addUser = (req, res) => {
  let users = readUsers();
  let password = req.body.password;

  // hash the user password
  const passwordHash = bcrypt.hashSync(password, saltRounds);

  // Creates a new user
  const newUser = {
    user_id: uuidv4(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: passwordHash,
  };

  users.push(newUser);

  writeUserToFile(JSON.stringify(users));

  return res.json({ message: "New user created sucessfully", user: newUser });
};

userRouter.route("/").post(addUser);
userRouter.route("/").get(getAllUser);

module.exports = userRouter;
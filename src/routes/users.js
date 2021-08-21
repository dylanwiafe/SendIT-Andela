import express from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import User from "./models/user.model";
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
  // const users = readUsers();
  User.find()
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      return res.status(404).json({ message: "no users found" });
    });

  // return res.json(users);
};

const addUser = (req, res) => {
  let users = readUsers();
  let password = req.body.password;

  // hash the user password
  const passwordHash = bcrypt.hashSync(password, saltRounds);

  // Creates a new user
  // const newUser = {
  //   user_id: uuidv4(),
  //   first_name: req.body.first_name,
  //   last_name: req.body.last_name,
  //   password: passwordHash,
  // };

  const newUser = new User({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: passwordHash,
  });

  // TODO:
  // implement basic error handling to the signup/addUser route

  newUser
    .save()
    .then(() => {
      return res.json({
        message: "New user created sucessfully",
        user: newUser,
      });
    })
    .catch((err) => {
      return res.status(400).json({ message: "bad request" });
    });

  // users.push(newUser);

  // writeUserToFile(JSON.stringify(users));

  // return res.json({ message: "New user created sucessfully", user: newUser });
};

userRouter.route("/").post(addUser);
userRouter.route("/").get(getAllUser);

module.exports = userRouter;

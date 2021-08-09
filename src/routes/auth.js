import express from "express";
import fs from "fs";
const authRouter = express.Router();

const login = (req, res) => { 
    // user should be able to login with an email and password
    // get all users from the users.json i.e create a readusers function to get all users
    // search if user email exists in the users.json file
    // if above returns true, compare the password of returned user using
    // and 

};

authRouter.route("/login").post(login);
module.exports(authRouter);

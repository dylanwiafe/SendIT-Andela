import express, { json } from "express";
import fs, { read } from "fs";
const authRouter = express.Router();

function readUsers() {
  let users = fs.readFileSync(__dirname + "./../data/users.json", "utf8");
  return JSON.parse(users);
}
const login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  console.log(parsedEmail);
  console.log(parsedPassword);

  // get all users from the users.json i.e create a readusers function to get all users
  let userData = readUsers();
  // console.log(userData);

  // user should be able to login with an email and password

  // search if user email exists in the users.json file

  let found = userData.find((user) => {
    // if (email !== user.email) {

    // }
    // if above returns true, compare the password of returned user using bcrypt compare() function
    // and if it returns false set status to 400 and return an invalid user error message
    return email === user.email;

    bcrypt.compare(password, user.password, () => {
      if (error) {
        return res.status(400).json({
          message:
            "an item with the specificed email does not exist, please check your id again to verify you entered it correctly",
        });
      } else {
        res.json({ success });
      }
    });

    // return res.send(`email: ${email} password: ${password}`);
  });
  // mongodb Atlas, npm mongoose (mongodb orm)
};

authRouter.route("/").post(login);
module.exports = authRouter;

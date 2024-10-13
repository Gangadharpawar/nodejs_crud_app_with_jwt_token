import { createUser, findbyUsername } from "./db/mongo/Auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.fname ||
      !req.body.lname ||
      !req.body.dob ||
      !req.body.mobile
    ) {
      res.status(400).json({ message: "email and password Required" });
      return;
    }
    var haspassword = bcrypt.hashSync(req.body.password, process.env.SALT);
    await createUser(
      req.body.fname,
      req.body.lname,
      req.body.dob,
      req.body.mobile,
      req.body.email,
      haspassword
    );
    res.status(201).json({ message: "User Created" });
  } catch (error) {
    console.log("error:", error);
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ message: "UserName and Password required" });
      return;
    }
    //find user by email
    const user = await findbyUsername(req.body.email);
    console.log("user", user);
    //compare password
    const ispassMatch = bcrypt.compareSync(req.body.password, user.password);
    //if success -> genereate token
    if (ispassMatch) {
      const MyUser = {
        email: user.email,
      };
      var token = jwt.sign(MyUser, process.env.JWT_SECRET_TOKEN);
      res.status(200).json({ message: "Login success", token: token });
      return;
    }
    //else error
    res.status(401).json({ message: "Login Failed" });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
}

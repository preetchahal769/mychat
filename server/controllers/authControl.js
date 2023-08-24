// setting up authentication protocols for signup and login
import jwt from "jsonwebtoken";
import userAuth from "../models/userAuthSchema.js";
import brcypt from "bcryptjs";
import dotenv from "dotenv";

// loading data from .env

dotenv.config();

// secretKey for json web token from .env
const secretKey = process.env.TOKEN_KEY;

// use of 'async' before every req and 'await' before every query to database is necessary

// defining authentication protocol for new user signup

export const signup = async (req, res) => {
  try {
    // getting input field values from signup form

    const { name, username, email, password, cnfpassword } = req.body;

    // validating input fields

    if (!name.trim()) {
      // if name fied is empty
      return res.status(409).json("Name can't be empty !");
    } else {
      if (!username.trim()) {
        // if username field is empty
        return res.status(409).json("Username can't be empty !");
      } else {
        // db query to check if username already exists or not

        const unameExists = await userAuth.findOne({ username });

        if (unameExists) {
          // if username already exists
          return res.status(409).json("Username already exists !");
        } else {
          if (!email.trim()) {
            // if email field is empty
            return res.status(409).json("Email can't be empty !");
          } else {
            // db query to check if email already exists or not

            const emailExists = await userAuth.findOne({ email });

            if (emailExists) {
              // if email already exists
              return res.status(409).json("Email already exists !");
            } else {
              if (!password.trim()) {
                // if password field is empty
                return res.status(409).json("Password can't be empty !");
              } else {
                if (!cnfpassword.trim()) {
                  // if cnfpassword field is empty
                  return res
                    .status(409)
                    .json("Confirm password can't be empty !");
                } else {
                  if (password !== cnfpassword) {
                    // if password and cnfpassword do not match
                    return res.status(409).json("Passwords do not match !");
                  } else {
                    // hashing cnfpassword if both password and cnfpassword match

                    const salt = brcypt.genSaltSync(10);
                    const hashedPassword = brcypt.hashSync(cnfpassword, salt);

                    // creating a new user document

                    const newUser = new userAuth({
                      name,
                      username,
                      email,
                      password: hashedPassword,
                    });

                    // saving the newUser to the database collection named 'users'

                    await newUser.save();

                    res
                      .status(201)
                      .json({ message: "User registered successfully" });
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    // handling error while signup

    console.error("Error while signing up:", error);
    res.status(500).json({ message: "An error occurred while signing up" });
  }
};

// defining authentication protocol for user login

export const login = async (req, res) => {
  try {
    // getting input field values from login field (Login.jsx)

    const { username, password } = req.body;

    // validating input fields and checking authorization

    if (!username.trim()) {
      // if username field is empty
      return res.status(409).json("Username can't be empty !");
    } else {
      // db query to check if given username already exists or not

      const unameExists = await userAuth.findOne({ username });

      if (unameExists) {
        // if username already exists
        if (!password.trim()) {
          // if password field is empty
          return res.status(409).json("Password can't be empty !");
        } else {
          // matching given and stored passwords

          const hashedPassword = unameExists.password; // getting stored hash password
          const result = await brcypt.compare(password, hashedPassword); // comparing given and stored hash passwords

          if (result) {
            // if both passwords match
            const user = {
              id: unameExists._id,
              name: unameExists.username,
              password: unameExists.password,
              email: unameExists.email,
            };
            const token = jwt.sign(user, secretKey, { expiresIn: "4m" });
            res
              .status(201)
              .json({ message: "User authorization completed", token: token });
          } else {
            return res.status(409).json("Incorrect  Password !");
          }
        }
      } else {
        return res.status(409).json("Username not found !");
      }
    }
  } catch (error) {
    // returning error details if something goes wrong while signup
    console.error("Error while login:", error);
    res.status(500).json({ message: "An error occurred while signing up" });
  }
};
// define authorization code
export const authorization = async (req, res) => {
  try {
    const authHeader = req.header.Authorization;
    console.log(authHeader);
    if (!authHeader) {
      res.status(401).json({ message: "Authorization token is missing" });
    } else {
      const token = authHeader.replace("Bearer ", "");
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          res.status(403).json({ message: "Token authentication failed" });
        } else {
          res.status(200).json({ message: "Token authentication successful" });
          console.log("Decoded token:", decoded);
          // Perform actions based on the decoded token
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

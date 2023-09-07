// setting up authentication protocols for signup and login
import jwt from "jsonwebtoken";
import userAuth from "../models/userAuthSchema.js";
import brcypt from "bcryptjs";
import dotenv from "dotenv";

// loading data from .env

dotenv.config();

// secretKey for json web token from .env

const secretKey = process.env.TOKEN_KEY;
const SESSION_ID = "access_token"; // naming access_token

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
      // db query to check if a user with given username already exists or not

      const userExists = await userAuth.findOne({ username });

      if (userExists) {
        // if username already exists
        if (!password.trim()) {
          // if password field is empty
          return res.status(409).json("Password can't be empty !");
        } else {
          // matching given and stored passwords

          const hashedPassword = userExists.password; // getting stored hash password
          const result = await brcypt.compare(password, hashedPassword); // comparing given and stored hash passwords

          if (result) {
            // if both passwords match

            const user = {
              id: userExists._id,
              name: userExists.name,
              username: userExists.username,
              email: userExists.email,
            };

            // creating a jsonwebtoken to identify user and provide authority to user for accessing personalized features

            const token = jwt.sign(user, secretKey, { expiresIn: "1hr" });

            try {
              // validating the token before setting up cookie

              if (token) {
                const cookieOptions = {
                  httpOnly: true,
                  expires: new Date(Date.now() + 900),
                  // secure: true, // set this true only when using https
                }

                // if token is valid, create a cookie with user details stored

                res.cookie(SESSION_ID, token, cookieOptions).status(200).json("Token Generated");

              }
            } catch (error) {
              console.error("Error setting cookie:", error);
            }

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
    res.status(500).json({ message: "An error occurred while login in" });
  }
};

// token verification

export const verifyToken = async (req, res) => {
  try {
    // accessing token from cookies in local storage

    const token = req.cookies.access_token;

    // verifying token accessed from cookies

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(403).json("Token authentication failed");
      } else {
        res.status(200).json(decoded); // returning decoded token details
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred while verifiing the token" });
  }
};

// logout function

export const logout = async (req, res) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({ message: "Logout sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "error accoured while logging out" });
  }
}
// setting up controlers for getUser ,updateUser ,dltUser
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// secretKey for json web token from .env

const secretKey = process.env.TOKEN_KEY;
// api to get self user profile 
export const getUser = async (req, res) => {
  try {
    // get the vaule for req
    const { username } = req.body;
    if (!username) {
      // if username field is empty
      return res.status(409).json("Username can't be empty !");
    } else {
      // db query to check if a user with given username  exists or not

      const userExists = await userAuth.findOne({ username });
      if (userExists) {
        return res.status(200).json(userExists);
      } else {
        return res.status(409).json("User not Found");
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export const searchUser = async (req, res) => {
    try {
      // get the vaule for req
      const { username } = req.body;
      if (!username) {
        // if username field is empty
        return res.status(409).json("Username can't be empty !");
      } else {
        // db query to check if a user with given username  exists or not
  
        const userExists = await userAuth.findOne({ username });
        if (userExists) {
          let user = {
            name : userExists.name,
            userName : userExists.userName
          }
          return res.status(200).json(user);
        } else {
          return res.status(409).json("User not Found");
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
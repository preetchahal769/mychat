// setting up authentication protocols for signup and login

import userAuth from "../models/userAuthSchema.js";
import brcypt from 'bcryptjs';

// use of 'async' before every req and 'await' before every query to database is necessary 

// defining authentication protocol for new user signup

export const signup = async (req, res) => {

    try {
        // getting input details from signup form (Signup.jsx)

        const { name, username, email, password, cnfpassword } = req.body;

        // authorizing user details

        if((name) != '')
        {
            if((username) != '')
            {
                // checking if username already exists or not 

                const unameExists = await userAuth.findOne({username});
                
                if(unameExists){
                    return res.status(409).json("Username already exists !")
                }else{
                    if((email) != '')
                    {
                        // checking if email already exists or not

                        const emailExists = await userAuth.findOne({email});
                        
                        if(emailExists){
                            return res.status(409).json("Email already exists !");
                        }else{
                            if((password) != '')
                            {
                                if((cnfpassword) != '')
                                {
                                    // matching passwords

                                    if(cnfpassword == password){

                                        // Hashing the password using bcryptjs with a salt factor of 10

                                        const salt = brcypt.genSaltSync(10);
                                        const hashedPassword = brcypt.hashSync(cnfpassword, salt);

                                        // createing a new user document

                                        const newUser = new userAuth({
                                            name,
                                            username,
                                            email,
                                            password: hashedPassword,
                                        });

                                        // saving the newUser to our predefined 'users' collection

                                        newUser.save();

                                        res.status(201).json({ message: "User registered successfully" });

                                    }else{
                                        return res.status(409).json("Passwords do not match !");
                                    }
                                }else{
                                    return res.status(409).json("Confirm password can't be empty !")
                                }
                            }else{
                                return res.status(409).json("Password can't be empty !"); 
                            }
                        }
                    }else{
                        return res.status(409).json("Email can't be empty !")
                    }
                }
            }else{
                return res.status(409).json("Username can't be empty !");
            }
        }else{
            return res.status(409).json("Name can't be empty !");
        }
    } catch (error) {
        // returning error details if something goes wrong while signup

        console.error("Error while signing up:", error);
        res.status(500).json({ message: "An error occurred while signing up" });
    }
}

// defining authentication protocol for user login

export const login = (req, res) => {
    console.log('auth login');
}
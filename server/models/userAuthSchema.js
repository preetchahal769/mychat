// setting up user authentication model schema

import mongoose from "mongoose";

// schema for the user signing up

const userAuthSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
})

// creating a mongoose model/mongodb collection named 'users' to store our new user details

const userAuth = mongoose.model('users', userAuthSchema);

export default userAuth;
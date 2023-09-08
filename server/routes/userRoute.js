// route setup for user controler  (getUser , dltUser,updateUser)

import express from "express";
import { getUser ,searchUser } from "../controllers/userControl.js";

const router = express.Router();

// directing routes to {getUser} of userControl.js

router.post("/getUser", getUser);
router.post("/searchUser", searchUser);


export default router;
// route setup for user authentication (signup and login)

import express from "express";
import { createRoom , removeRoom , userList } from "../controllers/roomControl.js";

const router = express.Router();

// directing routes to {create, delet, userlist} of roomControl.js

router.post("/newroom", createRoom);
router.post("/deleteroom", removeRoom);
router.post("/deleteroom", joinRoom);
router.get("/userlist", userList);


export default router;
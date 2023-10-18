// route setup for user authentication (signup and login)

import express from "express";
import { createRoom , removeRoom , userList,allRooms } from "../controllers/roomControl.js";

const router = express.Router();

// directing routes to {create, delet, userlist} of roomControl.js

router.post("/newroom", createRoom);
router.post("/deleteroom", removeRoom);
router.get("/allroom", allRooms);
router.get("/userlist", userList);


export default router;
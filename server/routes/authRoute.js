// route setup for user authentication (signup and login)

import express from "express";
import { signup, login } from "../controllers/authControl.js";

const router = express.Router();

// directing routes to {signup, login} of authControl.js

router.post("/signup", signup);
router.post("/login", login);

export default router;
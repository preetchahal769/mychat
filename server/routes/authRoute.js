// route setup for user authentication (signup and login)

import express from "express";
import { signup, login ,authorization } from "../controllers/authControl.js";

const router = express.Router();

// directing routes to {signup, login, authorization} of authControl.js

router.post("/signup", signup);
router.post("/login", login);
router.post("/auth", authorization);

export default router;
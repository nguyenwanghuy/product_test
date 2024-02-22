import express from "express";
import authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = express.Router();

//http://localhost:3969/api
router.post('/login',authController.login)
router.post('/register',authController.register)
router.get('/me',authMiddleware,authController.getMe)


export default router;
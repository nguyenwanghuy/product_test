import express from "express";
import uploadFile from "../configs/upload.multer.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import UserController from "../controllers/user.controller.js";


const router = express.Router();
router.post('/image',authMiddleware,uploadFile.single('image'),UserController.uploadImage)
//http://localhost:3969/api


export default router;
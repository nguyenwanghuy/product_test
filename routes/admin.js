import express from "express";
import adminController from "../controllers/admin.controller.js";
import { verifyTokenAndAdmins } from "../middlewares/auth.middlewares.js";


const router = express.Router();
router.use(verifyTokenAndAdmins)
//http://localhost:3969/api
router.get('/', adminController.getAllUser)
router.put('/:userId', adminController.updateUser)
router.delete('/:id', adminController.deleteUser)

export default router;
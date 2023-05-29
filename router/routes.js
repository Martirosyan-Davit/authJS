import express  from "express";
import UserController from "../controller/user_controller.js";

const router = express.Router();

router.post('/registration', UserController.registrationUser);
router.post('/login', UserController.loginUser);
router.get('/users:email', UserController.getAllUsers);
router.delete('/users:email/:userEmail', UserController.deleteUserByEmail);


export default router;
import express,{ Router, } from "express";
import UserController from "../Controller/userController";

const router : Router = express.Router()

router.route('/register').post(UserController.register)
router.route('/login').post(UserController.Login)
router.route('/forgetpassword').post(UserController.handleForgotPassword)
export default router;

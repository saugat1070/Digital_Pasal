import express, { Router } from "express";
import OrderController from "../Controller/orderController";
import userMiddleware from "../middleware/userMiddleware";
import { errorHandler } from "../services/errorHandler";

const router: Router = express.Router();

router
  .route("/")
  .post(userMiddleware.IsUserLoggeIn, OrderController.createOrder);
router.route("/verifyTransaction").post(OrderController.verifyTransaction);

export default router;

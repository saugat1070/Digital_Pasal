import express, { Router } from "express";
import userMiddleware, { Role } from "../middleware/userMiddleware";
import { errorHandler } from "../services/errorHandler";
import CartController from "../Controller/cartController";
const router: Router = express.Router();

router
  .route("/")
  .post(userMiddleware.IsUserLoggeIn, errorHandler(CartController.addToCart))
  .get(
    userMiddleware.IsUserLoggeIn,
    errorHandler(CartController.getMyCartItem)
  );

router
  .route("/:productId")
  .patch(
    userMiddleware.IsUserLoggeIn,
    userMiddleware.accessTo(Role.Customer),
    errorHandler(CartController.updateCartItem)
  )
  .delete(
    userMiddleware.IsUserLoggeIn,
    userMiddleware.accessTo(Role.Customer),
    errorHandler(CartController.deleteCart)
  );

export default router;

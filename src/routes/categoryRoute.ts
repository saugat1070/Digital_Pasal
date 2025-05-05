import express,{ Router } from "express";
import CategoryController from "../Controller/categoryController";
import userMiddleware from "../middleware/userMiddleware";
// const router = new Router()
const router : Router = express.Router()

// router.route('/seedCategory').post(categoryController.seedCategory)
router.route('/category').get(userMiddleware.IsUserLoggeIn,CategoryController.getCategory).post(CategoryController.addCategory)
router.route('/category/:id').patch(CategoryController.updateCategory).delete(CategoryController.deleteCategory)
export default router
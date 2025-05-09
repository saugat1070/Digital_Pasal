import express,{ Router } from "express";
import { ProductController } from "../Controller/productController";
import userMiddleware, {Role} from "../middleware/userMiddleware";
import { multer,storage } from "../middleware/multer";
import { UpdatedAt } from "sequelize-typescript";

const upload = multer({storage:storage})

const router : Router = express.Router()

router.route("/")
.post(userMiddleware.IsUserLoggeIn,userMiddleware.accessTo(Role.Admin),ProductController.createProduct)
.get(ProductController.getAllProduct)


router.route("/:id")
.patch(userMiddleware.IsUserLoggeIn,userMiddleware.accessTo(Role.Admin) ,ProductController.UpdateProduct)
.delete(userMiddleware.IsUserLoggeIn,userMiddleware.accessTo(Role.Admin) ,ProductController.deleteProduct)

export default router;
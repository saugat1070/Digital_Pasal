import express,{ Router } from "express";
import { ProductController } from "../Controller/productController";
import userMiddleware, {Role} from "../middleware/userMiddleware";
import { multer,storage } from "../middleware/multer";
import { UpdatedAt } from "sequelize-typescript";
import { errorHandler } from "../services/errorHandler";

const upload = multer({storage:storage})

const router : Router = express.Router()

router.route("/")
.post(userMiddleware.IsUserLoggeIn,userMiddleware.accessTo(Role.Admin),upload.single("productImage"),errorHandler(ProductController.createProduct))
.get(errorHandler(ProductController.getAllProduct));


router.route("/:id")
.get(ProductController.getSingleData)
.patch(userMiddleware.IsUserLoggeIn,userMiddleware.accessTo(Role.Admin) ,errorHandler(ProductController.UpdateProduct))
.delete(userMiddleware.IsUserLoggeIn,userMiddleware.accessTo(Role.Admin) ,errorHandler(ProductController.deleteProduct))

export default router;
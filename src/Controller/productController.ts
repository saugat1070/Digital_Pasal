import express, { Request, Response } from "express"
import Product from "../Database/models/productModel";
import Category from "../Database/models/categoryModel";

// interface ProductRequest extends Request {
//     file: {
//         filename: string
//     }
// }
class ProductController {
    static async createProduct(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        let filename : string | null = null;
        const { productName, productDescription,
            productPrice, productQuantity, productDiscount, categoryId
        } = req.body;
        filename = req.file ? req.file.filename as string : "https:something.com";
        
        if (!productName || !productDescription || !productPrice
            || !productQuantity || !categoryId
        ) {
            res.status(400).json({
                message: "please provide productName, productDescription, productPrice, productQunatity, discount"
            });
            return;
        }

        try {
            await Product.create({
                productName: productName,
                productDescription: productDescription,
                productPrice: productPrice,
                productQuantity: productQuantity,
                productDiscount: productDiscount || 0,
                categoryId: categoryId,
                imageUrl: filename
            });

            res.status(200).json({
                message: "Product created Successfully"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "An error occurred while creating the product"
            });
        }
    }

    static async getAllProduct(req: Request, res: Response) {
        const datas = await Product.findAll({
            include: [
                {
                    model: Category,
                    
                }
            ]
        })
        if (datas.length === 0) {
            res.status(404).json({
                message: "Data is not found"
            })
            return;
        }

        res.status(200).json({
            message: "Data fetch succussfully",
            data : datas
        })

    }

    static async getSingleData(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            res.status(403).json({
                message: "please provide id of product"
            })
            return
        }

        /* const single_data = await Product.findByPk(id,{
            include:{
                model:Category
            }
        }) */
        const [single_data] = await Product.findAll({
            where: {
                id: id
            },
            include: [
                {
                    model: Category,

                }
            ]

        })
        if (!single_data) {
            res.status(404).json({
                message: "Data is not found"
            })
            return;
        }
        res.status(200).json({
            message: "Data fetch successfully",
            data: single_data
        })

    }

    static async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: "please provide id"
            })
            return;
        }

        const [single_data] = await Product.findAll({
            where: {
                id: id
            },
            include: [
                {
                    model: Category
                }
            ]
        })

        if (!single_data) {
            res.status(403).json({
                message: "product is not found"
            })
            return;
        }

        await Product.destroy({
            where: {
                id: id
            }
        })

        res.status(200).json({
            message: "Product deleted successfully"
        })
    }

    static async UpdateProduct(req: Request, res: Response) {
        const { id } = req.params
        if (req.file) {
            const newProduct = req.file.filename
            const product = await Product.findByPk(id);
        }
        const { productName, productDescription,
            productPrice, productQuantity, discount, categoryId } = req.body

        await Product.update({
            productName,
            productDescription,
            productPrice,
            productQuantity,
            discount,
            categoryId
        }, {
            where: {
                id: id
            }
        })
    }
}

export { ProductController }
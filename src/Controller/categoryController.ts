import Category from "../Database/models/categoryModel"
import { Request, Response } from "express"

class CategoryController {
    categroyData = [
        {
            categoryName: "Electronics"
        },
        {
            categoryName: "Groceries"
        },
        {
            categoryName: "Foods"
        }
    ]

    async seedCategory(): Promise<void> {
        const datas = await Category.findAll()
        if (datas.length == 0) {
            await Category.bulkCreate(this.categroyData)
            console.log("Categories seeded");
        }
        else {
            console.log("Category already seeded");
        }
    }

    async addCategory(req: Request, res: Response): Promise<void> {
        const { categoryName } = req.body
        if (!categoryName) {
            res.status(400).json({
                message: "please provide name of category"
            })
            return
        }

        await Category.create({
            categoryName: categoryName
        })
        res.status(201).json({
            message: "category is created successfully"
        })

    }

    async getCategory(req: Request, res: Response): Promise<void> {
        const data = await Category.findAll()
        res.status(200).json({
            message: "category fetched successfully",
            data: data
        })
    }

    async deleteCategory(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        if (!id) {
            res.status(400).json({
                message: "please provide id to delete"
            })
            return
        }
        // await Category.findByPk(id)  -->alternative way return object
        const fetch_data = await Category.findAll({
            where: {
                id: id
            }
        })

        if (fetch_data.length === 0) {
            res.status(404).json({
                message: "No Category data is found with this id"
            })
        }
        else {
            Category.destroy({
                where: {
                    id: id
                }
            })

            res.status(200).json({
                message: "category is deleted successfully"
            })

        }


    }

    async updateCategory(req:Request,res:Response):Promise<void>{
        const {id} = req.params
        const {categoryName} = req.body

        if(!id || !categoryName){
            res.status(400).json({
                message: "please provide id,categoryName to update"
            })
            return
        }

        const [data] = await Category.findAll({
            where:{
                id : id
            }
        })

        if(!data){
            res.status(404).json({
                message : "category with this id params is not found"
            })
        }
        else{
            // await Category.update({
            //     categoryName : categoryName
            // },{
            //     where:{
            //         id : id
            //     }
            // })
            data.categoryName = categoryName;
            await data.save()

            res.status(200).json({
                message : "Category updated successfully"
            })
        }
    }

}

export default new CategoryController
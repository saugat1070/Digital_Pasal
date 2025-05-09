import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
import User from "./models/userModel";
import Product from "./models/productModel";
import Category from "./models/categoryModel";
import Order from "./models/orderModel";
import Payment from "./models/paymentModel";
const sequelize = new Sequelize(envConfig.db_uri as string,
    {
        dialect : 'postgres',
        models : [User,Product,Category,Order,Payment]
    }
);

try {
    sequelize.authenticate().then(()=>{
        console.log("Database connected successfully!");
    })
    .catch((err)=>{
        console.log(err);
    })
    
} catch (error) {
    console.log(error);    
}

 sequelize.sync({force: false,alter:true}).then(()=>{
    console.log("synced!!");
 })

 //relationships //
 Product.belongsTo(Category,{foreignKey:'categoryId'})
 Category.hasOne(Product,{foreignKey:'categoryId'})
// Category.belongsTo(Product) -> yesma Catgory table maa product id link huncha
// Product.hasOne(Category)

export default sequelize;
import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
import User from "./models/userModel";
import Product from "./models/productModel";
import Category from "./models/categoryModel";
import Order from "./models/orderModel";
import Payment from "./models/paymentModel";
import OrderDetails from "./models/orderDetailModel";
import Cart from "./models/cartModel";
const sequelize = new Sequelize(envConfig.db_uri as string,
    {
        dialect : 'postgres',
        models : [User,Product,Category,Order,Payment,OrderDetails,Cart]
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

 sequelize.sync({force: false,alter:false}).then(()=>{
    console.log("synced!!");
 })

 //relationships //
 Category.hasOne(Product,{foreignKey:'categoryId'})
 Product.belongsTo(Category,{foreignKey:'categoryId'})
// Category.belongsTo(Product) -> yesma Catgory table maa product id link huncha
// Product.hasOne(Category)

//user X order
User.hasMany(Order,{foreignKey:'userId'})
Order.belongsTo(User,{foreignKey:'userId'})

//Order X payment
Order.hasOne(Payment,{foreignKey:"orderId"})
Payment.belongsTo(Order,{foreignKey:"orderId"})

// OrderDetails and ProductTable
OrderDetails.belongsTo(Product,{foreignKey:"productId"})
Product.hasMany(OrderDetails,{foreignKey:"productId"})

//Order and OrderDetails
OrderDetails.belongsTo(Order,{foreignKey:"orderId"})
Order.hasOne(OrderDetails,{foreignKey:"orderId"})

//Cart and User
User.hasOne(Cart,{foreignKey:'userId'})
Cart.belongsTo(User,{foreignKey:'userId'})

//Cart and Product
Product.hasMany(Cart,{foreignKey:"productId"})
Cart.belongsTo(Product,{foreignKey:"productId"})


export default sequelize;
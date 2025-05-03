import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
import User from "./models/userModel";
const sequelize = new Sequelize(envConfig.db_uri as string,
    {
        dialect : 'postgres',
        models : [User]
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

export default sequelize;
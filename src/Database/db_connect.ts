import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
const sequelize = new Sequelize(envConfig.db_uri as string);

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

export default sequelize;
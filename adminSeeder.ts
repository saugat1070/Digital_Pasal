import { envConfig } from "./src/config/config";
import User from "./src/Database/models/userModel";
import bcrypt from "bcrypt"

const adminUser = async ()=>{
    const [data] = await User.findAll({
        where:{
            email : envConfig.adminEmail
        }
    })

    if(!data){
        await User.create({
            username : envConfig.adminUsername,
            password : bcrypt.hashSync(envConfig.adminPassword,8),
            email : envConfig.adminEmail,
            role : "admin"
            
        })
        
        console.log("Admin seeded!!!")
    }
    else{
        console.log("admin already seeded");
    }
}

export default adminUser
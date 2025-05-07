import {Request,Response,NextFunction} from 'express'
import jwt from "jsonwebtoken"
import { envConfig } from '../config/config';
import User from '../Database/models/userModel';

enum Role{
    Admin = "admin",
    Customer = "customer"
}

interface IExtendedRequest extends Request{
    user? : {
        username : string,
        email : string,
        role : string,
        password : string,
        id : string

    }

}
class UserMiddleware{
    async IsUserLoggeIn(req:IExtendedRequest,res:Response,next:NextFunction):Promise<void>{
        // receive
        const authHeader = req.headers.authorization; //it reads in {Bearer token} and we have to remove Bearer
        // const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        console.log(token);
        if(!token){
            res.status(403).json({
                message : "Token must be provided"
            })
            return;
        }

        jwt.verify(token,envConfig.jwtsecretkey as string, async (err,result:any)=>{
            if(err){
                console.log(err);
                res.status(403).json({
                    message : "Invalid token !!!"
                })
            }
            else{
                console.log("valid token")
                console.log(result); //{userid}

                const user_data = await User.findByPk(result?.userId);
                // //@ts-ignore
                // req.id = result?.userid
                if(!user_data){
                    res.status(404).json({
                        message : "user is not found"
                    })
                    return
                }
                req.user = user_data;
                next();
            }
        })

        //validate
    }

    accessTo(...roles: Role[]){ //['admin','customer']
        // let userRole = req.user.role as Role
        return (req:IExtendedRequest,res:Response,next:NextFunction)=>{
            let userRole = req.user?.role as Role
            console.log(userRole)
            console.log(userRole)
            if(!roles.includes(userRole)){
                res.status(403).json({
                    message : "user must be admin"
                })
            }
            else{
                next();
            }
        }
    }



}

export default new UserMiddleware
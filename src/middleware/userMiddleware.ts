import {Request,Response,NextFunction} from 'express'
import jwt from "jsonwebtoken"
import { envConfig } from '../config/config';
class UserMiddleware{
    async IsUserLoggeIn(req:Request,res:Response,next:NextFunction):Promise<void>{
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

        jwt.verify(token,envConfig.jwtsecretkey as string, async (err,result)=>{
            if(err){
                console.log(err);
                res.status(403).json({
                    message : "Invalid token !!!"
                })
            }
            else{
                console.log("valid token")
                console.log(result); //{userid}
                next();
            }
        })

        //validate
    }


}

export default new UserMiddleware
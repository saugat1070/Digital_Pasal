
import { Request,Response } from "express";
import User from "../Database/models/userModel";
import bcrypt from 'bcrypt'
import generateToken from "../services/generateToken";
import generateOtp from "../services/otpGenerate";
import sendMail from "../services/mailSender";
class UserController{
    public static async register(req:Request,res:Response){
        const {username,email,password} = req.body;
        console.log(req.body);
        if(!username || !email || !password){
            res.status(400).json({
                message : "Please provide username,email,password",
            })
            return;
        }

        const [data] = await User.findAll({
            where:{
                email : email
            }
        })

        if(data){
            res.status(400).json({
                message : "account with this email is already created,please try again later"
            })
            return;
        }

        const user = await User.create({
            username : username,
            email : email,
            password : bcrypt.hashSync(password,10)
        })

        res.status(201).json({
            message : "User is Created Successfully",
           
        })

    }

    public static async Login(req:Request,res:Response){
        const {email,password} = req.body
        if(!email || !password){
            res.status(200).json({
                message : "please provide email,password"
            })
            return
        }
        //check email exist or not at first
        const [user] = await User.findAll({ //destructing array
            where:{
                email: email
            }
        })

       /*  const user = [{
            "id"="a2oijfno2323oij",
            "email":"test",
            "password":"flanf3obnfalnpd",
            "username":"test",
            "created_at":"data",
            "updated_at":"data"
        }] */

        if(!user){
            res.status(404).json({
                message : "No user with that email"
            })
            return;
        }

        const check = bcrypt.compareSync(password,user.password);
        if(!check){
            res.status(400).json({
                message : "Invalid Password,please try again"
            })
        }
        const token = generateToken(user.id);

        res.status(200).json({
            message : "Login success",
            token : token
        })
    } 

    public static async fetchUser(req:Request,res:Response){
        const [user] = await User.findAll({
            attributes : ['id','username','email']
        })
        if(!user){
            res.status(403).json({
                message : "Please check your login status"
            })
            return;
        }
        res.status(200).json({
            message : "user is fetch successfully",
            data : user
        })
        
    }

    public static async handleForgotPassword(req:Request,res:Response){
        const {email} = req.body;
        if(!email){
            res.status(400).json({
                message : "please provide email"
            })
            return;
        }
        const [user] = await User.findAll({
            where:
            {
                email : email
            }
        });
        if(!user){
            res.status(404).json({
                message : "invalid email"
            })
            return;
        }

        const otp = generateOtp()
        try {
            await sendMail({
                to:email,
                subject:"Digital Dokan Password Reset",
                text : `you just request to change reset password.here is you otp, ${otp}`
            })
        } catch (error) {
            console.log(error)
            
        }

        res.status(200).json({
            message : "otp is pathae deko cha"
        })


    }
}

export default UserController;
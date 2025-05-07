import multer from "multer";
import { Request } from "express";
const storage = multer.diskStorage({
    destination:(req:Request,file:Express.Multer.File,cb:any)=>{
        cb(null,'./storage')
    },
    filename : (req:Request,file:Express.Multer.File,cb:any)=>{
        cb(null,Date.now+"-"+file.originalname)
    }
})

export {multer,storage}
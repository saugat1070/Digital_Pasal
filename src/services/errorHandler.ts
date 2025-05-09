import {Request,Response} from 'express'

const errorHandler = (fn: Function)=>{
    return (req:Request,res:Response)=>{
        fn(req,res).catch((err:Error)=>{
            res.status(500).json({
                message:"internal server error",
                errMessage : err.message
            })
            return;
        })
    }
}

export {errorHandler}
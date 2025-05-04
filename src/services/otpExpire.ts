import sendResponse from "./sendResponse";
import { Response } from "express";

const otpExp = async (data:any,otp:string,res:Response) =>{
    const diff_time = Date.now() - parseInt(data.otptime);
    if(diff_time >0 && diff_time <= 120000){
        //otp expire vako chaina
        // if(data.otp == otp){

        // }
        sendResponse(res,200,"otp expire vako chaina hae")
    }
    else{
        sendResponse(res,403,"otp expire vae sako hae");
        //otp expire
    }
}


export default otpExp;
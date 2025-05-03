import nodemailer from "nodemailer"
import { envConfig } from "../config/config"

interface IData{
    to : string,
    subject : string,
    text : string
}

const sendMail = async (data:IData)=>{
    const transport = nodemailer.createTransport({
        service :"gmail",
        auth : {
            user : envConfig.emailUser as string,
            pass : envConfig.emailPassword
        }
        
    })

    const mailOption = {
        from : "DigitalDokan@gmail.com",
        to : data.to,
        subject :data.subject,
        text : data.text
    }
    try {
        await transport.sendMail(mailOption);
    } catch (error) {
        console.log(error)
        
    }
}

export default sendMail;
import { config } from "dotenv";
config()

export const envConfig = {
    port : process.env.PORT_NUMBER,
    db_uri : process.env.DATA_BASE_URI,
    jwtsecretkey : process.env.JWT_SECRET_KEY,
    jwtExpireIn : process.env.JWT_EXPIRE_IN,
    emailUser : process.env.EMAIL,
    emailPassword : process.env.EMAIL_APP_PASSWORD as string,
    adminUsername : process.env.ADMIN_USERNAME as string,
    adminEmail : process.env.ADMIN_EMAIL as string,
    adminPassword : process.env.ADMIN_PASSWORD as string
}
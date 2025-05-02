import { config } from "dotenv";
config()

export const envConfig = {
    port : process.env.PORT_NUMBER,
    db_uri : process.env.DATA_BASE_URI
}
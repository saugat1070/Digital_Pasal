import { envConfig } from "../config/config";
import jwt from 'jsonwebtoken'
const generateToken = (userId: string) => {
    const day = envConfig.jwtExpireIn as string
    //token generate(jwt) logic
    const token = jwt.sign({
        userId: userId
    }, envConfig.jwtsecretkey as string,
        { expiresIn: "2d" }
    )

    return token;


}

export default generateToken;
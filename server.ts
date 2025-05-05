import adminUser from "./adminSeeder";
import app from "./src/app";
import { envConfig } from "./src/config/config";
import CategoryController from "./src/Controller/categoryController";

function startServer(){
    const port = envConfig.port || 4000;
    adminUser();
    CategoryController.seedCategory()
    app.listen(port,()=>{
        console.log(`Server is started at ${port}`);
    })
}

startServer()

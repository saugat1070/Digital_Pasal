import User from "../Database/models/userModel"


const findData = async (model:any,query:object)=>{
    const [user_info] = await model.findAll({
        where: query
    })

    return user_info;
}

export default findData
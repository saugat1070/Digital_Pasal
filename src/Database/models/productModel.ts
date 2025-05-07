import { Table,Column,Model,DataType, PrimaryKey, AllowNull } from "sequelize-typescript";


@Table({
   tableName : "productTable",
   modelName : "Product",
   timestamps : true
})

class Product extends Model{
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id:string;

    @Column({
        type: DataType.STRING,
        allowNull : false
    })
    declare productName:string

    @Column({
        type: DataType.TEXT,
    })
    declare productDescription:string

    @Column({
        type: DataType.FLOAT,
        allowNull : false
    })
    declare productPrice:number

    @Column({
        type: DataType.INTEGER
    })
    declare productQuantity:number

    @Column({
    type : DataType.INTEGER
    })
    declare productDiscount : number

    @Column({
        type: DataType.STRING
    })
    declare imageUrl : string




}

export default Product;
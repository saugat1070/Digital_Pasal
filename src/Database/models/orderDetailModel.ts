import { Table,Column,DataType,Model, PrimaryKey, AllowNull } from "sequelize-typescript";


@Table({
    tableName: 'orderDetails',
    modelName : 'orderDetails',
    timestamps : true
})

class OrderDetails extends Model{
    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id:string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare quantity:number
    
}
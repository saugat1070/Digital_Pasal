import { Table,Column,DataType,Model, AllowNull } from "sequelize-typescript";
import { paymentMethod, paymentStatus } from "../../globals/types";
@Table({
    tableName:"paymentDetails",
    modelName: "Payment",
    timestamps:true
})

class Payment extends Model{

    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id:string

    @Column({
        type: DataType.ENUM(paymentMethod.khalti,
            paymentMethod.COD,paymentMethod.esewa
        ),
        allowNull : false,
        defaultValue : paymentMethod.COD

    })
    declare paymentMethod : string

    @Column({
        type: DataType.ENUM(paymentStatus.paid,paymentStatus.unpaid),
        allowNull : false,
        defaultValue : paymentStatus.unpaid
    })
    declare payMethod : string
}

export default Payment;
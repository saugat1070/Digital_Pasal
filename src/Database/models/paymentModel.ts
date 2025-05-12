import { Table,Column,DataType,Model, AllowNull } from "sequelize-typescript";
import { PaymentMethod, PaymentStatus } from "../../globals/types";
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
        type: DataType.ENUM(PaymentMethod.khalti,
            PaymentMethod.COD,PaymentMethod.esewa
        ),
        allowNull : false,
        defaultValue : PaymentMethod.COD

    })
    declare paymentMethod : string

    @Column({
        type: DataType.ENUM(PaymentStatus.paid,PaymentStatus.unpaid),
        allowNull : false,
        defaultValue : PaymentStatus.unpaid
    })
    declare paymentStatus : string

    @Column({
        type:DataType.STRING
    })
    declare pidx: string
}

export default Payment;
import { Table, Column, DataType, Model, PrimaryKey, AllowNull } from 'sequelize-typescript'
import { orderStatus } from '../../globals/types'

@Table({
    tableName: "orders",
    modelName: 'Order',
    timestamps: true
})

class Order extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [10, 10], //[min,max]
                msg: "phone number must be 10 digits. 10 vanda sano thulo hunu vayhena"
            }
        }
    })
    declare phoneNumber: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare shippingAdress: string

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare totalAmount: number

    @Column({
        type: DataType.ENUM(orderStatus.cancelled, orderStatus.delivered, orderStatus.ontheway,
            orderStatus.pending, orderStatus.preparation),
        allowNull: false,
        defaultValue : orderStatus.pending
    })
    declare status: string
}

export default Order
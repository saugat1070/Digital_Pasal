import express,{Request,Response} from 'express'
import Order from '../Database/models/orderModel'
import OrderDetails from '../Database/models/orderDetailModel'
import { IExtendedRequest } from '../globals/types'
import { PaymentMethod } from '../globals/types'
import Payment from '../Database/models/paymentModel'

interface IProduct{
    productId:string,
    productQuantity:string
}

interface paymentMethod{
    paymentId:string
}

class OrderController{
    static async createOrder(req:IExtendedRequest,res:Response){
        const user_id = req.user?.id
        console.log(user_id);
        const {phoneNumber,shippingAdress,totalAmount,paymentMethod} = req.body
        const products:IProduct[] = req.body.products
        console.log(products);
        if(!phoneNumber || !shippingAdress || !totalAmount
            ||products.length ===0 || !paymentMethod
        ){
            res.status(400).json({
                message : "please provide phoneNumber,totalAmount,products and paymentMethod"
            })
            return;

        }
        
        //for order
        const orderData = await Order.create({
            phoneNumber:phoneNumber,
            shippingAdress: shippingAdress,
            totalAmount: totalAmount,
            userId: user_id
        })

        //for orderDetails
        products.forEach(async product => {
            console.log("id",product?.productId)
            console.log("quantity",product?.productQuantity)
            await OrderDetails.create({
                productId : product?.productId,
                quantity: product?.productQuantity,
                orderId: orderData.id,  
            })
        });
        //for payment
        if(paymentMethod == PaymentMethod.COD ){
            await Payment.create({
                orderId:orderData.id,
                paymentMethod:paymentMethod
            })
        }
        else if(paymentMethod == PaymentMethod.khalti){

        }
        else if(paymentMethod == PaymentMethod.esewa){

        }

        res.status(200).json({
            message : "Order created Successfully"
        })
        
        

    }
}

export default OrderController
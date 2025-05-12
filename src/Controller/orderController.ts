import express, { Request, Response, urlencoded } from 'express'
import Order from '../Database/models/orderModel'
import OrderDetails from '../Database/models/orderDetailModel'
import { IExtendedRequest, PaymentStatus } from '../globals/types'
import { PaymentMethod } from '../globals/types'
import Payment from '../Database/models/paymentModel'
import axios from 'axios'
interface IProduct {
    productId: string,
    productQuantity: string
}

interface paymentMethod {
    paymentId: string
}

class OrderController {
    static async createOrder(req: IExtendedRequest, res: Response) {
        const user_id = req.user?.id
        console.log(user_id);
        const { phoneNumber, shippingAdress, totalAmount, paymentMethod } = req.body
        const products: IProduct[] = req.body.products
        console.log(products);
        if (!phoneNumber || !shippingAdress || !totalAmount
            || products.length === 0 || !paymentMethod
        ) {
            res.status(400).json({
                message: "please provide phoneNumber,totalAmount,products and paymentMethod"
            })
            return;

        }

        //for order
        const orderData = await Order.create({
            phoneNumber: phoneNumber,
            shippingAdress: shippingAdress,
            totalAmount: totalAmount,
            userId: user_id
        })

        //for orderDetails
        products.forEach(async product => {
            console.log("id", product?.productId)
            console.log("quantity", product?.productQuantity)
            await OrderDetails.create({
                productId: product?.productId,
                quantity: product?.productQuantity,
                orderId: orderData.id,
            })
        });
        //for payment
        if (paymentMethod == PaymentMethod.COD) {
            await Payment.create({
                orderId: orderData.id,
                paymentMethod: paymentMethod
            })
        }
        else if (paymentMethod == PaymentMethod.khalti) {
            const data = {
                return_url: "http://localhost:5173/", //react ko home page(after transcatioin page kaha fiyakne)
                website_url: "http://localhost:5173/",//project ko website
                amount: totalAmount * 100, //eyo paisa maa aaucha
                purchase_order_id: orderData.id,
                purchase_order_name: "order_" + orderData.id, //it must be unique
            }
            const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", data, {
                headers: {
                    Authorization: "Key 20d545a49ac6443a9cfe962f1aae2966"
                }
            })
            // console.log(response);
            const paymentCheck = await Payment.create({
                paymentMethod: paymentMethod,
                orderId: orderData.id,
                pidx: response.data.pidx,
            })
            if (!paymentCheck) {
                res.status(403).json({
                    message: "Transcition Failed"
                })
                return;
            }
            res.status(200).json({
                message: "Order Created Successfully",
                url: response.data.payment_url
            })
            
        }

        else if (paymentMethod == PaymentMethod.esewa) {

        }

        /* data: {
            pidx: 'jz3xH8BuZQ5MSo7CoNJ9pY',
            payment_url: 'https://test-pay.khalti.com/?pidx=jz3xH8BuZQ5MSo7CoNJ9pY',
            expires_at: '2025-05-11T00:38:55.143583+05:45',
            expires_in: 1800
          } */

        // res.status(200).json({
        //     message: "Order created Successfully"
        // })



    }

    static async verifyTransaction(req: IExtendedRequest, res: Response) {
        const { pidx } = req.body
        if (!pidx) {
            res.status(400).json({
                message: "please provide pidx",

            })
            return;
        }
        const response = await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/", {
            pidx: pidx
        },
            {
                headers: {
                    Authorization: "Key 20d545a49ac6443a9cfe962f1aae2966"
                }
            })
        // console.log(response.data.status)
        if(response.data.status == "Completed"){
            await Payment.update({
                paymentStatus : PaymentStatus.paid
            },{
                where:{
                    pidx : pidx
                }
            })
            res.status(200).json({
                message:"payment verified successfully"
            })
        }
        else{
            res.status(400).json({
                message: "Payment verification or cancelled"
            })
        }
       /*  {
            pidx: 'kHpPRVtNtcHfVbmiYsqDih',
            total_amount: 70000000,
            status: 'Pending',
            transaction_id: null,
            fee: 0,
            refunded: false
          } */
    }
}

export default OrderController
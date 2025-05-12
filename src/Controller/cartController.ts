import { Request, Response } from "express";
import { IExtendedRequest } from "../globals/types";
import Cart from "../Database/models/cartModel";
import Product from "../Database/models/productModel";

class CartController {
  static async addToCart(req: IExtendedRequest, res: Response) {
    const userId = req.user?.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      res.status(400).json({
        message: "please provide productId,qunatity",
      });
      return;
    }
    const checkUser = await Cart.findOne({
      where: {
        userId: userId,
        productId: productId
      },
    });

    if (!checkUser) {

      await Cart.create({
        quantity: quantity,
        userId: userId,
        productId: productId,
      });

    } else {
        checkUser.quantity += quantity;
        await checkUser.save();
    }
    res.status(200).json({
        message : "product added to Cart"
    })

  }

  static async getMyCartItem(req:IExtendedRequest,res:Response){
    const userId = req.user?.id
    const cartItem = await Cart.findAll({
        where:{
            userId:userId
        },
        include:{
            model:Product
        }

    })

    if(cartItem.length ===0){
       res.status(404).json({
        message : "Cart with this user is not found"
       })


    }else{
        res.status(200).json({
            message: "item is successfully added on Cart",
            data : cartItem
        })
    }
  }

  static async deleteCart(req:IExtendedRequest,res:Response){
    const id = req.user?.id
    const {productId}  = req.params
    if(!id || !productId){
      res.status(400).json({
        message: "please provide require information"
      })
      return;
    }
    
    const cartData = await Cart.findAll({
      where:{
        userId : id,
        productId : productId
      }
    })
    if(cartData.length ===0){
      res.status(404).json({
        message : "Product with this cart is not found in Cart"
      })
      return;
    }

    await Cart.destroy({
      where:{
        productId : productId,
        userId : id
      }
    })
    res.status(200).json({
      messageg : "product is remove from Cart successfully"
    })
   }

  static async updateCartItem(req:IExtendedRequest,res:Response){
    const userId = req.user?.id
    const {productId} = req.params
    const {quantity} = req.body

    if(!quantity){
      res.status(400).json({
        message: "please provide quantity"
      })
      return;
    }

    const CartItem = await Cart.findOne({
      where:{
        userId : userId,
        productId : productId
      }
    })

    if(!CartItem){
      res.status(404).json({
        message: "Product is not found"
      })
      return;
    }
    CartItem.quantity += quantity;
    await CartItem.save()

   }
}

export default CartController;

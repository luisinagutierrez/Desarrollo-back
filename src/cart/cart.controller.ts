import express, { Request, Response, NextFunction } from 'express';
import { Cart } from './cart.entity.js';
import { orm } from '../shared/db/orm.js';
import { Order } from '../order/order.entity.js';
import { Product } from '../product/product.entity.js';

const em = orm.em;

async function addToCart(req: Request, res: Response) {
  try {
    const { orderId, productId, quantity } = req.body;
    const order = await em.findOneOrFail(Order, { id: orderId });
    const product = await em.findOneOrFail(Product, { id: productId });

    const subtotal = product.price * quantity;
    const cartData = {
      order,
      product,
      quantity,
      subtotal
    };

    const cart = em.create(Cart, cartData);
    await em.persistAndFlush(cart);

    res.status(201).json({ message: 'Product added to cart', data: cart });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}





























/*async function generateCart(req: Request, res: Response){
  try{
    const cart = em.create(Cart, req.body);
    await em.flush();
    res
      .status(201)
      .json({message:'cart created',data: cart});  
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function getUserCart(req: Request, res: Response){
  const userId = req.params.userId;

  try{
    const userCart = await em.findOneOrFail(Cart, userId/* :userId););
    res.json({
      userId: userId,
      cart: userCart
    });
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};*/


//async function cancelCart --> deberíamos agregar un estado en el carrito
// porque sino, no se podrian validar varias cosas. Acá debería pasar de pendiente a cancelado

// ver si cart se puede tomar como order, es raro, pero meca dijo que hagamos asi


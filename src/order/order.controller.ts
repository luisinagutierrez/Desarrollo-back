import express, { Request, Response, NextFunction } from 'express';
import { Order } from './order.entity.js';
import { orm } from '../shared/db/orm.js';
import { User } from '../user/user.entity.js';
import { Product } from '../product/product.entity.js';
//import path from 'path';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const orders = await em.find(Order, {});
    res.status(200).json({ message: 'found all orders', data: orders });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const order = await em.findOneOrFail(Order, { id }, { populate: ['carts', 'user'] });
    res.status(200).json({ message: 'found one order', data: order });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}

// async function createOrder(req: Request, res: Response) {
//   try{
//     const order = 
//   }
// 

async function addCartLine(req: Request, res: Response) {

}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const existingOrder = await em.findOne(Order, { id });
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    em.assign(existingOrder, {
      //status: req.body.status,
      //updatedDate: new Date()
    });
    
    await em.flush();
    res.status(200).json({ message: 'order updated', data: existingOrder });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const order = await em.findOne(Order, { id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await em.removeAndFlush(order);
    res.status(200).json({ message: 'order deleted', data: order });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}

// ESTA ES LA QUE HICE, FIJATE CÓMO PASO EL IDUSER A DIFERENCIA DE LOS OTROS 
async function createOrder(req: Request, res: Response) {
  const { userId } = req.params;  // cuidado si cambiamos la routa
  const { products, total } = req.body;

  if (!userId || !products || !Array.isArray(products) || !total) { // es una validacion por la que nunca debería de entrar, pero por las dudas está
    return res.status(400).json({ message: 'Invalid order data' });
  }

  try {
    const user = await em.findOne(User, { id: userId }); // si no lo hacia me tiraba error en user, no se pq 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const order = em.create(Order, { user, total });

    for (const product of products) { // acá voy agregando los productos
      const Purchasedproduct = await em.findOneOrFail(Product, { id: product.id }); // lo busca y lo agrega
      order.products.add(Purchasedproduct); // lo agrego a la orden

      // ACA DEBERÍAMOS DE ACTUALIZAR EL STOCK SEGUN EL MATI, PERO ES UNA LINEA SOLA, POR AHORA ESTO 
      // DE ACTUALIZAR EL STOCK SI FUNCIONA BIEN, DEJEMOSLO CÓMO ESTÁ CUANDO FUNCIONE ESTO LO AGREGAMOS
    }

    await em.flush();

    res.status(201).json({ message: 'Order created successfully', data: order });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}



export const controller = {
  findAll,
  findOne,
  //add,
  update,
  remove,
  createOrder
};
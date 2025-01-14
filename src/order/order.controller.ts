import express, { Request, Response, NextFunction } from 'express';
import { Order } from './order.entity.js';
import { orm } from '../shared/db/orm.js';
//import path from 'path';

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const orders = await em.find(Order, {}, { populate: ['carts', 'user'] });
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
// }

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
      status: req.body.status,
      updatedDate: new Date()
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

export const controller = {
  findAll,
  findOne,
  //add,
  update,
  remove
};
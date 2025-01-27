import express, { Request, Response, NextFunction } from 'express';
import { Order } from './order.entity.js';
import { orm } from '../shared/db/orm.js';
import { User } from '../user/user.entity.js';
import { Product } from '../product/product.entity.js';

const em = orm.em;

async function findAll(req: Request, res: Response){
  try{
    const orders = await em.find(Order, {}, {populate: ['user'],
      fields: [
        '*',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.phone',
        'user.street',
        'user.streetNumber',
        'user.city'
      ]
    });
    res.status(200).json({message: 'Orders found successfully', data: orders});
  } catch (error: any){
    res.status(404).json({message: error.message});
  }
}

async function findOne(req: Request, res: Response){
  try{
    const order = await em.findOneOrFail(Order, {id: req.params.id}, {populate: ['user'],
      fields: [
        '*',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.phone',
        'user.street',
        'user.streetNumber',
        'user.city'
      ]
    });
    res.status(200).json({message: 'Order found successfully', data: order});
  } catch (error: any){
    res.status(404).json({message: 'Order not found'});
  }
}

async function create(req: Request, res: Response){
  try{
    const {userId, orderItems} = req.body;

    const user = await em.findOneOrFail(User, {id: userId});

    const orderItemsWithProduct = await Promise.all( /// DESDE ACÁ HASTA EL CREATE, ES PARA LA ACTUALIZACIÓN DEL STOCK 
      orderItems.map(async (item: any) => { 
        const product = await em.findOneOrFail(Product, { id: item.productId });
        
        if (product.stock < item.quantity) { // con el verifyStock ya nos aceguramos de que no entre acá, quiza se pueda sacar 
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }
        
        product.stock -= item.quantity;
        return {
          productId: product.id,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.quantity * item.unitPrice,
        };
      })
    );

    const total = orderItemsWithProduct.reduce(
      (acc: number, item: any) => acc + item.subtotal,
      0
    );

    const order = em.create(Order, {
      status: 'pending',
      orderDate: new Date(),
      user,
      orderItems: orderItemsWithProduct,
      total,
    });

    await em.persistAndFlush(order);
    res.status(201).json({message: 'Order created successfully', data: order});
  } catch (error: any){
    res.status(404).json({message: error.message});
  }
}

async function update(req: Request, res: Response){
  try{
    const order = await em.findOneOrFail(Order, {id: req.params.id});

    const {status, orderItems} = req.body;

    if (status) order.status = status;
    if (orderItems){
      order.orderItems = orderItems.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.quantity * item.unitPrice
      }));
      order.total = orderItems.reduce((acc: number, item: any) => acc + (item.quantity * item.unitPrice), 0);
    }

    order.updatedDate = new Date();
    await em.persistAndFlush(order);

    res.status(200).json({message: 'Order updated successfully', data: order});
  } catch (error: any){
    res.status(404).json({message: 'Order not found'});
  }
}

async function remove(req: Request, res: Response){
  try{
    const order = await em.findOneOrFail(Order, {id: req.params.id});
    await em.removeAndFlush(order);
    res.status(200).json({message: 'Order deleted successfully', data: order});
  } catch (error: any){
    res.status(404).json({message: 'Order not found'});
  }
}

export const controller = {
  findAll,
  findOne,
  create,
  update,
  remove
}




















// const em = orm.em;

// async function findAll(req: Request, res: Response) {
//   try {
//     const orders = await em.find(Order, {});
//     res.status(200).json({ message: 'found all orders', data: orders });
//   } catch (error: any) {
//     res.status(404).json({ message: error.message });
//   }
// }

// async function findOne(req: Request, res: Response) {
//   try {
//     const id = req.params.id;
//     const order = await em.findOneOrFail(Order, { id }, { populate: ['carts', 'user'] });
//     res.status(200).json({ message: 'found one order', data: order });
//   } catch (error: any) {
//     res.status(404).json({ message: error.message });
//   }
// }

// // async function createOrder(req: Request, res: Response) {
// //   try{
// //     const order = 
// //   }
// // 

// async function addCartLine(req: Request, res: Response) {

// }

// async function update(req: Request, res: Response) {
//   try {
//     const id = req.params.id;
//     const existingOrder = await em.findOne(Order, { id });
//     if (!existingOrder) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     em.assign(existingOrder, {
//       //status: req.body.status,
//       //updatedDate: new Date()
//     });
    
//     await em.flush();
//     res.status(200).json({ message: 'order updated', data: existingOrder });
//   } catch (error: any) {
//     res.status(404).json({ message: error.message });
//   }
// }

// async function remove(req: Request, res: Response) {
//   try {
//     const id = req.params.id;
//     const order = await em.findOne(Order, { id });
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     await em.removeAndFlush(order);
//     res.status(200).json({ message: 'order deleted', data: order });
//   } catch (error: any) {
//     res.status(404).json({ message: error.message });
//   }
// }

// // ESTA ES LA QUE HICE, FIJATE CÓMO PASO EL IDUSER A DIFERENCIA DE LOS OTROS 
// async function createOrder(req: Request, res: Response) {
//   const { userId } = req.params;  // cuidado si cambiamos la routa
//   const { products, total } = req.body;

//   if (!userId || !products || !Array.isArray(products) || !total) { // es una validacion por la que nunca debería de entrar, pero por las dudas está
//     return res.status(400).json({ message: 'Invalid order data' });
//   }

//   try {
//     const user = await em.findOne(User, { id: userId }); // si no lo hacia me tiraba error en user, no se pq 
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const order = em.create(Order, { user, total });

//     for (const product of products) { // acá voy agregando los productos
//       const Purchasedproduct = await em.findOneOrFail(Product, { id: product.id }); // lo busca y lo agrega
//       order.products.add(Purchasedproduct); // lo agrego a la orden

//       // ACA DEBERÍAMOS DE ACTUALIZAR EL STOCK SEGUN EL MATI, PERO ES UNA LINEA SOLA, POR AHORA ESTO 
//       // DE ACTUALIZAR EL STOCK SI FUNCIONA BIEN, DEJEMOSLO CÓMO ESTÁ CUANDO FUNCIONE ESTO LO AGREGAMOS
//     }

//     await em.flush();

//     res.status(201).json({ message: 'Order created successfully', data: order });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// }



// export const controller = {
//   findAll,
//   findOne,
//   //add,
//   update,
//   remove,
//   createOrder
// };
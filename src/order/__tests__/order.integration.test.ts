import request from 'supertest';
import { MikroORM } from '@mikro-orm/core';
import app from '../../app.js';
import { User } from '../../user/user.entity.js';
import { Order } from '../order.entity.js';
import { Product } from '../../product/product.entity.js';
import { City } from '../../city/city.entity.js';
import { syncSchema } from '../../shared/db/orm.js'; 

describe('Order Integration Tests', () => {
  let orm: MikroORM;
  let user: User;
  let product: Product;

  beforeAll(async () => {
    orm = await MikroORM.init(); // Lo inicializamos aca 
    const em = orm.em.fork(); // Creamos la idetidad aca 

    await em.nativeDelete(Order, {}); 
    await em.nativeDelete(User, {}); 
    await em.nativeDelete(Product, {});

    console.log('Database connection URL:', orm.config.getClientUrl());

    const city = await em.findOne(City, { name: 'Test City' });

    if (!city) {
      throw new Error('City not found');
    }

    user = em.create(User, {
      email: 'test@example.com',
      password: 'Contra.123',
      privilege: 'cliente',
      firstName: 'Test',
      lastName: 'User',
      phone: 123456789,
      street: 'Test St',
      streetNumber: '123',
      city: city,
    });

    await em.persistAndFlush(user);

    product = em.create(Product, {
      name: 'Test Product',
      description: 'Test Description',
      price: 50,
      stock: 10,
      image: 'default.jpg',
      category: '67aa0eef3a7a00c93058922d',
      supplier: '67aa08863a7a00c93058922c',
    });

    await em.persistAndFlush(product);
  });

  afterAll(async () => {
    await orm.close(); // se cierra la conexion
  });

  test('should create an order successfully', async () => {
    const response = await request(app)
      .post('/orders')
      .send({
        userId: user.id,
        orderItems: [{ productId: product.id, quantity: 2, unitPrice: 50 }],
        total: 100,
      });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.status).toBe('pending');
  });
});

// //   test('should get all orders', async () => {
// //     const response = await request(app).get('/orders');

// //     expect(response.status).toBe(200);
// //     expect(response.body.data.length).toBeGreaterThan(0);
// //   });

// //   test('should find an order by ID', async () => {
// //     const response = await request(app).get(`/orders/${order.id}`);

// //     expect(response.status).toBe(200);
// //     expect(response.body.data.id).toBe(order.id);
// //   });

// //   test('should update an order status', async () => {
// //     const response = await request(app)
// //       .put(`/orders/${order.id}`)
// //       .send({ status: 'completed' });

// //     expect(response.status).toBe(200);
// //     expect(response.body.data.status).toBe('completed');
// //   });

// //   test('should delete an order', async () => {
// //     const response = await request(app).delete(`/orders/${order.id}`);

// //     expect(response.status).toBe(200);
// //     expect(response.body.message).toBe('Order deleted successfully');
// //   });
// });

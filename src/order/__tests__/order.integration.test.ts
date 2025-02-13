import request from 'supertest';
import { MikroORM } from '@mikro-orm/core';
import app from '../../app.js';
import { User } from '../../user/user.entity.js';
import { Order } from '../order.entity.js';
import { Product } from '../../product/product.entity.js';
import { City } from '../../city/city.entity.js';
import { Province } from '../../province/province.entity.js';
import { Category } from '../../category/category.entity.js';
import { Supplier } from '../../supplier/supplier.entity.js';
import { syncSchema } from '../../shared/db/orm.js';

describe('Order Integration Tests', () => {
  let orm: MikroORM;
  let testUser: User;
  let testProduct: Product;
  let testOrder: Order;

  beforeAll(async () => {
    orm = await MikroORM.init();
    await syncSchema();
  });

  afterAll(async () => {
    await orm.close();
  });

  beforeEach(async () => {
    await orm.em.clear();

    // Test data hierarchy
    const province = orm.em.create(Province, {
      name: 'Test Province'
    });

    const city = orm.em.create(City, {
      name: 'Test City',
      postCode: '2000',
      surcharge: 100,
      province
    });

    testUser = orm.em.create(User, {
      email: 'test@test.com',
      password: 'password123',
      privilege: 'client',
      firstName: 'John',
      lastName: 'Doe',
      phone: 1234567890,
      street: 'Test Street',
      streetNumber: '123',
      city
    });

    const category = orm.em.create(Category, {
      name: 'Test Category',
      description: 'Test Category Description'
    });

    const supplier = orm.em.create(Supplier, {
      cuit: 123456789,
      businessName: 'Test Supplier',
      email: 'supplier@test.com',
      phone: '1234567890'
    });

    testProduct = orm.em.create(Product, {
      name: 'Test Product',
      description: 'Test Product Description',
      price: 100,
      stock: 10,
      image: 'test-image.jpg',
      category,
      supplier
    });

    await orm.em.persistAndFlush([province, city, testUser, category, supplier, testProduct]);
  });

  describe('POST /api/orders', () => {
    it('should create a new order', async () => {
      const orderData = {
        userId: testUser.id,
        orderItems: [{
          productId: testProduct.id,
          quantity: 2,
          unitPrice: testProduct.price,
        }],
        total: testProduct.price * 2
      };

      const response = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Order created successfully');
      expect(response.body.data.user.id).toBe(testUser.id);
      expect(response.body.data.orderItems).toHaveLength(1);
      expect(response.body.data.total).toBe(testProduct.price * 2);
    });

    it('should fail to create order with insufficient stock', async () => {
      const orderData = {
        userId: testUser.id,
        orderItems: [{
          productId: testProduct.id,
          quantity: 20, 
          unitPrice: testProduct.price,
        }],
        total: testProduct.price * 20
      };

      const response = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('Insufficient stock');
    });
  });

  describe('GET /api/orders', () => {
    beforeEach(async () => {
      testOrder = orm.em.create(Order, {
        user: testUser,
        orderItems: [{
          productId: testProduct.id,
          quantity: 1,
          unitPrice: testProduct.price,
          subtotal: testProduct.price
        }],
        total: testProduct.price,
        status: 'pending'
      });
      await orm.em.persistAndFlush(testOrder);
    });

    it('should get all orders', async () => {
      const response = await request(app).get('/api/orders');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Orders found successfully');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should get order by id', async () => {
      const response = await request(app)
        .get(`/api/orders/${testOrder.id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Order found successfully');
      expect(response.body.data.id).toBe(testOrder.id);
    });

    it('should get orders by user email', async () => {
      const response = await request(app)
        .get(`/api/orders/user/email/${testUser.email}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Orders found successfully');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /api/orders/:id', () => {
    beforeEach(async () => {
      testOrder = orm.em.create(Order, {
        user: testUser,
        orderItems: [{
          productId: testProduct.id,
          quantity: 1,
          unitPrice: testProduct.price,
          subtotal: testProduct.price
        }],
        total: testProduct.price,
        status: 'pending'
      });
      await orm.em.persistAndFlush(testOrder);
    });

    it('should update order status', async () => {
      const updateData = {
        status: 'completed'
      };

      const response = await request(app)
        .put(`/api/orders/${testOrder.id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Order updated successfully');
      expect(response.body.data.status).toBe('completed');
    });
  });

  describe('DELETE /api/orders/:id', () => {
    beforeEach(async () => {
      testOrder = orm.em.create(Order, {
        user: testUser,
        orderItems: [{
          productId: testProduct.id,
          quantity: 1,
          unitPrice: testProduct.price,
          subtotal: testProduct.price
        }],
        total: testProduct.price,
        status: 'pending'
      });
      await orm.em.persistAndFlush(testOrder);
    });

    it('should delete an order', async () => {
      const response = await request(app)
        .delete(`/api/orders/${testOrder.id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Order deleted successfully');

      // Verify order is deleted
      const getResponse = await request(app)
        .get(`/api/orders/${testOrder.id}`);
      expect(getResponse.status).toBe(404);
    });
  });
});